import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'aurum_admin',
  password: process.env.POSTGRES_PASSWORD || 'aurum_password',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'aurum_db',
  port: 5432,
});

pool.connect((err) => {
  if (err) console.error('Database connection error:', err.stack);
  else console.log('✅ Connected to PostgreSQL');
});

// --- REST ENDPOINTS (STAGE 2) ---

// 2.1 Hospital Endpoints
app.get('/api/hospitals', async (req, res) => {
  try {
    // Return all hospitals from the actual DB instead of mock lists
    const result = await pool.query('SELECT * FROM hospitals WHERE is_active = true');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/hospitals/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM hospitals WHERE id = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/hospitals/:id/resources', async (req, res) => {
  const { avail_icu_beds, avail_gen_beds, avail_ventilators, current_load_pct } = req.body;
  try {
    const result = await pool.query(`
      UPDATE hospitals 
      SET avail_icu_beds = $1, avail_gen_beds = $2, avail_ventilators = $3, current_load_pct = $4, last_updated_at = NOW() 
      WHERE id = $5 RETURNING *
    `, [avail_icu_beds, avail_gen_beds, avail_ventilators, current_load_pct, req.params.id]);
    
    // Broadcast status to all interfaces
    io.emit('hospital:status_update', result.rows[0]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/hospitals/:id/specialists', async (req, res) => {
  // Stub for updating specialists
  res.json({ message: "Specialist updated" });
});

// 2.2 Patient & Vitals Endpoints
app.post('/api/patients', async (req, res) => {
  const { ambulance_id, age, sex, chief_complaint, mechanism_of_injury } = req.body;
  const sessionCode = 'P-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + Math.floor(Math.random()*1000);
  try {
    const result = await pool.query(`
      INSERT INTO patients (session_code, ambulance_id, age, sex, chief_complaint, mechanism_of_injury) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `, [sessionCode, ambulance_id, age, sex, chief_complaint, mechanism_of_injury]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/patients/:id/vitals', async (req, res) => {
  const { heart_rate, systolic_bp, diastolic_bp, spo2, respiratory_rate, temperature, gcs_score, source } = req.body;
  try {
    const result = await pool.query(`
      INSERT INTO vitals_stream (patient_id, source, heart_rate, systolic_bp, diastolic_bp, spo2, respiratory_rate, temperature, gcs_score)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
    `, [req.params.id, source, heart_rate, systolic_bp, diastolic_bp, spo2, respiratory_rate, temperature, gcs_score]);
    
    // Broadcast to ambulance and patient monitor
    io.emit('vitals:update', { patient_id: req.params.id, vitals: result.rows[0] });
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/patients/:id/route', async (req, res) => {
  // Proxies call to FastAPI (to be implemented)
  res.json({ message: "Routing triggered - proxied to FastAPI" });
});

// 2.3 Ambulance Endpoints
app.get('/api/ambulances', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ambulances');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/ambulances/:id/location', async (req, res) => {
  const { lat, lng } = req.body;
  try {
    const result = await pool.query('UPDATE ambulances SET current_lat = $1, current_lng = $2, last_location_update = NOW() WHERE id = $3 RETURNING *', [lat, lng, req.params.id]);
    io.emit('ambulance:location_broadcast', { ambulance_id: req.params.id, lat, lng });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- WEBSOCKET EVENT HOOKS ---
// Internal webhook for ML Engine to trigger broadcasts
app.post('/api/internal/broadcast', (req, res) => {
  const { event, payload } = req.body;
  if (!event || !payload) {
    return res.status(400).json({ error: "Missing event or payload" });
  }
  
  // Forward the ML event to all connected dashboard and ambulance clients
  io.emit(event, payload);
  console.log(`📡 Broadcasted internal event [${event}] to connected clients.`);
  res.json({ success: true, relayed: true });
});

// --- WEBSOCKET EVENTS (Socket.io HUB) ---

io.on('connection', (socket) => {
  console.log(`⚡ Connected: ${socket.id}`);

  // Device can push location over websocket directly too
  socket.on('ambulance:location', (data) => {
    io.emit('ambulance:location_broadcast', data);
  });

  socket.on('disconnect', () => {
    console.log(`🔌 Disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`🚀 Node.js AURUM API Hub running on port ${PORT}`);
});

