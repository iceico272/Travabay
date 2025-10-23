"use client";
import styles from "./BlogSection.module.css";
import Image from "next/image";
const blogs = [
  {
    title: "15 Top-Rated Places to Visit in Rishikesh in One Day",
    date: "September 4, 2025",
    readTime: "5 Min Read",
    image: "/images/pushkar.jpg",
    link: "#",
  },
  {
    title: "Kedarkantha Temperature and Weather: Complete Guide for 2025",
    date: "August 19, 2025",
    readTime: "5 Min Read",
    image: "/images/holi.jpg",
    link: "#",
  },
  {
    title: "Explore Rishikesh: 30 Places to Visit in Rishikesh",
    date: "July 24, 2025",
    readTime: "5 Min Read",
    image: "/images/ladakh.jpg",
    link: "#",
  },
  {
    title: "15+ Things To Do In Uttarakhand For An Amazing Experience",
    date: "January 4, 2025",
    readTime: "5 Min Read",
    image: "/images/ut.jpg",
    link: "#",
    featured: true, // Big right card
  },
];

const BlogSection = () => {
  const leftBlogs = blogs.filter((b) => !b.featured);
  const featuredBlog = blogs.find((b) => b.featured);

  return (
    <section className={styles.blogSection}>
      <h2 className={styles.heading}>Our Blogs</h2>
      <p className={styles.subHeading}>
        Some good reads to help you travel better!
      </p>

      <div className={styles.blogGrid}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          {leftBlogs.map((blog, i) => (
            <div key={i} className={styles.blogCard}>
              <Image
                src={blog.image}
                alt={blog.title}
                className={styles.blogImage}
              />
              <div className={styles.blogContent}>
                <h3>{blog.title}</h3>
                <p className={styles.meta}>
                  {blog.date} | {blog.readTime}
                </p>
                <a href={blog.link} className={styles.readMore}>
                  Read Full →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Blog */}
        {featuredBlog && (
          <div className={styles.featuredCard}>
            <Image
              src={featuredBlog.image}
              alt={featuredBlog.title}
              className={styles.featuredImage}
            />
            <div className={styles.blogContent}>
              <h3>{featuredBlog.title}</h3>
              <p className={styles.meta}>
                {featuredBlog.date} | {featuredBlog.readTime}
              </p>
              <a href={featuredBlog.link} className={styles.readMore}>
                Read Full →
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
