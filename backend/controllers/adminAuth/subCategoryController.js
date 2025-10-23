import bcrypt from 'bcryptjs';
import { query } from '../../config/db.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;

/* -----------------------------------------------------
 ✅ Get all subcategories (with category names) - FIXED JSON PARSING
----------------------------------------------------- */
export const getAllSubcategories = async (req, res) => {
   // 💡 Extract the 'type' query parameter
   const { type } = req.query; 
  
   try {
     let sql = `SELECT s.id, s.subcategory, s.category_id, s.status, s.slider_files, s.heading,s.subheading,s.price,s.about_heading, s.about_text,
         c.category AS category_name FROM subcategories s JOIN categories c ON s.category_id = c.id `;
     let params = [];

     sql += ` ORDER BY s.id DESC`;
  
     const rows = await query(sql, params);
   // Parse JSON safely
     const formattedRows = rows.map(row => {
           let parsedFiles = [];
           if (row.slider_files) {
            if (Array.isArray(row.slider_files)) {
              // Already parsed as array (some MySQL drivers do this)
              parsedFiles = row.slider_files;
            } else if (typeof row.slider_files === 'string') {
              try {
                // Check if it's a JSON array string or a single filename
                if (row.slider_files.trim().startsWith('[')) {
                  parsedFiles = JSON.parse(row.slider_files.replace(/'/g, '"'));
                } else {
                  parsedFiles = [row.slider_files];
                }
              } catch (err) {
                console.error(`❌ Failed to parse slider_files for ID ${row.id}`, err);
                parsedFiles = [];
              }
            } else if (row.slider_files) {
              // Unexpected type (maybe Buffer or object)
              parsedFiles = [String(row.slider_files)];
            } else {
              parsedFiles = [];
            }
            
           }
           return {
             ...row,
             slider_files: parsedFiles,
           };
         });
  
         if (type === 'hero') {
          const { slug } = req.query;
          let filteredRows = formattedRows;
          if (slug) {
            filteredRows = formattedRows.filter(
              item => item.subcategory.toLowerCase() === slug.toLowerCase()
            );
          }
          
        
          const heroData = filteredRows.map(item => ({
            slider_files: item.slider_files || [],
            heading: item.heading,
            subheading: item.subheading,
            price: item.price,
            ctaText: item.ctaText || null, // optional, in case frontend uses it
          }));
          return res.status(200).json(heroData);
        }
        
         res.status(200).json(formattedRows);
  
   } catch (error) {
     console.error("❌ Error fetching subcategories:", error);
     res.status(500).json({ message: "Failed to fetch subcategories." });
   };
  };

/* -----------------------------------------------------
   ✅ Add a new subcategory
----------------------------------------------------- */
export const addSubcategory = async (req, res) => {
   const { subcategory, category_id, status, heading, subheading, price, about_heading, about_text } = req.body;
  
   if (!subcategory || !category_id) {
    return res.status(400).json({ message: "Subcategory and Category ID are required." });
   }
  
   // 💡 FIX: Safely map req.files to an array of filenames.
   // Multer puts the file info in req.files (since you used .array())
   const slider_files_array = req.files && Array.isArray(req.files) ? req.files.map(file => file.filename)   : [];
   
   // Convert the array to a JSON string for MySQL
   const slider_files_json = JSON.stringify(slider_files_array); 
  
   try {
    const sql = ` INSERT INTO subcategories (subcategory, category_id, status, slider_files, heading, subheading, price, about_heading, about_text)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    const result = await query(sql, [
     subcategory,
     category_id,
     status || 'active',
     slider_files_json, // 💡 USE THE JSON STRING
     heading || null,
     subheading || null,
     price || null,
     about_heading || null,
     about_text || null,
    ]);
  
    res.status(201).json({
     message: "✅ Subcategory added successfully!",
     subcategoryId: result.insertId,
     slider_files: slider_files_array, // Return array to frontend for response
    });
   } catch (error) {
    console.error("❌ Error adding subcategory:", error);
    res.status(500).json({ message: "Failed to add subcategory." });
   }
  };

/* -----------------------------------------------------
✅ Update an existing subcategory (FIXED SQL & RESPONSE)
----------------------------------------------------- */
export const updateSubcategory = async (req, res) => {
   const { id } = req.params;
   const {
    subcategory,
    category_id,
    status,
    slider_files: existing_files_json, 
    heading,
    subheading,
    price,
    about_heading,
    about_text,
   } = req.body;
   
   if (!id) {
    return res.status(400).json({ message: "Subcategory ID is required." });
   }
   
     // 1. Get NEW files uploaded via Multer
     const new_uploaded_files = req.files && Array.isArray(req.files) 
                  ? req.files.map(file => file.filename) 
                  : [];
   
     // 2. Get EXISTING files from body and parse them
     let existing_files = [];
     try {
       if (existing_files_json) {
         existing_files = JSON.parse(existing_files_json); 
       }
     } catch (e) {
       console.error("Error parsing existing slider files JSON:", e);
     }
     
     // 3. Combine and stringify the final list
     const final_files_array = [...existing_files, ...new_uploaded_files];
     const final_files_json = JSON.stringify(final_files_array);
   
   try {
          // 💡 FIX: Clean up the SQL string by explicitly adding spaces only where needed
      const sql = `
              UPDATE subcategories 
              SET 
                  subcategory = ?, 
                  category_id = ?, 
                  status = ?, 
                  slider_files = ?,
                  heading = ?, 
                  subheading = ?, 
                  price = ?, 
                  about_heading = ?, 
                  about_text = ?
              WHERE id = ?
          `;
   
      const result = await query(sql.trim(), [
       subcategory,
       category_id,
       status,
       final_files_json, 
       heading || null,
       subheading || null,
       price || null,
       about_heading || null,
       about_text || null,
       id,
      ]);
  
          if (result.affectedRows === 0) {
              return res.status(404).json({ message: "Subcategory not found." });
          }
          
          // 💡 FIX: Add the success response
          res.status(200).json({ message: "✅ Subcategory updated successfully." });
   
   } catch (error) {
    console.error("❌ Error updating subcategory:", error);
    res.status(500).json({ message: "Failed to update subcategory." });
   }
   };
/* -----------------------------------------------------
   ✅ Delete subcategory
----------------------------------------------------- */
export const deleteSubcategory = async (req, res) => {
  const { id } = req.params;
  try {
    const sql = "DELETE FROM subcategories WHERE id = ?";
    const result = await query(sql, [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Subcategory not found." });

    res.status(200).json({ message: "✅ Subcategory deleted successfully." });
  } catch (error) {
    console.error("❌ Error deleting subcategory:", error);
    res.status(500).json({ message: "Failed to delete subcategory." });
  }
};
/* -----------------------------------------------------
 ✅ Get About Content by Subcategory Slug
----------------------------------------------------- */
export const getSubcategoryAboutBySlug = async (req, res) => {
  const { slug } = req.params; 

  if (!slug) {
      return res.status(400).json({ message: "Missing subcategory slug." });
  }

  try {
      const sql = `
          SELECT 
              s.about_heading,
              s.about_text
          FROM subcategories s
          WHERE s.subcategory = ? 
          LIMIT 1
      `;

      const rows = await query(sql, [slug]);

      if (rows.length === 0) {
          return res.status(404).json({ message: `About content for slug '${slug}' not found.` });
      }

      const data = rows[0];

      // Format the data to match the frontend (AboutSection) component: heading, fullText, shortText
      const responseData = {
          heading: data.about_heading || `About ${slug}`,
          fullText: data.about_text,
          // Truncate for shortText
          shortText: data.about_text 
              ? data.about_text.substring(0, 200) + (data.about_text.length > 200 ? '...' : '') 
              : 'No description available for this trip.', 
      };

      res.status(200).json(responseData);

  } catch (error) {
      console.error("❌ Error fetching about content by slug:", error);
      res.status(500).json({ message: "Failed to fetch About content." });
  }
};