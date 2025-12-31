import { Response } from 'express';
import { AuthRequest } from '../types';
import { Recipe } from '../models/Recipe';
import { recipeSchema } from '../utils/validation';
import { AppError, handleError } from '../utils/errors';
import path from 'path';

export const createRecipe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      throw new AppError('Image is required', 400);
    }

    const validatedData = recipeSchema.parse({
      title: req.body.title,
      description: req.body.description,
      cuisine: req.body.cuisine,
      sourceUrl: req.body.sourceUrl,
    });

    const recipe = new Recipe({
      ...validatedData,
      imagePath: req.file.path,
      userId: req.user!.id,
    });

    await recipe.save();

    res.status(201).json({
      message: 'Recipe created successfully',
      recipe: {
        id: recipe._id.toString(),
        title: recipe.title,
        description: recipe.description,
        cuisine: recipe.cuisine,
        sourceUrl: recipe.sourceUrl,
        imageUrl: `/uploads/${path.basename(recipe.imagePath)}`,
        createdAt: recipe.createdAt,
        updatedAt: recipe.updatedAt,
      },
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getRecipes = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const recipes = await Recipe.find({ userId: req.user!.id })
      .sort({ createdAt: -1 })
      .select('-__v');

    const recipesWithImageUrl = recipes.map((recipe) => ({
      id: recipe._id.toString(),
      title: recipe.title,
      description: recipe.description,
      cuisine: recipe.cuisine,
      sourceUrl: recipe.sourceUrl,
      imageUrl: `/uploads/${path.basename(recipe.imagePath)}`,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
    }));

    res.json({
      recipes: recipesWithImageUrl,
      count: recipesWithImageUrl.length,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getRecipe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      throw new AppError('Recipe not found', 404);
    }

    // Verify recipe belongs to user
    if (recipe.userId.toString() !== req.user!.id) {
      throw new AppError('Unauthorized access to recipe', 403);
    }

    res.json({
      recipe: {
        id: recipe._id.toString(),
        title: recipe.title,
        description: recipe.description,
        cuisine: recipe.cuisine,
        sourceUrl: recipe.sourceUrl,
        imageUrl: `/uploads/${path.basename(recipe.imagePath)}`,
        createdAt: recipe.createdAt,
        updatedAt: recipe.updatedAt,
      },
    });
  } catch (error) {
    handleError(error, res);
  }
};

