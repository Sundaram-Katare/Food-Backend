import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const connectDB = async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('PostgreSQL connected');
  } catch (err) {
    console.error('DB Connection Error:', err);
    process.exit(1);
  }
};