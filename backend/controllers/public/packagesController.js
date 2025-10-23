import { query } from '../../config/db.js';
import 'dotenv/config';

export const getPublicPackages = async (req, res) => {
    try {
      const { subCategorySlug } = req.query;
  
      if (!subCategorySlug) {
        return res.status(400).json({ message: "subCategorySlug is required for public view" });
      }

      // --- STEP 1: RESOLVE SLUG TO NUMERIC ID ---
      const subcategoryQuery = `SELECT id FROM subcategories WHERE subcategory = ?`;
      const subcategoryResult = await query(subcategoryQuery, [subCategorySlug]);

      if (!subcategoryResult || subcategoryResult.length === 0) {
        // If the slug doesn't match any subcategory, return an empty package list gracefully.
        console.log(`[BACKEND] Subcategory slug '${subCategorySlug}' not found.`);
        return res.status(200).json([]);
      }

      const subcategoryId = subcategoryResult[0].id;

      // --- STEP 2: FETCH ALL PACKAGES FOR THE SUBCATEGORY ---
      const packagesSql = 'SELECT * FROM countries WHERE subcategory_id = ?'; 
      const rows = await query(packagesSql, [subcategoryId]);
            res.status(200).json(rows);

    } catch (err) {
      console.error("[BACKEND ERROR] Failed to fetch packages:", err);
      res.status(500).json({ message: "Failed to fetch packages" });
    }
};
