import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { upload } from '../middleware/upload';
import { createRecipe, getRecipes, getRecipe } from '../controllers/recipeController';

const router = Router();

// All recipe routes require authentication
router.use(authenticate);

router.get('/', getRecipes);
router.get('/:id', getRecipe);
router.post('/', upload.single('image'), createRecipe);

export default router;

