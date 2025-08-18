import {pool} from '../db.js';

export const createRating = async (userId, foodId, rating, comment) => {
    const result = await pool.query(
        `INSERT INTO ratings (user_id, food_id, rating, comment)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [userId, foodId, rating, comment]
    );
    return result.rows[0];
};

export const getRatingsByFood = async (foodId) => {
    const result = await pool.query(
        `SELECT r.*, u.name AS user_name
         FROM ratings r
         JOIN users u ON r.user_id = u.id
         WHERE food_id = $1`,
        [foodId]
    );
    return result.rows;
};
