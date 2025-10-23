
import bcrypt from 'bcryptjs';
import { query } from '../../config/db.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;

// Handler for the user registration request
export const registerUser = async (req, res) => {
  const { fullName, username, email, password, phone, gender, address } = req.body;

  // Basic Server-Side Validation
  if (!fullName || !email || !password || !phone || !gender) {
    return res.status(400).json({ message: 'All required fields must be provided.' });
  }

  // 1. Hash Password
  let hashedPassword;
  try {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  } catch (err) {
    console.error("Password hashing failed:", err);
    return res.status(500).json({ message: 'Server error during registration.' });
  }

  // 2. SQL Query to Insert User
  const sql = `
    INSERT INTO users 
    (fullName, username, email, password, phone, gender, address) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  
  const values = [
    fullName,
    username || null, // Optional fields can be null
    email,
    hashedPassword,
    phone,
    gender,
    address || null, // Optional fields can be null
  ];

  // 3. Execute Database Query
  try {
    const result = await query(sql, values);

    // 4. Success Response
    res.status(201).json({ 
      message: 'User registered successfully!',
      userId: result.insertId,
    });

  } catch (error) {
    // 5. Handle Database Errors (e.g., duplicate unique fields)
    if (error.code === 'ER_DUP_ENTRY') {
      let field = 'Email';
      // Simple check to identify which field caused the duplicate entry
      if (error.message.includes('username')) {
        field = 'Username';
      } else if (error.message.includes('email')) {
        field = 'Email';
      }
      return res.status(409).json({ 
        message: `${field} already exists.`,
      });
    }
    
    console.error("Database insertion failed:", error);
    res.status(500).json({ message: 'Failed to register user due to a server error.' });
  }
};
// Handler for the user login request
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    // 1. Basic Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
  
    try {
      // 2. Look up user by email in the 'users' table
      const sql = `SELECT id, fullName, email, password FROM users WHERE email = ?`;
      const users = await query(sql, [email]);
  
      // Check if user exists
      if (users.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
  
      const user = users[0];
  
      // 3. Compare the provided password with the stored HASHED password
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
  
      // 4. Create a JSON Web Token (JWT) for session management
      const payload = { 
        id: user.id, 
        fullName: user.fullName 
      };
      
      // IMPORTANT: JWT_SECRET must be defined in your backend/.env file
      const token = jwt.sign(
        payload, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' } // Token expires in 1 hour
      );
  
      // 5. Success Response: Send the token and user info
      res.status(200).json({ 
        message: 'Login successful!',
        token,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
        }
      });
  
    } catch (error) {
      console.error("Login failed:", error);
      res.status(500).json({ message: 'Server error during login.' });
    }
  };
