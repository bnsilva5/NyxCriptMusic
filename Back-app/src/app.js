import express from 'express';
import morgan from 'morgan';
//import cors from 'cors';

const app = express()

//app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan('dev'));
app.use(express.json());

export default app