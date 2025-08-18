import Razorpay from 'razorpay';                              
import crypto from 'crypto';                                 
import {
  getFoodPrice,
  insertPaymentCreated,
  markPaymentPaid,
  markPaymentFailed,
  getPaymentsForUser,
  getAllPayments
} from '../models/paymentModel.js';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createPaymentOrder = async (req, res) => {
  try {
    const userId = req.user.id;                               
    const { food_id, quantity = 1, currency = 'INR' } = req.body;

    if (!food_id || quantity <= 0) {
      return res.status(400).json({ message: 'food_id and valid quantity are required' });
    }

    const food = await getFoodPrice(food_id);
    if (!food) return res.status(404).json({ message: 'Food not found' });

    const amount = Number(food.price) * Number(quantity);

    const rpOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency,
      receipt: `fd_${food_id}_${Date.now()}`,
      notes: { userId: String(userId), foodId: String(food_id), qty: String(quantity) }
    });

    const paymentRow = await insertPaymentCreated({
      userId,
      foodId: food_id,
      quantity,
      amount,
      currency,
      razorpayOrderId: rpOrder.id
    });

    return res.json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,                      
      order: rpOrder,                                         
      payment: paymentRow,                                   
      food: { id: food.id, name: food.name, unit_price: food.price }
    });
  } catch (err) {
    console.error('createPaymentOrder error:', err);
    return res.status(500).json({ message: 'Failed to create order', error: err.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const hmac = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)  
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)  
      .digest('hex');                                         

    const isValid = hmac === razorpay_signature;

    const row = isValid
      ? await markPaymentPaid({
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature
        })
      : await markPaymentFailed({ razorpayOrderId: razorpay_order_id });

    if (!row) return res.status(404).json({ message: 'Payment record not found' });

    return res.json({
      success: isValid,
      message: isValid ? 'Payment verified' : 'Invalid signature',
      payment: row
    });
  } catch (err) {
    console.error('verifyPayment error:', err);
    return res.status(500).json({ message: 'Verification failed', error: err.message });
  }
};

export const myPayments = async (req, res) => {
  try {
    const rows = await getPaymentsForUser(req.user.id);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch payments', error: err.message });
  }
};

export const listAllPayments = async (_req, res) => {
  try {
    const rows = await getAllPayments();
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch all payments', error: err.message });
  }
};
