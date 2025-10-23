"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import styles from "./Navbar.module.css";
import {
 FaPhoneAlt,
 FaFacebookF,
 FaInstagram,
 FaLinkedinIn,
 FaBars,
 FaTimes,
 FaSearch,
 FaMinus,
 FaPlus,
 FaUserCircle,
 FaShoppingCart,
} from "react-icons/fa";
import Modal from "./CorporateModal"; 
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoClose } from "react-icons/io5";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// --- DYNAMIC DATA INTERFACES ---
interface Category {
 id: number;
 category: string;
 status: 'Active' | 'Inactive'|'active'|'inactive';
 slug: string; 
}

interface Subcategory {
 id: number;
 subcategory: string;
 category_id: number;
 status: 'Active' | 'Inactive' |'active'|'inactive';
 slug: string; 
}

interface NavCategory extends Omit<Category, 'status'> {
  subcategories: NavSubcategory[];
}

type NavSubcategory = Omit<Subcategory, 'status'>; 
interface FormErrors {
 [key: string]: string; // Allows any string key (form field name) to map to a string value (error message)
}

const Navbar = () => {
 const pathname = usePathname();

 // --- DYNAMIC DATA STATES ---
 const [dynamicCategories, setDynamicCategories] = useState<NavCategory[]>([]);
 const [loadingDynamicData, setLoadingDynamicData] = useState(true);

 // --- FETCH DYNAMIC DATA (Same as before) ---
 const fetchDynamicData = async () => {
  try {
   const categoriesRes = await fetch(`${API_BASE_URL}/api/admin/categories` );
   const categoriesData: Category[] = categoriesRes.ok ? await categoriesRes.json() : [];
   const subcategoriesRes = await fetch(`${API_BASE_URL}/api/admin/subcategories`);
   const subcategoriesData: Subcategory[] = subcategoriesRes.ok ? await subcategoriesRes.json() : [];

   const mappedCategories: NavCategory[] = categoriesData
 .filter(cat => cat.status === 'Active' || cat.status === 'active')
 .map(cat => {
  const subcategories = subcategoriesData
   .filter(sub => sub.category_id === cat.id && (sub.status === 'Active' || sub.status === 'active'))
   .map(sub => ({
    id: sub.id,
    subcategory: sub.subcategory,
    category_id: sub.category_id,
    slug: sub.slug || sub.subcategory.toLowerCase().replace(/\s+/g, '-'),
   }));

  return {
   id: cat.id,
   category: cat.category,
   slug: cat.slug || cat.category.toLowerCase().replace(/\s+/g, '-'),
   subcategories,
  };
 })
 .filter(cat => cat.subcategories.length > 0);

    
   setDynamicCategories(mappedCategories);
   
  } catch (e) {
   console.error("Failed to fetch dynamic navigation data:", e);
  } finally {
   setLoadingDynamicData(false);
  }
 };

 useEffect(() => {
  fetchDynamicData();
 }, []);

 // --- DYNAMIC SEARCH DATA & LOGIC (Same as before) ---
 const staticSearchData = useMemo(() => ([
  { name: "Upcoming Trips", link: "/upcomingtrips" },
  { name: "About Us", link: "/about" },
  { name: "Gallery", link: "/gallery" },
  // { name: "Corporate Bookings", link: "/corporate" },
  { name: "Blog", link: "/blogs" },
  { name: "Contact Us", link: "/contact" },
 ]), []);

 const fullSearchData = useMemo(() => {
  const dynamicLinks = dynamicCategories.flatMap(cat => [
   ...cat.subcategories.map(sub => ({
    name: `${cat.category} - ${sub.subcategory}`,
    link: `/trips/${cat.slug}/${sub.slug}`,
   }))
  ]);
  return [...staticSearchData, ...dynamicLinks];
 }, [dynamicCategories, staticSearchData]);
 
 const [searchQuery, setSearchQuery] = useState("");
 const [showResults, setShowResults] = useState(false);

 const filteredResults = fullSearchData.filter((item) =>
  item.name.toLowerCase().includes(searchQuery.toLowerCase())
 );
 
 // --- UTILITY FUNCTIONS ---
 const getColumnClass = (subcategories: NavSubcategory[]) => {
  if (subcategories.length > 16) {
   return styles.threeColumns; 
  } else if (subcategories.length > 8) {
   return styles.twoColumns; 
  } else {
   return ""; 
  }
 };
 
 // --- STATE AND HANDLERS (Unchanged) ---
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [userName, setUserName] = useState("");
 const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
 const checkAuthStatus = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem("userToken") : null;
  const userData = typeof window !== 'undefined' ? localStorage.getItem("userData") : null;

  if (token && userData) {
   try {
    const user = JSON.parse(userData);
    setIsLoggedIn(true);
    setUserName(user.fullName || user.email); 
   } catch (e) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");
    }
    setIsLoggedIn(false);
   }
  } else {
   setIsLoggedIn(false);
  }
 };

 useEffect(() => {
   checkAuthStatus();
   const handleClickOutside = (e: React.MouseEvent<HTMLAnchorElement>) => {
    
    const target = e.target as HTMLElement | null;
    
    if (!target || (!target.closest(`.${styles.searchBar}`) && !target.closest(`.${styles.profileContainer}`))) {
    setShowResults(false);
    setIsProfileDropdownOpen(false);
    }
   };
   document.addEventListener("click", handleClickOutside);
   return () => {
    document.removeEventListener("click", handleClickOutside);
   };
  }, []);
 
 const [menuOpen, setMenuOpen] = useState(false);
 const handleNavClick = () => { setMenuOpen(false); };


 const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
 const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
 const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);


 const openLoginModal = () => setIsLoginModalOpen(true);
 const closeLoginModal = () => setIsLoginModalOpen(false);
 const openRegisterModal = () => setIsRegisterModalOpen(true);
 const closeRegisterModal = () => setIsRegisterModalOpen(false);
 const openForgotPasswordModal = () => setIsForgotPasswordModalOpen(true);
 const closeForgotPasswordModal = () => setIsForgotPasswordModalOpen(false);
 
 const [openMain, setOpenMain] = useState(false); 
 const [openCategory, setOpenCategory] = useState<string | null>(null); 
 const toggleCategory = (categoryName: string) => {
  setOpenCategory(openCategory === categoryName ? null : categoryName);
 };
 

 const [loginForm, setLoginForm] = useState({ email: "", password: "" });
 const [registerForm, setRegisterForm] = useState({ fullName: "", username: "", email: "", password: "", cpassword: "", phone: "", gender: "", address: "", });
 const [forgotPasswordForm, setForgotPasswordForm] = useState({ email: "" });
 const [errors, setErrors] = useState<FormErrors>({});
 
  const validateLogin = () => { 
   // FIX: Assert type FormErrors
   const newErrors: FormErrors = {}; 
   if (!loginForm.email || !/^\S+@\S+\.\S+$/.test(loginForm.email)) 
    newErrors.email = "Valid email is required"; 
   if (!loginForm.password || loginForm.password.length < 6) 
    newErrors.password = "Password must be at least 6 characters"; 
   return newErrors; 
  }; 
  const validateRegister = () => { 
   // FIX: Assert type FormErrors
   const newErrors: FormErrors = {}; 
   if (!registerForm.fullName) newErrors.fullName = "Full name is required"; 
   if (!registerForm.username || registerForm.username.length < 3) 
    newErrors.username = "Username must be at least 3 characters"; 
   if (!registerForm.email || !/^\S+@\S+\.\S+$/.test(registerForm.email)) 
    newErrors.email = "Valid email is required"; 
   if (!registerForm.password || registerForm.password.length < 6) 
    newErrors.password = "Password must be at least 6 characters"; 
   if (registerForm.password !== registerForm.cpassword) 
    newErrors.cpassword = "Passwords do not match"; 
   if (!registerForm.phone || !/^\+?\d{10,12}$/.test(registerForm.phone)) 
    newErrors.phone = "Valid phone number is required"; 
   if (!registerForm.gender) newErrors.gender = "Please select your gender"; 
   if (!registerForm.address) newErrors.address = "Address is required"; 
   return newErrors; 
  }; 
  const validateForgotPassword = () => { 
   // FIX: Assert type FormErrors
   const newErrors: FormErrors = {}; 
   if ( 
    !forgotPasswordForm.email || 
    !/^\S+@\S+\.\S+$/.test(forgotPasswordForm.email) 
   ) 
    newErrors.email = "Valid email is required"; 
   return newErrors; 
  }; 
 
 const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
  e.preventDefault(); 
  const newErrors = validateLogin(); 
  if (Object.keys(newErrors).length === 0) { 
   setErrors({}); 
   try { 
    const dataToSend = { 
     email: loginForm.email, 
     password: loginForm.password, 
    }; 
    const response = await fetch(`${API_BASE_URL}/api/users/auth/login`, { 
     method: "POST", 
     headers: { 
      "Content-Type": "application/json", 
     }, 
     body: JSON.stringify(dataToSend), 
    }); 
    const result = await response.json(); 
    if (response.ok) { 
     toast.success(result.message || "Logged in successfully!"); 
     localStorage.setItem("userToken", result.token); 
     localStorage.setItem("userData", JSON.stringify(result.user)); 
     checkAuthStatus(); 
     closeLoginModal(); 
    } else { 
     toast.error(result.message || "Login failed. Please try again."); 
    } 
   } catch (error) { 
    console.error("Login failed:", error); 
    toast.error("Network error. Could not connect to the server."); 
   } 
  } else { 
   toast.error("Please enter valid credentials!"); 
   setErrors(newErrors); 
  } 
 }; 
 const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
  e.preventDefault(); 
  const newErrors = validateRegister(); 
  if (registerForm.password !== registerForm.cpassword) { 
   newErrors.cpassword = "Passwords do not match"; 
  } 
  if (Object.keys(newErrors).length === 0) { 
   setErrors({}); 
   try { 
    const dataToSend = { 
     fullName: registerForm.fullName, 
     username: registerForm.username, 
     email: registerForm.email, 
     password: registerForm.password, 
     phone: registerForm.phone, 
     gender: registerForm.gender, 
     address: registerForm.address, 
    }; 
    const response = await fetch( 
     `${API_BASE_URL}/api/users/auth/register`, 
     { 
      method: "POST", 
      headers: { 
       "Content-Type": "application/json", 
      }, 
      body: JSON.stringify(dataToSend), 
     } 
    ); 
    const result = await response.json(); 
    if (response.ok) { 
     toast.success(result.message || "Registration successful!"); 
     closeRegisterModal(); 
    } else { 
     toast.error(result.message || "Registration failed on server."); 
    } 
   } catch (error) { 
    console.error("Registration failed:", error); 
    toast.error("Network error. Please try again."); 
   } 
  } else { 
   toast.error("Please fix the errors in the form!"); 
   setErrors(newErrors); 
  } 
 }; 
 const handleLogout = () => { 
  localStorage.removeItem("userToken"); 
  localStorage.removeItem("userData"); 
  setIsLoggedIn(false); 
  setUserName(""); 
  setIsProfileDropdownOpen(false); 
  toast.success("Logged out successfully!"); 
 }; 
 const handleForgotPasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
  e.preventDefault(); 
  const newErrors = validateForgotPassword(); 
  if (Object.keys(newErrors).length === 0) { 
   toast.success("Password reset link sent!"); 
   closeForgotPasswordModal(); 
  } else { 
   toast.error("Please fix the errors in the form!"); 
   setErrors(newErrors); 
  } 
 }; 
 

 return (
  <header className={styles.header}>
   <ToastContainer />
   {/* TopBar (Unchanged) */}
   <div className={styles.topBar}>
    <div className={styles.contactInfo}>
     <span className={styles.contactItem}><FaPhoneAlt /> +91 9579659074</span>
    </div>
    <div className={styles.languageSocial}>
     {/* DYNAMIC SEARCH BAR */}
     <div className={styles.searchBar}>
      <FaSearch className={styles.searchIcon} />
      <input
       type="text"
       placeholder="Search packages..."
       value={searchQuery}
       onChange={(e) => {
        setSearchQuery(e.target.value);
        setShowResults(true);
       }}
       className={styles.searchInput}
       onFocus={() => setShowResults(true)}
      />
      {showResults && searchQuery && (
       <div className={styles.searchResults}>
        {filteredResults.length > 0 ? (
         filteredResults.map((item, index) => (
          <Link
           key={index}
           href={item.link}
           className={styles.searchResultItem}
           onClick={() => setSearchQuery("")}
          >
           {item.name}
          </Link>
         ))
        ) : (
         <p className={styles.noResults}>No matching trips found</p>
        )}
       </div>
      )}
     </div>
     <div className={styles.socialIcons}>
      <Link href="https://www.facebook.com/people/Travabay-Holidays/61555526094194/" className={styles.facebook} target="_blank" rel="noopener noreferrer"><FaFacebookF /></Link>
      <Link href="https://www.instagram.com/travabay/" className={styles.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram /></Link>
      <Link href="https://www.linkedin.com/company/102466205/admin/page-posts/published/" className={styles.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></Link>
     </div>
    </div>
   </div>

   {/* MainNav (Unchanged) */}
   <div className={styles.mainNav}>
    {/* ... (Logo and Standard Nav Links) ... */}
    <div className={styles.logo}>
     <Link href="/" className={styles.logoLink}><span className={styles.logoText}><span className={styles.trav}>TRAVA</span><span className={styles.bay}>BAY</span></span></Link>
     
    </div>

    <div className={styles.hamburger} onClick={() => setMenuOpen((prev) => !prev)}>
     {menuOpen ? <FaTimes /> : <FaBars />}
    </div>

    <nav className={styles.navLinks}>
     <Link href="/upcomingtrips" className={`${styles.navLink} ${pathname === "/upcomingtrips" ? styles.activeLink : ""}`} style={{ color: "#157DC2" }}>Upcoming Trips</Link>
     <Link href="/about" className={`${styles.navLink} ${pathname === "/about" ? styles.activeLink : ""}`}>About Us</Link>
     <Link href="/gallery" className={`${styles.navLink} ${pathname === "/gallery" ? styles.activeLink : ""}`}>Gallery</Link>
     <Link href="/blogs" className={`${styles.navLink} ${pathname === "/blogs" ? styles.activeLink : ""}`}>Blog</Link>
     <Link href="/contact" className={`${styles.navLink} ${pathname === "/contact" ? styles.activeLink : ""}`}>Contact Us</Link>
     
     {/* AUTH (Unchanged) */}
     {!isLoggedIn ? (
      <>
       <Link href="/login" onClick={(e) => { e.preventDefault(); openLoginModal(); }} className={`${styles.navLink} ${ pathname === "/login" ? styles.activeLink : "" }`}> LogIn </Link>
       <Link href="/register" onClick={(e) => { e.preventDefault(); openRegisterModal(); }} className={`${(styles.navLink, styles.registerLink)} ${ pathname === "/register" ? styles.activeLink : "" }`}> Register </Link>
      </>
     ) : (
      <>
       <div className={styles.profileContainer}>
        <div className={styles.navIcon} onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>
         <FaUserCircle size={24} />
        </div>
        {isProfileDropdownOpen && (
         <div className={styles.profileDropdown}>
          <p className={styles.dropdownUsername}>Hello, {userName}</p>
          <Link href="/edit-profile" className={styles.dropdownItem} onClick={() => setIsProfileDropdownOpen(false)}> Edit Profile </Link>
          <button onClick={handleLogout} className={styles.dropdownItem} style={{ textAlign: "left" }}> Logout </button>
         </div>
        )}
       </div>
       <Link href="/cart" className={styles.navIcon}><FaShoppingCart size={24} /></Link>
      </>
     )}
    </nav>
   </div>

   {/* DYNAMIC BottomBar Categories (Desktop Only - MODIFIED) */}
   <div className={styles.bottomBar}>
    {loadingDynamicData ? (
      <div  className={styles.loadingMessage}>Loading categories...</div>
    ) : (
      <div className={styles.categoryLinks}>
        {dynamicCategories.map((cat) => (
          <div 
            key={cat.id} 
            className={styles.categoryDropdown}
            onMouseEnter={() => toggleCategory(cat.category)}
            onMouseLeave={() => toggleCategory(null)}
          >
            {/* 🏆 MODIFIED: Use a div to act only as a toggle, preventing navigation */}
            <div
              className={styles.categoryLink}
              onClick={() => toggleCategory(cat.category)}
              style={{ cursor: 'pointer' }}
            >
              {cat.category} ▾
            </div>

            {/* Dropdown Content - Links to subcategories (Subcategories remain the only navigable links) */}
            {openCategory === cat.category && cat.subcategories.length > 0 && (
              <div
                className={`${styles.categoryDropdownContent} ${getColumnClass(cat.subcategories)}`}
              >
                {cat.subcategories.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/trips/${cat.slug}/${sub.slug}`}
                    className={styles.dropdownItem}
                  >
                    {sub.subcategory}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    )}
   </div>

   {/* Mobile Combined Menu (Unchanged) */}
   {menuOpen && (
    <div className={styles.mobileMenu}>
     <span className={styles.closeIcon} onClick={() => setMenuOpen(false)}><IoClose size={30} /></span>
     <nav className={styles.mobileNavLinks}>
     <Link href="/upcomingtrips" className={`${styles.navLink} ${pathname === "/upcomingtrips" ? styles.activeLink : ""}`} style={{ color: "#157DC2" }}>Upcoming Trips</Link>
          <Link href="/about" className={`${styles.navLink} ${pathname === "/about" ? styles.activeLink : ""}`}>About Us</Link>
          <Link href="/gallery" className={`${styles.navLink} ${pathname === "/gallery" ? styles.activeLink : ""}`}>Gallery</Link>
          <Link href="/blogs" className={`${styles.navLink} ${pathname === "/blogs" ? styles.activeLink : ""}`}>Blog</Link>
          <Link href="/contact" className={`${styles.navLink} ${pathname === "/contact" ? styles.activeLink : ""}`}>Contact Us</Link>
          
          {/* AUTH (Unchanged) */}
          {!isLoggedIn ? (
            <>
              <Link href="/login" onClick={(e) => { e.preventDefault(); openLoginModal(); }} className={`${styles.navLink} ${ pathname === "/login" ? styles.activeLink : "" }`}> LogIn </Link>
              <Link href="/register" onClick={(e) => { e.preventDefault(); openRegisterModal(); }} className={`${(styles.navLink, styles.registerLink)} ${ pathname === "/register" ? styles.activeLink : "" }`}> Register </Link>
            </>
          ) : (
            <>
              <div className={styles.profileContainer}>
                <div className={styles.navIcon} onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>
                  <FaUserCircle size={24} />
                </div>
                {isProfileDropdownOpen && (
                  <div className={styles.profileDropdown}>
                    <p className={styles.dropdownUsername}>Hello, {userName}</p>
                    <Link href="/edit-profile" className={styles.dropdownItem} onClick={() => setIsProfileDropdownOpen(false)}> Edit Profile </Link>
                    <button onClick={handleLogout} className={styles.dropdownItem} style={{ textAlign: "left" }}> Logout </button>
                  </div>
                )}
              </div>
              <Link href="/cart" className={styles.navIcon}><FaShoppingCart size={24} /></Link>
            </>
          )}
     </nav>

     <div className={styles.mobileCategories}>
      {/* Main Accordion (Unchanged logic: toggles the whole block) */}
      <div className={styles.categoryHeader} onClick={() => setOpenMain(!openMain)}>
       <span>Categories</span>
       <span className={styles.toggleIcon}>{openMain ? <FaMinus /> : <FaPlus />}</span>
      </div>

      {/* Sub-Accordion for each Category (Unchanged logic: leads to subcategory links) */}
      {openMain && (
       <div className={styles.categoriesList}>
        {dynamicCategories.map((cat) => (
         <div key={cat.id} className={styles.categoryItem}>
          <div className={styles.categoryHeader} onClick={() => toggleCategory(cat.category)}>
           <span>{cat.category}</span>
           <span className={styles.toggleIcon}>{openCategory === cat.category ? <FaMinus /> : <FaPlus />}</span>
          </div>

          {openCategory === cat.category && cat.subcategories.length > 0 && (
           <div className={styles.subCategoryList}>
            {cat.subcategories.map((sub) => (
             <Link
              key={sub.id}
              href={`/trips/${cat.slug}/${sub.slug}`}
              className={styles.subCategoryItem}
              onClick={handleNavClick}
             >
              {sub.subcategory}
             </Link>
            ))}
           </div>
          )}
         </div>
        ))}
       </div>
      )}
     </div>
    </div>
   )}

   {/* Modals (Unchanged) */}
   <AnimatePresence>
   
    {/* Login Modal */}
    {isLoginModalOpen && (
     <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.3 }} className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Log In</h2> 
       <form className={styles.modalForm} onSubmit={handleLoginSubmit}> 
        <div className={styles.formGroup}> 
         <label>Email</label> 
         <input 
          type="email" 
          className={styles.formInput} 
          value={loginForm.email} 
          onChange={(e) => 
           setLoginForm({ ...loginForm, email: e.target.value }) 
          } 
          placeholder="Enter your email" 
         /> 
         {errors.email && ( 
          <span className={styles.error}>{errors.email}</span> 
         )} 
        </div> 
        <div className={styles.formGroup}> 
         <label>Password</label> 
         <input 
          type="password" 
          className={styles.formInput} 
          value={loginForm.password} 
          onChange={(e) => 
           setLoginForm({ ...loginForm, password: e.target.value }) 
          } 
          placeholder="Enter your password" 
         /> 
         {errors.password && ( 
          <span className={styles.error}>{errors.password}</span> 
         )} 
        </div> 
        <button type="submit" className={styles.submitButton}> 
         Log In 
        </button> 
        <p className={styles.forgotPassword}> 
         <Link 
          href="#" 
          onClick={(e) => { 
           e.preventDefault(); 
           openForgotPasswordModal(); 
          }} 
         > 
          Forgot Password? 
         </Link> 
        </p> 
       </form> 
      </motion.div>
     </Modal>
    )}
    {/* Register Modal */}
    {isRegisterModalOpen && (
     <Modal isOpen={isRegisterModalOpen} onClose={closeRegisterModal}>
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.3 }} className={styles.modalContent}>
      <h2 className={styles.modalTitle}>Register</h2> 
       <form 
        className={styles.modalForm} 
        onSubmit={handleRegisterSubmit} 
       > 
        <div className={styles.formGroup}> 
         <label>Full Name</label> 
         <input 
          type="text" 
          className={styles.formInput} 
          value={registerForm.fullName} 
          onChange={(e) => 
           setRegisterForm({ 
            ...registerForm, 
            fullName: e.target.value, 
           }) 
          } 
          placeholder="Enter your full name" 
         /> 
         {errors.fullName && ( 
          <span className={styles.error}>{errors.fullName}</span> 
         )} 
        </div> 
        <div className={styles.formGroup}> 
         <label>Username</label> 
         <input 
          type="text" 
          className={styles.formInput} 
          value={registerForm.username} 
          onChange={(e) => 
           setRegisterForm({ 
            ...registerForm, 
            username: e.target.value, 
           }) 
          } 
          placeholder="Enter your Username" 
         /> 
         {errors.username && ( 
          <span className={styles.error}>{errors.username}</span> 
         )} 
        </div> 
        <div className={styles.formGroup}> 
         <label>Email</label> 
         <input 
          type="email" 
          className={styles.formInput} 
          value={registerForm.email} 
          onChange={(e) => 
           setRegisterForm({ 
            ...registerForm, 
            email: e.target.value, 
           }) 
          } 
          placeholder="Enter your email" 
         /> 
         {errors.email && ( 
          <span className={styles.error}>{errors.email}</span> 
         )} 
        </div> 
        <div className={styles.formGroup}> 
         <label>Password</label> 
         <input 
          type="password" 
          className={styles.formInput} 
          value={registerForm.password} 
          onChange={(e) => 
           setRegisterForm({ 
            ...registerForm, 
            password: e.target.value, 
           }) 
          } 
          placeholder="Create a password" 
         /> 
         {errors.password && ( 
          <span className={styles.error}>{errors.password}</span> 
         )} 
        </div> 
        <div className={styles.formGroup}> 
         <label>Confirm Password</label> 
         <input 
          type="password" 
          className={styles.formInput} 
          value={registerForm.cpassword} 
          onChange={(e) => 
           setRegisterForm({ 
            ...registerForm, 
            cpassword: e.target.value, 
           }) 
          } 
          placeholder="Confirm your password" 
         /> 
         {errors.cpassword && ( 
          <span className={styles.error}>{errors.cpassword}</span> 
         )} 
        </div> 
        <div className={styles.formGroup}> 
         <label>Phone Number</label> 
         <input 
          type="tel" 
          className={styles.formInput} 
          value={registerForm.phone} 
          onChange={(e) => 
           setRegisterForm({ 
            ...registerForm, 
            phone: e.target.value, 
           }) 
          } 
          placeholder="Enter phone number" 
         /> 
         {errors.phone && ( 
          <span className={styles.error}>{errors.phone}</span> 
         )} 
        </div> 
        <div className={styles.formGroup}> 
         <label>Gender</label> 
         <select 
          className={styles.formInput} 
          value={registerForm.gender} 
          onChange={(e) => 
           setRegisterForm({ 
            ...registerForm, 
            gender: e.target.value, 
           }) 
          } 
         > 
          <option value="" disabled> 
           Select your gender 
          </option> 
          <option value="male">Male</option> 
          <option value="female">Female</option> 
          <option value="other">Other</option> 
          <option value="prefer_not_to_say">Prefer not to say</option> 
         </select> 
         {errors.gender && ( 
          <span className={styles.error}>{errors.gender}</span> 
         )} 
        </div> 
        <div className={styles.formGroup}> 
         <label>Address</label> 
         <input 
          type="text" 
          className={styles.formInput} 
          value={registerForm.address} 
          onChange={(e) => 
           setRegisterForm({ 
            ...registerForm, 
            address: e.target.value, 
           }) 
          } 
          placeholder="Enter your full street address" 
         /> 
         {errors.address && ( 
          <span className={styles.error}>{errors.address}</span> 
         )} 
        </div> 
        <button type="submit" className={styles.submitButton}> 
         Register 
        </button> 
       </form> 
      </motion.div>
     </Modal>
    )}
    {/* Forgot Password Modal */}
    {isForgotPasswordModalOpen && (
     <Modal isOpen={isForgotPasswordModalOpen} onClose={closeForgotPasswordModal}>
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.3 }} className={styles.modalContent}>
<h2 className={styles.modalTitle}>Forgot Password</h2> 
       <form 
        className={styles.modalForm} 
        onSubmit={handleForgotPasswordSubmit} 
       > 
        <div className={styles.formGroup}> 
         <label>Email</label> 
         <input 
          type="email" 
          className={styles.formInput} 
          value={forgotPasswordForm.email} 
          onChange={(e) => 
           setForgotPasswordForm({ 
            ...forgotPasswordForm, 
            email: e.target.value, 
           }) 
          } 
          placeholder="Enter your email" 
         /> 
         {errors.email && ( 
          <span className={styles.error}>{errors.email}</span> 
         )} 
        </div> 
        <button type="submit" className={styles.submitButton}> 
         Reset Password 
        </button> 
        <p className={styles.forgotPassword}> 
         <Link 
          href="#" 
          onClick={(e) => { 
           e.preventDefault(); 
           closeForgotPasswordModal(); 
           openLoginModal(); 
          }} 
         > 
          Back to Log In 
         </Link> 
        </p> 
       </form> 
      </motion.div>
     </Modal>
    )}
   </AnimatePresence>
  </header>
 );
};

export default Navbar;