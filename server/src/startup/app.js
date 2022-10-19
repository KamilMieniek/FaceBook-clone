// ========================================================
// Imports
// ========================================================
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import helmet from 'helmet';
import errorHandler from '../Middleware/handleError.middleware.js';
import authRouter from '../modules/Auth/auth.router.js';
import cookieParser from 'cookie-parser';
import userRouter from '../modules/Users/users.router.js';
4;
import verifyAccessToken from '../Middleware/verifyToken.middleware.js';
// ========================================================
// Setup
// ========================================================
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
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
app.use(helmet());
//Middleware to parse cookies from request, it write cookies into req parameter cookie
app.use(cookieParser());

//Serve static files
app.use('/', express.static(path.join(__dirname, '/public')));
// ========================================================
// Routes
// ========================================================

app.use('/auth/', authRouter);
//verifyAccessTokens check if user has access token and sets req.user req.roles values
app.use('/api/users/', verifyAccessToken, userRouter);

app.get('', (req, res) => {
  return res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
});
app.get('/*', (req, res) => {
  return res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
});

//Error Handling
// this will be used only when endpoint function call next(err)
app.use(errorHandler);

export default app;
