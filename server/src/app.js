// ========================================================
// Imports
// ========================================================
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { mongoConnect, mongoDisconnect } from './Db/mongo.js';
import authRouter from './Auth/auth.router.js';
// ========================================================
// Setup
// ========================================================
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
};
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========================================================
// Middleware
// ========================================================
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));
app.use(express.json());
app.use('/auth/', authRouter);
app.get('', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// this will be used only when endpoint function call next(err)
app.use((err, req, res, next) => {
  res.send('error occurred');
});

export default app;
