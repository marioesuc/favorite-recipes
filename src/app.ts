import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { connectDatabase } from './config/database';
import authRoutes from './routes/auth';
import recipeRoutes from './routes/recipes';
import { handleError } from './utils/errors';
import fs from 'fs';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Ensure uploads directory exists (only in non-serverless environments)
const isServerless = process.env.VERCEL === '1' || process.env.VERCEL_ENV;
const uploadsDir = path.join(process.cwd(), 'uploads');

if (!isServerless) {
  // Only create uploads directory in non-serverless environments
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  
  // Serve static files from uploads directory (only in non-serverless)
  app.use('/uploads', express.static(uploadsDir));
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  handleError(err, res);
});

// Start server (only if not in serverless environment)
const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Only start server if not in serverless environment (Vercel)
if (process.env.VERCEL !== '1' && !process.env.VERCEL_ENV) {
  startServer();
}

export default app;

