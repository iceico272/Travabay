"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface Subcategory {
  id: number;
  subcategory: string;
  category_id: number;
  status: "Active" | "Inactive";
  heading?: string;
  subheading?: string;
  price?: number;
  about_heading?: string;
  about_text?: string;
  // Note: The API response might return the path/metadata, not File objects
  slider_files?: { type: "image" | "video"; path: string }[]; 
}

interface Category {
  id: number;
  category: string;
}

// ----------------------------------------------------
// 🏆 NEW: Interface for Raw API Subcategory Data
// ----------------------------------------------------
interface RawSubcategory {
    id: number;
    subcategory: string;
    category_id: number | string; // Handle case where API might send string
    status: string;
    price?: number | string; // Handle case where API might send string
    // Allow other fields from the API
    [key: string]: unknown;
}
// ----------------------------------------------------

const SubcategoryListPage = () => {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // form fields
  const [subcategoryName, setSubcategoryName] = useState("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [price, setPrice] = useState("");
  const [aboutHeading, setAboutHeading] = useState("");
  const [aboutText, setAboutText] = useState("");
  const [sliderFiles, setSliderFiles] = useState<File[]>([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingSubcategoryId, setEditingSubcategoryId] = useState<number | null>(null);

  const fetchSubcategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/subcategories`);
      if (!res.ok) throw new Error("Failed to fetch subcategories");
      
      // 🏆 FIX: Use RawSubcategory[]
      const rawData: RawSubcategory[] = await res.json(); 
      const processedData: Subcategory[] = rawData.map(item => {
          const normalizedStatus = 
              item.status && typeof item.status === 'string' && item.status.toLowerCase() === 'active'
              ? 'Active'
              : 'Inactive'; 
          
          const numericPrice = item.price ? Number(item.price) : undefined;
          
          return {
              ...item as Subcategory, // Cast the core object
              status: normalizedStatus as "Active" | "Inactive",
              category_id: Number(item.category_id), // Ensure category_id is a number
              price: isNaN(numericPrice as number) ? undefined : numericPrice, // Ensure price is valid number or undefined
          };
      });
      
      setSubcategories(processedData);

    // 🏆 FIX: Use unknown for error handling
    } catch (err: unknown) { 
      if (err instanceof Error) {
          setError(err.message);
      } else {
          setError("An unknown error occurred while fetching subcategories.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json(); // Data matches Category[] interface
      setCategories(data);
    } catch (err: unknown) { // 🏆 FIX: Use unknown
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  const resetForm = () => {
    setSubcategoryName("");
    setCategoryId(0);
    setStatus("Active");
    setHeading("");
    setSubheading("");
    setPrice("");
    setAboutHeading("");
    setAboutText("");
    setSliderFiles([]);
    setIsEditing(false);
    setEditingSubcategoryId(null);
    setShowForm(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSliderFiles(Array.from(e.target.files));
    }
  };

  const handleEdit = (subcategory: Subcategory) => {
    setSubcategoryName(subcategory.subcategory);
    setCategoryId(subcategory.category_id);
    setStatus(subcategory.status);
    setHeading(subcategory.heading || "");
    setSubheading(subcategory.subheading || "");
    // Price must be converted to string for the input field
    setPrice(subcategory.price ? String(subcategory.price) : ""); 
    setAboutHeading(subcategory.about_heading || "");
    setAboutText(subcategory.about_text || "");
    setEditingSubcategoryId(subcategory.id);
    setIsEditing(true);
    setShowForm(true);
    // Note: Slider files (paths) from API response are not loaded into state
    // because the input[type=file] is generally read-only for security.
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subcategoryName || categoryId === 0) return alert("Subcategory Name and Category are required!");

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("subcategory", subcategoryName);
    formData.append("category_id", String(categoryId));
    formData.append("status", status);
    formData.append("heading", heading);
    formData.append("subheading", subheading);
    formData.append("price", price);
    formData.append("about_heading", aboutHeading);
    formData.append("about_text", aboutText);
    sliderFiles.forEach((file) => formData.append("slider_files", file));

    try {
      const url = isEditing
        ? `${API_BASE_URL}/api/admin/subcategories/${editingSubcategoryId}` // 🏆 FIX: Corrected URL path
        : `${API_BASE_URL}/api/admin/subcategories`;

      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, { method, body: formData });
      
      if (!res.ok) {
        // Read response body for specific error message if available
        const errorText = await res.text();
        throw new Error(`Failed to save subcategory: ${res.status} - ${errorText}`);
      }

      resetForm();
      fetchSubcategories();
    // 🏆 FIX: Use unknown for error handling
    } catch (err: unknown) { 
      if (err instanceof Error) {
          alert(err.message);
      } else {
          alert("An unknown error occurred during submission.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this subcategory?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/subcategories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete subcategory");
      fetchSubcategories();
    // 🏆 FIX: Use unknown for error handling
    } catch (err: unknown) {
      if (err instanceof Error) {
          alert(err.message);
      } else {
          alert("An unknown error occurred during deletion.");
      }
    }
  };

  const getCategoryName = (id: number) => categories.find((c) => c.id === id)?.category || "Unknown";

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        <p className="ml-3 text-lg text-gray-700 font-medium">Loading subcategories...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-6 bg-red-100 border-l-4 border-red-500 text-red-800 rounded-xl">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-800">
      <nav className="text-gray-700 text-sm mb-4">
        <Link href="/admins/dashboard" className="hover:underline font-medium">Home</Link> /{" "}
        <Link href="/admins/categories" className="hover:underline font-medium">Category</Link> /{" "}
        <span className="font-semibold text-gray-900">
          {showForm ? (isEditing ? "Edit Subcategory" : "New Subcategory") : "Subcategory"}
        </span>
      </nav>

      <div className="flex justify-between items-center border-b pb-3 border-gray-300 mb-6">
        <h2 className="text-3xl font-bold text-green-800">Subcategories Management</h2>
        {!showForm && (
          <button
            onClick={() => {
                resetForm(); // Ensure clean form when opening "Add New"
                setShowForm(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-green-700 text-white rounded-lg shadow-md hover:bg-green-800 transition"
          >
            <FaPlus size={16} />
            <span>Add New</span>
          </button>
        )}
      </div>

      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-lg space-y-4 w-full max-w-2xl border border-gray-200"
        >
          <h3 className="text-xl font-bold text-gray-900">
            {isEditing ? `Edit Subcategory ID: ${editingSubcategoryId}` : "Add New Subcategory"}
          </h3>

          {/* Inputs */}
          <div>
            <label className="block text-sm font-semibold text-gray-800">Select Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-400 text-gray-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            >
              <option value={0}>-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800">Subcategory Name</label>
            <input
              value={subcategoryName}
              onChange={(e) => setSubcategoryName(e.target.value)}
              className="mt-1 block w-full border border-gray-400 text-gray-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* More Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-800">Heading</label>
              <input value={heading} onChange={(e) => setHeading(e.target.value)} className="mt-1 w-full border border-gray-400 text-gray-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800">Subheading</label>
              <input value={subheading} onChange={(e) => setSubheading(e.target.value)} className="mt-1 w-full border border-gray-400 text-gray-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 w-full border border-gray-400 text-gray-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 499.99"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800">About Heading</label>
            <input value={aboutHeading} onChange={(e) => setAboutHeading(e.target.value)} className="mt-1 w-full border border-gray-400 text-gray-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800">About Text</label>
            <textarea value={aboutText} onChange={(e) => setAboutText(e.target.value)} className="mt-1 w-full border border-gray-400 text-gray-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500" rows={3} />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800">Slider Files (Images/Videos)</label>
            <input type="file" multiple accept="image/*,video/*" onChange={handleFileChange} className="mt-1 w-full text-gray-800" />
            <div className="mt-2 flex flex-wrap gap-3">
              {sliderFiles.map((file, idx) => (
                <div key={idx} className="border rounded p-2 text-sm bg-gray-100 text-gray-800">
                  {file.name}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")} className="mt-1 block w-full border border-gray-400 text-gray-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex space-x-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : isEditing ? "Update Subcategory" : "Save Subcategory"}
            </button>
            <button type="button" onClick={resetForm} className="flex-1 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white p-6 rounded-2xl shadow-lg overflow-x-auto border border-gray-300">
          <table className="min-w-full divide-y divide-gray-300 text-gray-800">
            <thead className="bg-green-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase">Subcategory</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase">Heading</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subcategories.length > 0 ? (
                subcategories.map((sub) => (
                  <tr key={sub.id} className="hover:bg-green-50 transition">
                    <td className="px-6 py-4">{sub.id}</td>
                    <td className="px-6 py-4">{sub.subcategory}</td>
                    <td className="px-6 py-4">{getCategoryName(sub.category_id)}</td>
                    <td className="px-6 py-4">{sub.heading || "-"}</td>
                    <td className="px-6 py-4">{sub.price ? `₹${sub.price}` : "-"}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          sub.status === "Active"
                            ? "bg-green-200 text-green-900"
                            : "bg-yellow-200 text-yellow-900"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-3">
                      <button onClick={() => handleEdit(sub)} className="text-blue-700 hover:text-blue-900">
                        <FaEdit size={16} />
                      </button>
                      <button onClick={() => handleDelete(sub.id)} className="text-red-700 hover:text-red-900">
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-600 font-medium">
                    No subcategories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubcategoryListPage;