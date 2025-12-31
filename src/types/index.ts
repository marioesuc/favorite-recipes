import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export interface JWTPayload extends JwtPayload {
  userId: string;
  email: string;
}

