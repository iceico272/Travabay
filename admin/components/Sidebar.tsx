'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';
import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaAngleDown,
  FaAngleUp,
  FaUserTie,
  FaUser,
  FaGlobe,
  FaListAlt,
  FaFlag,
} from 'react-icons/fa';

// ----------------------------------------------------------------------
// 🛠️ SIMPLIFIED TYPE DEFINITIONS
// ----------------------------------------------------------------------

// 1. Define the sub-navigation item (ONLY two levels deep now)
interface SubNavItem {
  name: string;
  href: string;
  icon?: IconType;
}

// 2. Define the main navigation item
interface NavItem {
  name: string;
  href: string;
  icon: IconType;
  isCollapsible?: boolean;
  subNav?: SubNavItem[]; // Max depth is here
}

// --- Navigation Structure ---
const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: FaTachometerAlt },
  {
    name: 'User Management',
    href: '#',
    icon: FaUsers,
    subNav: [
      { name: 'Frontend Users', href: '/admins/users/frontend', icon: FaUser },
      { name: 'Admin Users', href: '/admins/users/admin', icon: FaUserTie },
    ],
  },
  {
    name: 'Packages',
    href: '#',
    icon: FaBoxOpen,
    isCollapsible: true,
    subNav: [
      {
        name: 'Categories',
        href: '/admins/categories',
        icon: FaListAlt,
      },
      {
        name: 'Subcategories',
        href: '/admins/categories/subcategory',
        icon: FaGlobe,
      },
      {
        name: 'Country/State',
        href: '/admins/categories/subcategory/countries',
        icon: FaFlag,
      },
    ],
  },
];


// --- Sidebar Component ---
const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  // 🗑️ Removed: openNestedMenu state

  const toggleMenu = (name: string) => {
    setOpenMenu(openMenu === name ? null : name);
    // 🗑️ Removed: setOpenNestedMenu(null);
  };

  // 🗑️ Removed: toggleNestedMenu function

  // 🛠️ SIMPLIFIED ACTIVE CHECK
  const isNavItemActive = (item: NavItem) => {
    // Check if the main item link is active
    if (pathname === item.href) return true;
    
    // Check if any sub-item link is active
    if (item.subNav) {
      return item.subNav.some(
        (subItem) => pathname === subItem.href
      );
    }
    return false; // Only return false if none of the above match
  };

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col h-full sticky top-0">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Admin Hub
      </div>

      <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = isNavItemActive(item);
          const isMenuOpen = openMenu === item.name;

          return (
            <div key={item.name}>
              {/* --- Main Item Row --- */}
              <div className="flex justify-between items-center">
                {/* Navigation Link */}
                <Link
                  href={item.href}
                  className={`flex-grow flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-lg'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                </Link>

                {/* Toggle Arrow (for collapsible menus) */}
                {item.subNav && (item.isCollapsible || item.href === '#') && (
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={`p-3 ml-2 rounded-lg transition-colors focus:outline-none ${
                      isMenuOpen
                        ? 'bg-blue-700 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                    aria-label={`Toggle ${item.name} sub-menu`}
                  >
                    {isMenuOpen ? <FaAngleUp size={14} /> : <FaAngleDown size={14} />}
                  </button>
                )}
              </div>

              {/* --- Sub Navigation --- */}
              {item.subNav && isMenuOpen && (
                <div className="pl-6 pt-1 space-y-1">
                  {item.subNav.map((subItem) => {
                    const isSubActive = pathname === subItem.href;

                    // 🗑️ Removed: Nested Sub Nav IF statement

                    // --- Standard Sub Nav Items (Now only this renders) ---
                    return (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={`flex items-center space-x-3 p-2 text-sm rounded-lg transition-colors ${
                          isSubActive
                            ? 'bg-gray-700 text-blue-300 font-medium'
                            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        {/* Check if subItem.icon exists before rendering */}
                        {subItem.icon && <subItem.icon size={14} />} 
                        <span>{subItem.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 text-xs text-gray-500 border-t border-gray-700">
        &copy; 2025 Travabay Admin
      </div>
    </div>
  );
};

export default Sidebar;