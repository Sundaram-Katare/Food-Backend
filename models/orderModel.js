import { pool } from '../db.js';

export const createOrder = async (order) => {
    const { user_id, total_amount, payment_status, order_status } = order;

    const result = await pool.query(
        `INSERT INTO orders (user_id, total_amount, payment_status, order_status) 
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [user_id, total_amount, payment_status, order_status]
    );
    return result.rows[0];
};

export const getOrderByUser = async (user_id) => {
    const result = await pool.query(
        `SELECT * FROM orders WHERE user_id = $1`, [user_id]
    );
    return result.rows;
};

export const updateOrderStatus = async (id, order_status) => {
    const result = await pool.query(
        `UPDATE orders SET order_status = $1 WHERE id = $2`, [order_status, id]
    );
    return result.rows[0];
};

export const getAllOrders = async () => {
    const result = await pool.query(
        `SELECT * FROM orders ORDER BY created_at DESC`
    );
    return result.rows;
};