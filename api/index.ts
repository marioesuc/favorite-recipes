import app from '../src/app';
import { connectDatabase } from '../src/config/database';

// Connect to database on cold start (non-blocking)
connectDatabase().catch((error) => {
  console.error('Initial database connection failed:', error);
  // Connection will be retried on first request
});

// Vercel serverless function handler
export default app;

