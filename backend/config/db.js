// backend/config/db.js
import mysql from 'mysql2/promise';
import 'dotenv/config'; // Use 'dotenv/config' to load env variables here

// Create the connection pool using environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

/**
 * Helper function to execute a database query.
 * @param {string} sql - The SQL query string.
 * @param {Array} values - The values to be escaped and inserted into the query.
 * @returns {Promise<Array>} - The results of the query.
 */
export const query = async (sql, values = []) => {
  try {
    const [results] = await pool.execute(sql, values);
    return results;
  } catch (error) {
    console.error("Database query failed:", error.message);
    // Propagate a more user-friendly error to the controller
    throw error;
  }
};