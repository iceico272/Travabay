"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { FaPlus, FaEdit, FaTrash, FaTimesCircle } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// ----------------------------------------------------
// INTERFACES (omitted for brevity, assume they are correct)
// ----------------------------------------------------
interface ItineraryItem {
  day: string; // The heading (e.g., "Day 1 / 13 Feb, 26")
  description: string; // The main description for the day
}

interface FileMeta {
  name: string;
  type: string;
  size: string;
  dimensions?: string;
  file?: File; // Optional File object for newly selected files
  path: string; // The URL/path for existing files
}

interface Country {
  id: number;
  package_name: string;
  category_id: number;
  subcategory_id: number;
  location: string;
  price: string;
  date: string;
  duration: string;
  about: string;
  files: FileMeta[];
  itinerary: ItineraryItem[];
  inclusions: string[];
  exclusions: string[];
}

interface Category { id: number; category: string; }
interface Subcategory { id: number; subcategory: string; category_id: number; }
// ----------------------------------------------------


const CountryListPage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // EDITING STATE
  const [isEditing, setIsEditing] = useState(false);
  const [editingCountryId, setEditingCountryId] = useState<number | null>(null);

  // Form state
  const [package_name, setPackageName] = useState("");
  const [category_id, setCategoryId] = useState<number>(0);
  const [subcategory_id, setSubcategoryId] = useState<number>(0);
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [about, setAbout] = useState("");
  const [files, setFiles] = useState<FileMeta[]>([]);
  
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);
  const [inclusions, setInclusions] = useState<string[]>([]);
  const [exclusions, setExclusions] = useState<string[]>([]);

  // ----------------------------------------------------
  // Reset and Edit Logic
  // ----------------------------------------------------

  const resetForm = () => {
    setPackageName("");
    setCategoryId(0);
    setSubcategoryId(0);
    setLocation("");
    setPrice("");
    setDate("");
    setDuration("");
    setAbout("");
    setFiles([]);
    
    setItinerary([]);
    setInclusions([]);
    setExclusions([]);

    setIsEditing(false);
    setEditingCountryId(null);
    setShowForm(false);
  };

  const handleEdit = (country: Country) => {
    setPackageName(country.package_name);
    setCategoryId(country.category_id);
    setSubcategoryId(country.subcategory_id);
    setLocation(country.location);
    // Ensure price is treated as a string for the input value
    setPrice(String(country.price)); 
    setDuration(country.duration);
    // Format date string for the input type="date"
    setDate(country.date.split('T')[0]); 
    setAbout(country.about);

    // Load files
    setFiles(Array.isArray(country.files) ? country.files : []);

    // Load structured fields from the country object
    setItinerary(Array.isArray(country.itinerary) ? country.itinerary : []);
    setInclusions(Array.isArray(country.inclusions) ? country.inclusions : []);
    setExclusions(Array.isArray(country.exclusions) ? country.exclusions : []);

    setEditingCountryId(country.id);
    setIsEditing(true);
    setShowForm(true);
  };

  // ----------------------------------------------------
  // Fetching Logic (Updated for JSON Parsing & Error Handling)
  // ----------------------------------------------------

  // FIX: Corrected Logic with proper parenthesis grouping
  const safeJSONParse = (jsonString: unknown, fallback: unknown) => {
    if (
        typeof jsonString === 'string' && 
        (jsonString.trim().startsWith('{') || jsonString.trim().startsWith('['))
    ) {
        try {
            return JSON.parse(jsonString);
        } catch (e) {
            console.error("Failed to parse JSON field:", e);
            return fallback;
        }
    }
    return jsonString || fallback;
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data: Category[] = await res.json();
      setCategories(data);
    } catch (err: unknown) { 
      console.error(err);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/subcategories`);
      if (!res.ok) throw new Error("Failed to fetch subcategories");
      const data: Subcategory[] = await res.json();
      setSubcategories(data);
    } catch (err: unknown) { 
      console.error(err);
    }
  };

  // 🏆 FIX: Removed API_BASE_URL from dependency array
  const fetchCountries = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/countries`);
      if (!res.ok) throw new Error("Failed to fetch countries");

      const data: Array<unknown> = await res.json(); 

      const parsedData: Country[] = data.map((country: unknown) => { 
        const c = country as Record<string, unknown>; // Treat as generic object for safe access
        return {
          ...c,
          id: Number(c.id),
          package_name: c.package_name as string,
          location: c.location as string,
          price: c.price as string,
          date: c.date as string,
          duration: c.duration as string,
          about: c.about as string,
          category_id: Number(c.category_id),
          subcategory_id: Number(c.subcategory_id),
          // JSON fields parsing
          files: safeJSONParse(c.files, []) as FileMeta[],
          itinerary: safeJSONParse(c.itinerary, []) as ItineraryItem[],
          inclusions: safeJSONParse(c.inclusions, []) as string[],
          exclusions: safeJSONParse(c.exclusions, []) as string[],
        } as Country;
      });

      setCountries(parsedData);
    } catch (err: unknown) { 
      if (err instanceof Error) {
        console.error("Fetch Error:", err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []); // Dependency array is now empty

  // Include fetchCountries in the dependency array
  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
    fetchCountries();
  }, [fetchCountries]);

  // ----------------------------------------------------
  // Dynamic Array Handlers
  // ----------------------------------------------------

  const addItineraryItem = () => {
    setItinerary([...itinerary, { day: `Day ${itinerary.length + 1}`, description: "" }]);
  };

  const updateItineraryItem = (index: number, field: keyof ItineraryItem, value: string) => {
    const newItinerary = [...itinerary];
    newItinerary[index] = { ...newItinerary[index], [field]: value };
    setItinerary(newItinerary);
  };

  const removeItineraryItem = (index: number) => {
    setItinerary(itinerary.filter((_, i) => i !== index));
  };
  
  const addListItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, list: string[]) => {
    setter([...list, ""]); 
  };

  const updateListItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, list: string[], index: number, value: string) => {
    const newList = [...list];
    newList[index] = value;
    setter(newList);
  };

  const removeListItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, list: string[], index: number) => {
    setter(list.filter((_, i) => i !== index));
  };

  // ----------------------------------------------------
  // File Handlers
  // ----------------------------------------------------

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newFilesWithMeta: FileMeta[] = selectedFiles.map((file) => {
      const meta: FileMeta = {
        name: file.name,
        type: file.type,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        file,
        path: '',
      };

      if (file.type.startsWith("image/")) {
        if (typeof window !== 'undefined') {
            const img = new (window as typeof window & { Image: new() => HTMLImageElement }).Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
              meta.dimensions = `${img.width}x${img.height}`;
              setFiles((prev) => [...prev]); 
            };
        }
      }
      return meta;
    });

    setFiles((prevFiles) => isEditing ? [...prevFiles.filter(f => !f.file), ...newFilesWithMeta] : newFilesWithMeta);
  };

  // ----------------------------------------------------
  // Submit/CRUD Logic 
  // ----------------------------------------------------
  
  const prepareFormData = (method: 'POST' | 'PUT') => {
    const formData = new FormData();
    formData.append("package_name", package_name);
    formData.append("category_id", category_id.toString());
    formData.append("subcategory_id", subcategory_id.toString());
    formData.append("location", location);
    formData.append("price", price);
    formData.append("date", date);
    formData.append("duration", duration);
    formData.append("about", about);
    
    formData.append("itinerary", JSON.stringify(itinerary));
    formData.append("inclusions", JSON.stringify(inclusions.filter(item => item.trim() !== '')));
    formData.append("exclusions", JSON.stringify(exclusions.filter(item => item.trim() !== '')));
    
    const newFilesToUpload = files.filter(f => f.file);
    newFilesToUpload.forEach((fileMeta) => {
        if (fileMeta.file) {
            formData.append("files", fileMeta.file);
        }
    });

    if (method === 'PUT') {
        const existingFilesMetadata = files.filter(f => !f.file);
        formData.append("existing_files_data", JSON.stringify(existingFilesMetadata));
    }
    
    return formData;
  };
  
  const handleUpdateCountry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCountryId) return;

    if (!package_name || category_id === 0 || subcategory_id === 0 || !location || !price || !date || !duration) {
      return alert("All required fields must be filled!");
    }

    setIsSubmitting(true);

    try {
      const formData = prepareFormData('PUT');
      
      const res = await fetch(`${API_BASE_URL}/api/admin/countries/${editingCountryId}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update country package");

      alert("Package updated successfully!");
      resetForm();
      fetchCountries();
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

  const handleAddCountry = async (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!package_name || category_id === 0 || subcategory_id === 0 || !location || !price || !date || !duration) {
      return alert("All required fields must be filled!");
    }

    setIsSubmitting(true);

    try {
      const formData = prepareFormData('POST');

      const res = await fetch(`${API_BASE_URL}/api/admin/countries`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add country");

      alert("Package added successfully!");
      resetForm();
      fetchCountries();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      handleUpdateCountry(e);
    } else {
      handleAddCountry(e);
    }
  };
  
  const handleDeleteCountry = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this country package?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/countries/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete country package");
      
      alert("Package deleted successfully!");
      fetchCountries();
    } catch (err: unknown) {
        if (err instanceof Error) {
            alert(err.message);
        } else {
            alert("An unknown error occurred during deletion.");
        }
    }
  };


  const getCategoryName = (id: number) => categories.find((c) => c.id === id)?.category || "Unknown";
  const getSubcategoryName = (id: number) => subcategories.find((s) => s.id === id)?.subcategory || "Unknown";

  // ----------------------------------------------------
  // Utility Render Functions 
  // ----------------------------------------------------
  
  // 🏆 FIX: Use the 'placeholder' prop in the input field to remove warning
  const RenderListInputs = ({ title, list, setter, placeholder }: { 
      title: string,
      list: string[],
      setter: React.Dispatch<React.SetStateAction<string[]>>,
      placeholder: string 
  }) => (
    <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
      <h4 className="text-lg font-semibold text-gray-800 mb-3">{title}</h4>
      <div className="space-y-3">
        {list.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateListItem(setter, list, index, e.target.value)}
              // Use the placeholder prop
              placeholder={placeholder || `${title} point ${index + 1}`} 
              className="flex-grow px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
            />
            <button
              type="button"
              onClick={() => removeListItem(setter, list, index)}
              className="text-red-500 hover:text-red-700 p-1"
            >
              <FaTimesCircle />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => addListItem(setter, list)}
        className="mt-4 flex items-center space-x-1 px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        <FaPlus size={12} />
        <span>Add Point</span>
      </button>
    </div>
  );
  
  const RenderItineraryInputs = () => (
    <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
      <h4 className="text-lg font-semibold text-gray-800 mb-3">Trip Itinerary (Day by Day)</h4>
      <div className="space-y-4">
        {itinerary.map((item, index) => (
          <div key={index} className="border-l-4 border-yellow-500 pl-3 pt-2 pb-3 bg-white shadow-sm rounded-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-medium text-gray-700">Day {index + 1}</span>
              <button
                type="button"
                onClick={() => removeItineraryItem(index)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <FaTimesCircle size={14} />
              </button>
            </div>
            
            <input
              type="text"
              value={item.day}
              onChange={(e) => updateItineraryItem(index, 'day', e.target.value)}
              placeholder="e.g., Day 1: Arrival in Bangkok"
              className="mb-2 block w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-semibold"
            />
            <textarea
              value={item.description}
              onChange={(e) => updateItineraryItem(index, 'description', e.target.value)}
              placeholder="e.g., Transfer to hotel, check-in, afternoon leisure, evening dinner cruise."
              rows={3}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm"
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItineraryItem}
        className="mt-4 flex items-center space-x-1 px-3 py-1 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
      >
        <FaPlus size={12} />
        <span>Add Day</span>
      </button>
    </div>
  );

  
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen space-y-6">
      <nav className="text-gray-500 text-sm mb-4">
        <Link href="/admins/dashboard" className="hover:underline">Home</Link> /{" "}
        <span className="text-gray-700">Country Packages</span> /{" "}
        {showForm && <span className="text-gray-700">{isEditing ? "Edit Package" : "New Package"}</span>}
      </nav>

      <div className="flex justify-between items-center border-b-2 pb-2 border-gray-200 mb-6">
        <h2 className="text-4xl font-extrabold text-green-700"> Packages Management</h2>
        {!showForm && (
          <button
            onClick={() => {
              resetForm(); // Ensure clean form when switching to Add
              setShowForm(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 transform hover:scale-105"
          >
            <FaPlus size={16} />
            <span className="hidden sm:inline">Add New Package</span>
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-xl space-y-6 w-full max-w-5xl"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {isEditing ? `Edit Package: ${package_name}` : "Add New Package"}
          </h3>
          
          {/* ----- STANDARD INPUT FIELDS ----- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Package Name</label>
              <input
                value={package_name}
                onChange={(e) => setPackageName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={category_id}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900"
                required
              >
                <option value={0}>-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subcategory</label>
              <select
                value={subcategory_id}
                onChange={(e) => setSubcategoryId(Number(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900"
                required
              >
                <option value={0}>-- Select Subcategory --</option>
                {subcategories
                  .filter((s) => s.category_id === category_id)
                  .map((sub) => (
                    <option key={sub.id} value={sub.id}>{sub.subcategory}</option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900"
                required
              />
            </div>
          </div>
          
          {/* About / Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Overview/Highlights</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900"
            />
          </div> 
          
          {/* ---------------------------------------------------- */}
          {/* ITINERARY, INCLUSIONS, EXCLUSIONS */}
          {/* ---------------------------------------------------- */}
          <h3 className="text-xl font-bold text-gray-800 pt-4 border-t mt-6">Package Details</h3>
          
          {/* Itinerary */}
          <RenderItineraryInputs />

          {/* Inclusions and Exclusions side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Inclusions */}
            <RenderListInputs
              title="Inclusions"
              list={inclusions}
              setter={setInclusions}
              placeholder="e.g., Daily Breakfast and Dinner" 
            />

            {/* Exclusions */}
            <RenderListInputs
              title="Exclusions"
              list={exclusions}
              setter={setExclusions}
              placeholder="e.g., Visa Fees and Tips" 
            />
          </div>
       
          
          {/* File Upload / Preview Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">{isEditing ? "Upload NEW Images (Existing files remain unless manually deleted)" : "Images / Videos"}</label>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-gray-700"
            />
            
            {files.length > 0 && (
          <div className="mt-2 space-y-2">
          <p className="font-semibold text-sm text-gray-800">
            {isEditing ? "Current/New Files:" : "Selected Files:"}
          </p>
          <ul className="space-y-1 text-sm text-gray-600">
          {files.map((fileMeta, index) => (
            // Using a path or index for the key to avoid issues with temporary files
            <li key={fileMeta.path || index} className="border-l-4 pl-2" style={{ borderColor: fileMeta.file ? '#10B981' : '#9CA3AF' }}>
              <span className={`font-semibold ${fileMeta.file ? 'text-green-600' : 'text-gray-500'}`}>
                {fileMeta.file ? "[NEW] " : "[EXISTING] "}
              </span>
              {fileMeta.name} - {fileMeta.size} {fileMeta.dimensions && `- ${fileMeta.dimensions}px`}
            </li>
            ))}
          </ul>
          </div>
        )}
          </div>
          
          <div className="flex space-x-3 mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : isEditing ? "Update Package" : "Save Package"}
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
      )}

      {/* Countries Table */}
      {!showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-xl overflow-x-auto border border-gray-100">
       <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-green-50">
         <tr>
          <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">ID</th>
          <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">Package Name</th>
          <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">Image</th>
          <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">Category</th>
          <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">Subcategory</th>
          <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">Location</th>
          <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">Price</th>
          <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">Date</th>
          <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">Duration</th>
          <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">Actions</th>
         </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
         {countries.length > 0 ? (
          countries.map((c) => (
           <tr key={c.id} className="hover:bg-green-50 transition">
            <td className="px-6 py-4 text-sm text-gray-900">{c.id}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{c.package_name}</td>
            <td className="px-6 py-4 text-sm text-gray-700">
              {c.files.length > 0 && c.files[0].type.startsWith('image/') ? (
              <Image
                src={`${API_BASE_URL}/${c.files[0].path}`}
                alt={c.files[0].name}
                width={48} 
                height={48} 
                className="w-12 h-12 object-cover rounded shadow cursor-pointer"
                onClick={() => window.open(`${API_BASE_URL}/${c.files[0].path}`, '_blank')}
              />
              ) : (
              <span className="text-gray-400">No Image</span>
              )}
            </td>
            <td className="px-6 py-4 text-sm text-gray-700">{getCategoryName(c.category_id)}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{getSubcategoryName(c.subcategory_id)}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{c.location}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{c.price}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{c.date}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{c.duration}</td>
            <td className="px-6 py-4 text-sm space-x-3">
             <button
               onClick={() => handleEdit(c)} 
               className="text-blue-600 hover:text-blue-800"
             >
               <FaEdit size={16} />
             </button>
             <button onClick={() => handleDeleteCountry(c.id)} className="text-red-600 hover:text-red-800">
              <FaTrash size={16} />
             </button>
            </td>
           </tr>
          ))
          ) : (
          <tr>
           <td colSpan={10} className="px-6 py-8 text-center text-gray-500">
                     {loading ? "Loading packages..." : "No country packages found."}
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

export default CountryListPage;