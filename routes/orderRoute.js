import express from "express";
import { addOrder, listAllOrders, changeOrderStatus, getUserOrders } from "../controllers/orderController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/". protect, addOrder);
router.get('/my-orders', protect, getUserOrders);
router.patch('/:id/status', protect, changeOrderStatus);
router.get('/', protect, listAllOrders);

export default router;