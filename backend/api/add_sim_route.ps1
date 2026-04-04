(Get-Content -Path 'D:\Projects\AURUM\backend\api\server.js' -Raw) -replace '(?s)(httpServer\.listen\(PORT,)', "

// --- SIMULATION ENDPOINTS ---
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logStream = fs.createWriteStream(path.join(__dirname, 'simulation_data_flow.log'), { flags: 'a' });

app.post('/api/simulation/event', (req, res) => {
  try {
    const { uuid, step, message, type, location, timestamp } = req.body;
    
    // 1. Broadcast to all other devices/displays connected via WiFi
    io.emit('simulation_event', req.body);
    
    // 2. Write persistently to Log File
    const logEntry = \[{timestamp}] UUID:\ | STEP:\ | TYPE:\ | MSG:\ | LOC:\\n;
    logStream.write(logEntry);
    console.log('⚡ [SIMULATION EVENT]', logEntry.trim());

    res.status(200).json({ status: 'Logged and Broadcasted' });
  } catch (err) {}
});

$1" | Set-Content -Path 'D:\Projects\AURUM\backend\api\server.js'
