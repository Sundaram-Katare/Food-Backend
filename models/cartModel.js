import { pool } from "../db.js";

export const addToCart = async (user_id, food_id, quantity) => {
    const existing = await pool.query(
        `SELECT * FROM cart WHERE user_id = $1 AND food_id = $2`,
        [user_id, food_id]
    );

    if (existing.rows.length > 0) {
        await pool.query(
            `UPDATE cart SET quantity = quantity + $1 WHERE user_id = $2 AND food_id = $3`,
            [quantity, user_id, food_id]
        );
    } else {
        await pool.query(
            'INSERT INTO cart (user_id, food_id, quantity) VALUES ($1, $2, $3)',
            [user_id, food_id, quantity]
        );
    }
};

export const getCartItems = async (user_id) => {
    const result = await pool.query(
        `SELECT c.id AS cart_id, f.id AS food_id, f.name, f.price, f.image, c.quantity
         FROM cart c
         JOIN foods f ON c.food_id = f.id
         WHERE c.user_id = $1
        `, [user_id]
    );
};

export const deleteCartItem = async (user_id, cart_id) => {
    return await pool.query(
        `DELETE FROM cart WHERE id = $1 AND user_id = $2 RETURNING *`, [user_id, cart_id]
    );
};
