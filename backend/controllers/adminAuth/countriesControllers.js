import bcrypt from 'bcryptjs';
import { query } from '../../config/db.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;

// Helper function to safely parse potential JSON string fields
const getJsonBodyField = (body, fieldName) => {
    const value = body[fieldName];
    if (typeof value === 'string') {
        try {
            // Frontend sends stringified JSON for arrays/objects
            return JSON.parse(value);
        } catch (e) {
            console.error(`Error parsing JSON field ${fieldName}:`, e);
            return null; // Return null if parsing fails
        }
    }
    return value;
};

// GET all countries/packages
export const getCountries = async (req, res) => {
    try {
        const sql = 'SELECT * FROM countries';
        const rows = await query(sql);
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch countries" });
    }
};

// POST add new country/package
export const addCountry = async (req, res) => {
    try {
        const {
            package_name,
            category_id,
            subcategory_id,
            location,
            price,
            date,
            duration,
            about,
            // 🏆 NEW FIELDS
            itinerary, 
            inclusions,
            exclusions,
        } = req.body;

        // 1. Get uploaded file array from Multer
        const uploadedFiles = req.files || [];

        if (!package_name || !category_id || !subcategory_id)
            return res.status(400).json({ message: "Required fields missing" });
        
        // 2. Map files to DB structure, including the full public path
        const filesToDb = uploadedFiles.map(file => ({
            name: file.originalname,
            type: file.mimetype,
            size: file.size,
            path: `uploads/country_files/${file.filename}`,
        }));
        const filesJson = JSON.stringify(filesToDb);

        // 🏆 NEW: Safely parse and stringify the new JSON fields
        const itineraryJson = JSON.stringify(getJsonBodyField(req.body, 'itinerary') || []);
        const inclusionsJson = JSON.stringify(getJsonBodyField(req.body, 'inclusions') || []);
        const exclusionsJson = JSON.stringify(getJsonBodyField(req.body, 'exclusions') || []);

        // 3. Insert into database with new fields
        const result = await query( 
            `INSERT INTO countries 
            (package_name, category_id, subcategory_id, location, price, date, duration, about, files, itinerary, inclusions, exclusions) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                package_name,
                category_id,
                subcategory_id,
                location,
                price,
                date,
                duration,
                about,
                filesJson,
                itineraryJson, // 🏆 ADDED
                inclusionsJson, // 🏆 ADDED
                exclusionsJson, // 🏆 ADDED
            ]
        );

        res.status(201).json({ message: "Package added successfully", id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to add package" });
    }
};

export const updateCountry = async (req, res) => {
    try {
        const { id } = req.params; 
        const {
            package_name,
            category_id,
            subcategory_id,
            location,
            price,
            date,
            duration,
            about,
            existing_files_data, 
            // 🏆 NEW FIELDS
            itinerary,
            inclusions,
            exclusions,
        } = req.body;

        const uploadedFiles = req.files || []; // New files uploaded by Multer

        // 1. Handle file merging and JSON serialization (Existing logic)
        let filesToSave = [];
        if (existing_files_data) {
            filesToSave = getJsonBodyField(req.body, 'existing_files_data') || [];
        }
        
        const newFilesMetadata = uploadedFiles.map(file => ({
            name: file.originalname,
            type: file.mimetype,
            size: file.size,
            path: `uploads/country_files/${file.filename}`,
        }));

        filesToSave = [...filesToSave, ...newFilesMetadata];
        const filesJson = JSON.stringify(filesToSave);

        // 🏆 NEW: Safely parse and stringify the new JSON fields
        const itineraryJson = JSON.stringify(getJsonBodyField(req.body, 'itinerary') || []);
        const inclusionsJson = JSON.stringify(getJsonBodyField(req.body, 'inclusions') || []);
        const exclusionsJson = JSON.stringify(getJsonBodyField(req.body, 'exclusions') || []);


        // 2. Construct the SQL update query
        const updateFields = {
            package_name, category_id, subcategory_id, location, price, date, 
            duration, about, 
            files: filesJson, 
            itinerary: itineraryJson,    // 🏆 ADDED
            inclusions: inclusionsJson,  // 🏆 ADDED
            exclusions: exclusionsJson,  // 🏆 ADDED
        };

        const setClauses = Object.keys(updateFields)
            .filter(key => updateFields[key] !== undefined)
            .map(key => `${key} = ?`)
            .join(', ');
            
        const values = Object.keys(updateFields)
            .filter(key => updateFields[key] !== undefined)
            .map(key => updateFields[key]);

        if (setClauses.length === 0) {
            return res.status(400).json({ message: "No data provided for update" });
        }

        const sql = `UPDATE countries SET ${setClauses} WHERE id = ?`;
        values.push(id); 

        // 3. Execute the update
        const result = await query(sql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Package with ID ${id} not found` });
        }

        res.status(200).json({ message: "Package updated successfully", id: id });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update package" });
    }
};

// DELETE country/package
export const deleteCountry = async (req, res) => {
    try {
        const { id } = req.params;
        await query(`DELETE FROM countries WHERE id = ?`, [id]);
        res.json({ message: "Package deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete package" });
    }
};