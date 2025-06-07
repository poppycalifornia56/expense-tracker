import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import categoryRoutes from './routes/categories';
import expenseRoutes from './routes/expenses';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: [
    'http://localhost:3000',  
    'http://localhost:5173',  
    'https://monumental-alfajores-d4703a.netlify.app'  
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/categories', categoryRoutes);
app.use('/api/expenses', expenseRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Expense Tracker API is running' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});