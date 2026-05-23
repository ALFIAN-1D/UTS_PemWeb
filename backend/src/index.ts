import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS untuk localhost + Vercel
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://uts-pem-web-frontend.vercel.app'
  ],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test endpoint
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Event Management API is running'
  });
});

// Routes API
app.use('/api', routes);

// Root endpoint
app.get('/', (_req, res) => {
  res.send('Backend API Running 🚀');
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});