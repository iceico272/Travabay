"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import HeroCarousel from "../../sections/Hero";
// Assuming this is the path to the component's type definition:
import SectionsContainer from "../../sections/SectionsContainer"; 

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ====================================================
// 🎯 INTERFACES (Ensure consistency with SectionsContainer)
// ====================================================

// FIX: Reverting slug back to 'string' to satisfy SectionsContainer
interface PackageData {
 image: string;
 title: string;
 newPrice: string;
 duration: string;
 location: string;
 date: string;
 tags: string[];
 id: number | string;
 slug: string; // MUST BE STRING to match SectionsContainer
}

// Interface for the raw package data received directly from the API (used on map)
interface RawPackageApiData {
  id: number;
  package_slug: string;
  package_name: string;
// ... (rest of RawPackageApiData is unchanged)
  country_name: string;
  price: number;
  duration: number;
  location: string;
  date: string;
  tags: string[];
  files: { path: string }[];
}

// ... (HeroSlide and AboutData remain the same)
interface HeroSlide {
  slider_files: string[];
  heading: string;
  subheading: string;
  price: string;
}

interface AboutData {
  id: number;
  title: string;
  description: string;
}

// ====================================================
// 🏆 COMPONENT LOGIC
// ====================================================

// Helper function to safely get a single slug string
const getSlug = (param: string | string[] | undefined): string => {
if (Array.isArray(param)) {
 return param[0] || '';
}
return param || '';
};

export default function DynamicTripPage() {
const params = useParams();
const { categorySlug: rawCategorySlug, subCategorySlug: rawSubCategorySlug } = params;

const categorySlug = getSlug(rawCategorySlug);
const subCategorySlug = getSlug(rawSubCategorySlug);

const [heroData, setHeroData] = useState<HeroSlide[]>([]); 
const [aboutData, setAboutData] = useState<AboutData | null>(null);
const [packagesData, setPackagesData] = useState<PackageData[]>([]);

useEffect(() => {
 const slug = subCategorySlug; 
  
  if (!slug) return; 
  
  console.log(`[FRONTEND] Attempting to fetch packages for slug: ${slug}`);

// ---------------- Hero Data ----------------
fetch(`${API_URL}/api/admin/subcategories?type=hero&slug=${slug}`)
 .then(res => {
 if (!res.ok) throw new Error(`Failed to fetch hero data: ${res.status}`);
 return res.json();
 })
 .then((data: HeroSlide[]) => { 
 console.log(" Hero data:", data);
 setHeroData(Array.isArray(data) ? data : []);
 })
 .catch(err => console.error(" Fetch hero data error:", err));

// ---------------- About Data ----------------
fetch(`${API_URL}/api/admin/subcategories/about/${slug}`)
 .then(res => {
 if (!res.ok) throw new Error(`Failed to fetch about data: ${res.status}`);
 return res.json();
 })
 .then((data: AboutData) => setAboutData(data)) 
 .catch(error => console.error(" Fetch about data error:", error));

 // ---------------- Packages Data ----------------
 fetch(`${API_URL}/api/packages/all?subCategorySlug=${slug}`) 
 .then(async res => {
   if (!res.ok) {
    const errorBody = await res.text();
    console.error(` [API ERROR] Status: ${res.status}, Body: ${errorBody}`);
    throw new Error(`Failed to fetch packages data: ${res.status}`);
   }
 return res.json();
 })
 .then(data => {
   console.log(" [API SUCCESS] Raw Packages Data Received:", data);
   
   if (!Array.isArray(data)) {
    console.error(" [DATA ERROR] API response is not an array:", data);
    setPackagesData([]);
    return;
   }

 const mappedData = data.map((pkg: RawPackageApiData) => { 
  const firstFilePath = pkg.files && pkg.files.length > 0 ? pkg.files[0].path : null;

  return {
  id: pkg.id,
     // FIX FOR ERROR: Ensure the slug is ALWAYS a string by using String()
  slug: (pkg.package_slug || String(pkg.id)) as string, 
  image: firstFilePath ? `${API_URL}/${firstFilePath}` : '/path/to/placeholder.jpg',
  title: pkg.package_name || pkg.country_name,
  newPrice: `₹${pkg.price?.toLocaleString() || 'N/A'}`,
  duration: `${pkg.duration} Days`,
  location: pkg.location,
  date: pkg.date || 'Available Now',
  tags: pkg.tags || ['Popular'],
  };
 });
   console.log(` [DATA MAPPED] Packages found: ${mappedData.length}`);
 setPackagesData(mappedData);
 })
 .catch(error => console.error(" Fetch packages data error:", error));

}, [subCategorySlug]); 

if (!subCategorySlug) return null; 
return (
<>
 <HeroCarousel
 slides={(heroData || []).map((item) => ({
  image: item.slider_files?.[0]
  ? `${API_URL}/uploads/slider_files/${item.slider_files[0]}`
  : "/path/to/placeholder-image.jpg",
  title: item.heading || "",
  subtitle: item.subheading || "",
  price: item.price || "",
 }))}
 />

 {(aboutData || packagesData.length > 0) && (
 <SectionsContainer
   aboutData={aboutData}
   packagesData={packagesData} // This line should now pass the type check
   categorySlug={categorySlug} 
   subCategorySlug={subCategorySlug} 
  />
 )}
</>
);
}