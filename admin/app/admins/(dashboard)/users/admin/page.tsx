"use client";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaCheckCircle, FaBan } from "react-icons/fa";
// Using a safe fallback for the API URL is often better
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""; 

// 🏆 Interface for Admin Data
interface Admin {
  id: number;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
}

// ----------------------------------------------------
// 🏆 NEW: Interface for Raw API Response Data
// This handles cases where the raw data might have slightly different or extra fields
interface RawAdminData {
    id: number | string;
    username: string;
    fullName: string;
    email: string;
    phone: string | null;
    status: string;
    [key: string]: unknown; // Allows for other unknown fields
}
// ----------------------------------------------------

const AdminListPage: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form and Editing State
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingAdminId, setEditingAdminId] = useState<number | null>(null);

  // Form Field States
  const [username, setUsername] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [status, setStatus] = useState<Admin["status"]>("active"); // Use Admin status type

  // --- Utility & Fetching ---

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/users/admin`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 🏆 FIX: Use RawAdminData[] instead of any[]
      const rawData: RawAdminData[] = await response.json(); 

      // Normalize and filter data for admin display
      const adminData: Admin[] = rawData.map((item) => {
          const normalizedStatus = 
            item.status?.toLowerCase() === "active" ? "active" : "inactive";
          
          return {
            id: Number(item.id),
            username: item.username,
            fullName: item.fullName,
            email: item.email,
            phone: item.phone || "N/A", // Use "N/A" if phone is null/undefined
            status: normalizedStatus as Admin["status"],
          };
      });

      setAdmins(adminData);
    // 🏆 FIX: Use 'unknown' and check for Error instance
    } catch (err: unknown) { 
      console.error("Failed to fetch admin data:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred during fetch.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setUsername("");
    setFullName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setStatus("active"); // Reset to 'active'
    setIsEditing(false);
    setEditingAdminId(null);
    setShowForm(false);
  };

  const handleOpenAddForm = () => {
    resetForm();
    setShowForm(true);
  };

  const fillFormForEdit = (admin: Admin) => {
    setUsername(admin.username);
    setFullName(admin.fullName);
    setEmail(admin.email);
    setPhone(admin.phone);
    setPassword("");
    setConfirmPassword("");
    setStatus(admin.status);

    setEditingAdminId(admin.id);
    setIsEditing(true);
    setShowForm(true);
  };

  // --- CRUD Handlers ---

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !username ||
      !fullName ||
      !email ||
      !phone ||
      (!password && !isEditing)
    ) {
      return alert("Please fill all required fields.");
    }
    if (password !== confirmPassword) {
      return alert("Password and Confirm Password must match.");
    }

    const method: string = isEditing ? "PUT" : "POST";
    const url: string = isEditing
      ? `${API_BASE_URL}/api/admin/users/admin/${editingAdminId}`
      : `${API_BASE_URL}/api/admin/users/admin`;
      
    // Normalize status for API call, matching backend expectation (often lowercase)
    const apiStatus = status.toLowerCase();

    const body = {
      username,
      fullName,
      email,
      phone,
      status: apiStatus, 
      ...(password && { password }),
    };

    setIsSubmitting(true);
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${isEditing ? "update" : "add"} admin: ${
            response.statusText
          }`
        );
      }

      alert(`Admin ${isEditing ? "updated" : "added"} successfully!`);
      resetForm();
      fetchAdmins();
    // 🏆 FIX: Use 'unknown' and check for Error instance
    } catch (err: unknown) { 
      console.error(err);
      if (err instanceof Error) {
        alert(`Error: ${err.message}`);
      } else {
        alert("An unknown error occurred during submission.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateAdmin = (adminId: number) => {
    const adminToEdit = admins.find((a) => a.id === adminId);
    if (adminToEdit) {
      fillFormForEdit(adminToEdit);
    }
  };

  const handleDeleteAdmin = async (adminId: number) => {
    if (
      !window.confirm(
        `Are you sure you want to permanently delete Admin ID ${adminId}?`
      )
    ) {
      return;
    }
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/users/admin/${adminId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to delete admin: ${response.statusText}`);
      }
      setAdmins(admins.filter((a) => a.id !== adminId));
      alert("Admin deleted successfully!");
    // 🏆 FIX: Use 'unknown' and check for Error instance
    } catch (err: unknown) { 
      console.error(err);
      if (err instanceof Error) {
        alert(`Error: ${err.message}`);
      } else {
        alert("An unknown error occurred during deletion.");
      }
    }
  };

  useEffect(() => {
    fetchAdmins();
  
  }, []); 

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        <p className="ml-3 text-lg text-gray-600">Loading admin data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-xl">
        <p className="font-bold">Data Fetch Error</p>
        <p>
          Could not load admin: {error}. Please ensure your backend API is
          ready.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center border-b-2 pb-2">
        <h2 className="text-4xl font-extrabold text-indigo-700">
          Admin User Management
        </h2>
        <button
          onClick={handleOpenAddForm}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
          title="Add New Admin"
        >
          <FaPlus />
          <span className="hidden sm:inline">Add Admin</span>
        </button>
      </div>

      {/* Admin Add/Edit Form */}
      {showForm && (
        <div className="flex">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow-xl space-y-4 w-full max-w-2xl"
          >
            <h3 className="text-2xl font-bold text-gray-800 border-b pb-2">
              {isEditing ? `Edit Admin: ${username}` : "Add New Admin"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900 "
                />
              </div>
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900"
                />
              </div>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900"
                />
              </div>
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900"
                />
              </div>
              {/* Password (Required on Add, Optional on Edit) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password {isEditing ? "(Leave blank to keep existing)" : ""}
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required={!isEditing}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900"
                />
              </div>
              {/* Confirm Password (Only shown on Add or if Password field is active) */}
              <div className={isEditing && !password ? "hidden" : ""}>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  required={!isEditing}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900"
                />
              </div>

              {/* Status (Full Width, Only in Edit mode) */}
              {isEditing && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Admin["status"])}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900 bg-white"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              )}
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
              >
                {isSubmitting
                  ? "Saving..."
                  : isEditing
                  ? "Update Admin"
                  : "Add Admin"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 py-2 px-4 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Admin List Table */}
      {!showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-xl overflow-x-auto border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider rounded-tl-xl">
                  ID
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Email
                </th>

                <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider rounded-tr-xl">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {admins.length > 0 ? (
                admins.map((admin) => (
                  <tr
                    key={admin.id}
                    className="hover:bg-indigo-50 transition duration-150 ease-in-out"
                  >
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {admin.id}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                      {admin.username}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {admin.email}
                    </td>

                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    ${
                                      admin.status === "active"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                      >
                        <div className="flex items-center">
                          {admin.status === "active" ? (
                            <FaCheckCircle className="mr-1" />
                          ) : (
                            <FaBan className="mr-1" />
                          )}
                          {admin.status}
                        </div>
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                      <button
                        onClick={() => handleUpdateAdmin(admin.id)}
                        className="text-blue-600 hover:text-blue-900 transition"
                        title="Edit Admin"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="text-gray-400 hover:text-gray-700 transition"
                        title="Delete Admin"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No admin users found in the database.
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

export default AdminListPage;