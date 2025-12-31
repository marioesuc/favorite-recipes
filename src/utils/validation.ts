import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const recipeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  cuisine: z.string().min(1, 'Cuisine type is required'),
  sourceUrl: z.string().url('Invalid URL format'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RecipeInput = z.infer<typeof recipeSchema>;

