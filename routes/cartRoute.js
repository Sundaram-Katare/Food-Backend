import express from 'express';
import { addCartItem, getCart, removeCartItem } from '../controllers/cartController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/add", protect, addCartItem);
router.get("/", protect, getCart);
router.delete("/:id", protect, removeCartItem);

export default router;