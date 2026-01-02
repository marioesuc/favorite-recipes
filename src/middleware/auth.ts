import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, JWTPayload } from '../types';
import { User } from '../models/User';

const JWT_SECRET: string = process.env.JWT_SECRET || 'your-secret-key';

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    const token = authHeader.substring(7);

    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    req.user = {
      id: user._id.toString(),
      email: user.email,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
    res.status(500).json({ error: 'Authentication error' });
  }
};

