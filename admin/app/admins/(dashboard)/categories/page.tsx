"use client";
import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
// Using a safe fallback for the API URL is often better than relying on process.env alone in client code
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; 

interface Category {
  id: number;
  category: string;
  status: "Active" | "Inactive";
}

interface RawCategory {
   id: number;
   category: string;
   status: string;
   [key: string]: unknown; 
  }
// ----------------------------------------------------

const CategoryListPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null
  );

  const resetForm = () => {
    setCategoryName("");
    setStatus("Active");
    setIsEditing(false);
    setEditingCategoryId(null);
    setShowForm(false);
  };

  const handleOpenAddForm = () => {
    resetForm(); 
    setShowForm(true);
  };

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");

      // 🏆 FIX: Use RawCategory[] instead of 'any[]'
      const rawData: RawCategory[] = await res.json(); 

      // Normalize status field during mapping
      const processedData: Category[] = rawData.map((item) => {
        const normalizedStatus =
          item.status &&
          typeof item.status === "string" &&
          item.status.toLowerCase() === "active"
            ? "Active"
            : "Inactive";

        return {
          id: item.id, // Ensure all required fields are present
          category: item.category,
          status: normalizedStatus as "Active" | "Inactive",
        };
      });

      setCategories(processedData);
    // 🏆 FIX: Type the catch block variable as 'unknown' and safely check the error
    } catch (err: unknown) { 
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred during fetch.");
        }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteCategory = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/categories/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete category");
      fetchCategories();
    // 🏆 FIX: Type the catch block variable as 'unknown'
    } catch (err: unknown) { 
        if (err instanceof Error) {
            alert(err.message);
        } else {
            alert("An unknown error occurred during deletion.");
        }
    }
  };

  const handleEdit = (category: Category) => {
    setCategoryName(category.category);
    setStatus(category.status);
    setEditingCategoryId(category.id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleUpdateApi = async () => {
    if (!categoryName || !status || !editingCategoryId)
      return alert("Missing data for update!");

    setIsSubmitting(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/admin/categories/${editingCategoryId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category: categoryName, status }),
        }
      );

      if (!res.ok) throw new Error("Failed to update category");

      alert("Category updated successfully!");
      resetForm();
      fetchCategories();
    // 🏆 FIX: Type the catch block variable as 'unknown'
    } catch (err: unknown) {
        if (err instanceof Error) {
            alert(err.message);
        } else {
            alert("An unknown error occurred during update.");
        }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      handleUpdateApi();
    } else {
      handleAddCategory(); 
    }
  };

  
  const handleAddCategory = async () => { 
    if (!categoryName || !status) return alert("All fields required!");

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: categoryName, status }),
      });

      if (!res.ok) throw new Error("Failed to add category");
      resetForm();
      fetchCategories();
    // 🏆 FIX: Type the catch block variable as 'unknown'
    } catch (err: unknown) {
        if (err instanceof Error) {
            alert(err.message);
        } else {
            alert("An unknown error occurred during addition.");
        }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        <p className="ml-3 text-lg text-gray-600">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-xl">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <nav className="text-gray-500 text-sm mb-4">
        <Link href="/admins/dashboard" className="hover:underline">
          Home
        </Link>{" "}
        / <span className="text-gray-700">Category</span>
        {showForm && (
          <>
            {" / "}
            <span className="text-gray-700">
              {isEditing ? "Edit Category" : "New Category"}
            </span>
          </>
        )}
      </nav>

      {/* Header */}
      <div className="flex justify-between items-center border-b-2 pb-2 border-gray-200 mb-6">
        <h2 className="text-4xl font-extrabold text-green-700">
          Categories Management
        </h2>
        {!showForm && (
          <button
            onClick={handleOpenAddForm}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 transform hover:scale-105"
          >
            <FaPlus size={16} />
            <span className="hidden sm:inline">Add New Category</span>
          </button>
        )}
      </div>

      {showForm ? (
        // Form left-aligned
        <div className="flex">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow-xl space-y-4 w-full max-w-lg"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {isEditing
                ? `Edit Category (ID: ${editingCategoryId})`
                : "Add New Category"}
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category Name
              </label>
              <input
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="e.g., International"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "Active" | "Inactive")
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="flex space-x-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 disabled:opacity-50"
              >
                {isSubmitting
                  ? "Saving..."
                  : isEditing
                  ? "Update Category"
                  : "Save Category"}
              </button>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                className="flex-1 py-2 px-4 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-2xl shadow-xl overflow-x-auto border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-green-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {cat.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {cat.category}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          cat.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {cat.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm space-x-3">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No categories found.
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

export default CategoryListPage;