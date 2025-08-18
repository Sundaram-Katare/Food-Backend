import {pool} from '../db.js';                     

export const getFoodPrice = async (foodId) => {
  const r = await pool.query(
    'SELECT id, name, price FROM foods WHERE id = $1',
    [foodId]                                    
  );
  return r.rows[0];                              
};

export const insertPaymentCreated = async ({
  userId, foodId, quantity, amount, currency, razorpayOrderId
}) => {
  const r = await pool.query(
    `INSERT INTO payments
       (user_id, food_id, quantity, amount, currency, status, razorpay_order_id)
     VALUES ($1, $2, $3, $4, $5, 'created', $6)
     RETURNING *`,
    [userId, foodId, quantity, amount, currency, razorpayOrderId]
  );
  return r.rows[0];
};

export const markPaymentPaid = async ({
  razorpayOrderId, razorpayPaymentId, razorpaySignature
}) => {
  const r = await pool.query(
    `UPDATE payments
       SET status = 'paid',
           razorpay_payment_id = $2,
           razorpay_signature  = $3
     WHERE razorpay_order_id = $1
     RETURNING *`,
    [razorpayOrderId, razorpayPaymentId, razorpaySignature]
  );
  return r.rows[0];
};

export const markPaymentFailed = async ({ razorpayOrderId }) => {
  const r = await pool.query(
    `UPDATE payments SET status = 'failed' WHERE razorpay_order_id = $1 RETURNING *`,
    [razorpayOrderId]
  );
  return r.rows[0];
};

export const getPaymentsForUser = async (userId) => {
  const r = await pool.query(
    `SELECT p.*, f.name AS food_name
       FROM payments p
       JOIN foods f ON f.id = p.food_id
      WHERE p.user_id = $1
      ORDER BY p.created_at DESC`,
    [userId]
  );
  return r.rows;
};

export const getAllPayments = async () => {
  const r = await pool.query(
    `SELECT p.*, u.name AS user_name, f.name AS food_name
       FROM payments p
       JOIN users u ON u.id = p.user_id
       JOIN foods f ON f.id = p.food_id
      ORDER BY p.created_at DESC`
  );
  return r.rows;
};
