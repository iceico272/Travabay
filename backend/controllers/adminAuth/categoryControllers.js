import bcrypt from 'bcryptjs';
import { query } from '../../config/db.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;


// ----------------------------------------------------------------
// 1. FETCH ALL CATEGORIES (READ)
// ----------------------------------------------------------------
export const getAllCategories = async (req, res) => {
    try {
        const sql = 'SELECT id, category, status FROM categories';
        const rows = await query(sql);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Failed to fetch categories from database.' });
    }
};

// ----------------------------------------------------------------
// 2. ADD A NEW CATEGORY (CREATE)
// ----------------------------------------------------------------
export const addCategory = async (req, res) => {
    const { category, status } = req.body;

    if (!category || !status) {
        return res.status(400).json({ message: 'Category name and status are required.' });
    }

    try {
        // 🏆 CORRECTION: Include 'status' field in the INSERT query
        const sql = 'INSERT INTO categories (category, status) VALUES (?, ?)';
        const values = [category, status];

        // Use .trim() for safer execution, although often not needed for single line.
        const result = await query(sql.trim(), values); 

        if (result.affectedRows === 0) {
            throw new Error('Database insertion failed.');
        }

        res.status(201).json({ 
            message: 'Category added successfully!',
            categoryId: result.insertId
        });

    } catch (error) {
        console.error('Error adding category:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Category name already exists.' });
        }
        res.status(500).json({ message: 'Failed to add category to database.' });
    }
};

// ----------------------------------------------------------------
// 3. UPDATE A CATEGORY (UPDATE)
// ----------------------------------------------------------------
export const updateCategory = async (req, res) => {
    const { id } = req.params; // Get ID from URL (e.g., /categories/5)
    const { category, status } = req.body; // Get data from request body

    if (!category || !status) {
        return res.status(400).json({ message: 'Category name and status are required for update.' });
    }

    try {
        const sql = `
            UPDATE categories
            SET category = ?, status = ?
            WHERE id = ?
        `;
        const values = [category, status, id];

        const result = await query(sql.trim(), values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found or no changes made.' });
        }

        res.status(200).json({ message: 'Category updated successfully!' });

    } catch (error) {
        console.error('Error updating category:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Category name already exists.' });
        }
        res.status(500).json({ message: 'Failed to update category.' });
    }
};

// ----------------------------------------------------------------
// 4. DELETE A CATEGORY (DELETE)
// ----------------------------------------------------------------
export const deleteCategory = async (req, res) => {
    const { id } = req.params; // Get ID from URL

    try {
        const sql = 'DELETE FROM categories WHERE id = ?';
        const values = [id];

        const result = await query(sql.trim(), values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found.' });
        }

        res.status(200).json({ message: 'Category deleted successfully!' });

    } catch (error) {
        // Note: If this category is referenced by subcategories/packages, 
        // the database might throw a foreign key constraint error (ER_ROW_IS_REFERENCED).
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Failed to delete category.' });
    }
};