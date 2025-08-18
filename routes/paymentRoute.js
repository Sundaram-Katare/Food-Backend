import express from 'express';
import { protect, authorizeRoles } from '../middlewares/authMiddleware.js';
import {
  createPaymentOrder,
  verifyPayment,
  myPayments,
  listAllPayments
} from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create', protect, createPaymentOrder); 

router.post('/verify', protect, verifyPayment);

router.get('/my', protect, myPayments);                  

router.get('/', protect, authorizeRoles('admin'), listAllPayments); 

export default router;
