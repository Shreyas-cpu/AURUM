const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'server.js');
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/(httpServer\.listen\(PORT,)/s, \\n\n// --- SIMULATION ENDPOINTS ---\nimport fsNode from 'fs';\nimport pathNode from 'path';\nimport { fileURLToPath } from 'url';\n\nconst __filenameNode = fileURLToPath(import.meta.url);\nconst __dirnameNode = pathNode.dirname(__filenameNode);\nconst logStream = fsNode.createWriteStream(pathNode.join(__dirnameNode, 'simulation_data_flow.log'), { flags: 'a' });\n\napp.post('/api/simulation/event', (req, res) => {\n  try {\n    const { uuid, step, message, type, location, timestamp } = req.body;\n    io.emit('simulation_event', req.body);\n    const logEntry = \[\] UUID:\ | STEP:\ | TYPE:\ | MSG:\ | LOC:\\\n\;\n    logStream.write(logEntry);\n    console.log('? [SIMULATION EVENT]', logEntry.trim());\n    res.status(200).json({ status: 'Logged and Broadcasted' });\n  } catch (err) {}\n});\n\n\ + '');
fs.writeFileSync(file, content);
