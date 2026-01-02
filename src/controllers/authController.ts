import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { registerSchema, loginSchema } from '../utils/validation';
import { AppError, handleError } from '../utils/errors';

const JWT_SECRET: string = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '7d';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = registerSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      throw new AppError('Email already registered', 400);
    }

    // Create new user
    const user = new User({
      email: validatedData.email,
      password: validatedData.password,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
      },
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = loginSchema.parse(req.body);

    // Find user by email
    const user = await User.findOne({ email: validatedData.email });
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    // Compare passwords
    const isPasswordValid = await user.comparePassword(validatedData.password);
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
      },
    });
  } catch (error) {
    handleError(error, res);
  }
};

