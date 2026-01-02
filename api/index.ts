import app from '../src/app';
import { connectDatabase } from '../src/config/database';

// Ensure database is connected before handling requests
const ensureDatabaseConnection = async () => {
  try {
    await connectDatabase();
  } catch (error) {
    console.error('Database connection error:', error);
    // Don't throw - let the request handler deal with it
  }
};

// Connect on module load (for warm starts)
ensureDatabaseConnection();

// Vercel serverless function handler
export default async (req: any, res: any) => {
  // Ensure connection on each request (for cold starts)
  await ensureDatabaseConnection();
  return app(req, res);
};

