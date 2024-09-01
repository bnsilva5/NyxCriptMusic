import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';

const app = express()

app.use(cors({
    origin: 'http://localhost:3000', // Reemplaza con el origen de tu frontend
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", authRoutes);

export default app