import express from 'express';
import {
  addFood,
  getFoods,
  getFood,
  updateFoodById,
  deleteFoodById,
} from '../controllers/foodController.js';

import { protect, authorizeRoles } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

router.get('/', getFoods);                 // public
router.get('/:id', getFood);              // public
router.post('/', protect, authorizeRoles('admin'), upload.single('image'), addFood);
router.patch('/:id', protect, authorizeRoles('admin'), upload.single('image'), updateFoodById);
router.delete('/:id', protect, authorizeRoles('admin'), deleteFoodById);

export default router;
