import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { addRating, getFoodRatings } from '../controllers/ratingController.js';

const router = express.Router();

router.post('/', protect, addRating);
router.get('/:foodId', getFoodRatings);

export default router;
