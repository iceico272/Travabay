"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./BlogsGrid.module.css";

// Mock blogs data
const blogs = [
  {
    id: 1,
    image: "/images/leh.jpg",
    date: "24 Sep, 2025",
    readTime: "5 minutes read",
    title: "Lady Buddha, Da Nang – A Spiritual Icon on Son Tra Peninsula",
    description:
      "Meet Lady Buddha, Da Nang, the tallest Buddha in Vietnam! Explore her story, pagoda, and ocean views...",
    tags: ["Travel", "Places To Visit", "Adventure"],
    category: "places-to-visit",
    country: "Vietnam",
    link: "",
  },
  {
    id: 2,
    image: "/images/shimla.jpg",
    date: "23 Sep, 2025",
    readTime: "6 minutes read",
    title: "Khai Dinh Tomb: A Fusion of Cultures in Hue, Vietnam",
    description:
      "Step into the Mausoleum of Emperor Khai Dinh, a masterpiece of art and architecture in Hue...",
    tags: ["Travel", "Places To Visit"],
    category: "places-to-visit",
    country: "Vietnam",
    link: "",
  },
  {
    id: 3,
    image: "/images/spain.jpg",
    date: "22 Sep, 2025",
    readTime: "4 minutes read",
    title: "Mystical Po Nagar Cham Towers: A Timeless Nha Trang Icon",
    description:
      "Uncover the charm of Po Nagar Cham Towers in Nha Trang, a sacred place of worship with rich history...",
    tags: ["Travel", "Vietnam", "Places To Visit"],
    category: "places-to-visit",
    country: "Vietnam",
    link: "",
  },
  {
    id: 4,
    image: "/images/ladakh.jpg",
    date: "22 Aug, 2025",
    readTime: "4 minutes read",
    title: "Shopping in Hoi An, Vietnam: Unique Things to Buy in 2025",
    description:
      "Explore shopping in Hoi An with our ultimate guide. From bustling markets to hidden boutiques, discover...",
    tags: ["Shopping", "Travel", "Vietnam"],
    category: "places-to-shop",
    country: "Vietnam",
    link: "",
  },
  {
    id: 5,
    image: "/images/agra.jpg",
    date: "22 Aug, 2025",
    readTime: "5 minutes read",
    title: "Best Places to Eat in Hanoi: Foodie’s Guide 2025",
    description:
      "From street food to fine dining, Hanoi has it all. Discover the best places to eat in this buzzing city...",
    tags: ["Food", "Vietnam", "Places To Eat"],
    category: "places-to-eat",
    country: "Vietnam",
    link: "",
  },
];

// Categories
const categories = [
  { key: "all", label: "All Blogs" },
  { key: "places-to-visit", label: "Places to Visit" },
  { key: "things-to-do", label: "Things to Do" },
  { key: "places-to-eat", label: "Places to Eat" },
  { key: "places-to-shop", label: "Places to Shop" },
  { key: "travel-journal", label: "Travel Journal" },
  { key: "travel-journal", label: "News" },
];

// Destinations (inline, no API call)
const destinations = [
  { id: 1, name: "All Countries" },
  { id: 2, name: "Vietnam" },
  { id: 3, name: "India" },
  { id: 4, name: "Spain" },
  { id: 5, name: "Thailand" },
  { id: 6, name: "Japan" },
];

const BlogsGrid = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("All Countries");
  const [searchInput, setSearchInput] = useState(""); // typing
  const [searchTerm, setSearchTerm] = useState(""); // applied filter
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter blogs by search + category + destination
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      activeCategory === "all" || blog.category === activeCategory;

    const matchesDestination =
      selectedDestination === "All Countries" || blog.country === selectedDestination;

    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesCategory && matchesSearch && matchesDestination;
  });

  return (
    <div className={styles.container}>
      {/* Navigation */}
      <div className={styles.navWrapper}>
        <div className={styles.tabs}>
          {/* Destination Dropdown */}
          <div
            className={`${styles.tab} ${styles.dropdownTab}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedDestination} ▼
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                {destinations.map((dest) => (
                  <button
                    key={dest.id}
                    className={styles.dropdownItem}
                    onClick={() => {
                      setSelectedDestination(dest.name);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {dest.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Categories */}
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`${styles.tab} ${
                activeCategory === cat.key ? styles.active : ""
              }`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Bar + Button */}
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search blogs..."
            className={styles.searchInput}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setSearchTerm(searchInput)}
          />
          <button
            className={styles.searchButton}
            onClick={() => setSearchTerm(searchInput)}
          >
            Search
          </button>
        </div>
      </div>

      {/* Results */}
      <div className={styles.resultsWrapper}>
        <h2 className={styles.resultsTitle}>
          {filteredBlogs.length} Search Results
        </h2>
        <div className={styles.gridWrapper}>
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div key={blog.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className={styles.image}
                  />
                </div>
                <div className={styles.content}>
                  <p className={styles.meta}>
                    {blog.date} • {blog.readTime}
                  </p>
                  <h2 className={styles.title}>{blog.title}</h2>
                  <p className={styles.description}>{blog.description}</p>
                  <div className={styles.tags}>
                    {blog.tags.map((tag, i) => (
                      <span key={i} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href= "" className={styles.readMore}>
                    Read More →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noResults}>No blogs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogsGrid;
