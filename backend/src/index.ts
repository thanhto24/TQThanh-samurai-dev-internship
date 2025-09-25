import dotenv from 'dotenv';

import express from 'express';
import { connectDB } from './database/db';
import router from './routes';
dotenv.config(); 

const app = express();
connectDB();

app.use(express.json());
app.use('/', router);

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
