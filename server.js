import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import authRoutes from './routes/authRoute.js';
import foodRoutes from './routes/foodRoute.js';
import cartRoutes from './routes/cartRoute.js';
import ratingRoutes from './routes/ratingRoute.js';
import paymentRoutes from './routes/paymentRoute.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/payments', paymentRoutes);

connectDB();

app.get('/', (req, res) => {
    res.send("Backend Food API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));