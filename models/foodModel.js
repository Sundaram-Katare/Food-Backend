import { pool } from '../db.js';

export const createFood = async (food) => {
    const { name, description, category, price, image_url } = food;
    const result = await pool.query(`INSERT INTO foods (name, description, category, price, image_url ) VALUES ($1, $2, $3, $4, $5 ) RETURNING *`, [name, description, category, price, image_url]);
    return result.rows[0];
};

export const getAllFoods = async () => {
    const result = await pool.query('SELECT * FROM foods WHERE is_available = true');
    return result.rows;
};

export const getFoodById = async (id) => {
  const result = await pool.query(`SELECT * FROM foods WHERE id = $1`, [id]);
  return result.rows[0];
};

export const updateFood = async (id, food) => {
  const { name, description, category, price, image_url } = food;
  const result = await pool.query(
    `UPDATE foods SET name=$1, description=$2, category=$3, price=$4, image_url=$5 WHERE id=$6 RETURNING *`,
    [name, description, category, price, image_url, id]
  );
  return result.rows[0];
};

export const deleteFood = async (id) => {
  await pool.query(`DELETE FROM foods WHERE id = $1`, [id]);
};