// ========================================================
// Imports
// ========================================================
import dotenv from 'dotenv';
dotenv.config();
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import app from './startup/app.js';
import { mongoConnect, mongoDisconnect } from './startup/mongo.js';

// ========================================================
// Config
// ========================================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 8000;

// ========================================================
// Server
// ========================================================
const server = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, '..', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '..', 'cert.pem')),
  },
  app
);
function startServer() {
  mongoConnect();
  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
  });
}

startServer();
