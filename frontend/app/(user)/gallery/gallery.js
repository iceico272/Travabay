"use client";
import { useState } from "react";
import styles from "./gallery.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("tab1");

  // Dummy data for images with metadata (replace with backend data later)
  const internationalTrips = [
    { src: "/images/europe.jpg", name: "Paris Adventure", location: "France" },
    { src: "/images/europe.jpg", name: "Tokyo Getaway", location: "Japan" },
    { src: "/images/spain.jpg", name: "New York Tour", location: "USA" },
    { src: "/images/europe.jpg", name: "Rome Exploration", location: "Italy" },
    { src: "/images/spain.jpg", name: "Sydney Trip", location: "Australia" },
    { src: "/images/europe.jpg", name: "Dubai Escape", location: "UAE" },
  ];

  const indiaTrips = [
    { src: "/images/leh.jpg", name: "Rajasthan Safari", location: "India" },
    { src: "/images/shimla.jpg", name: "Kerala Backwaters", location: "India" },
    { src: "/images/leh.jpg", name: "Goa Beach Tour", location: "India" },
    { src: "/images/shimla.jpg", name: "Himachal Trek", location: "India" },
    { src: "/images/leh.jpg", name: "Varanasi Spiritual", location: "India" },
    { src: "/images/shimla.jpg", name: "Jaipur Heritage", location: "India" },
  ];

  const allTrips = [...internationalTrips, ...indiaTrips];

  const tabs = [
    { id: "tab1", label: "All Trips", images: allTrips },
    { id: "tab2", label: "International", images: internationalTrips },
    { id: "tab3", label: "India", images: indiaTrips },
  ];

  return (
    <main className={styles.mainContainer}>
      {/* Hero Section - Full Width */}
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1>Travel Gallery</h1>
          <p>Discover amazing trips around the world</p>
        </div>
      </div>

      {/* Main Content - Centered */}
      <div className={styles.contentWrapper}>
        <nav className={styles.breadcrumbs}>
          <Link href="/">Home</Link> <span>/</span> <span>Gallery</span>
        </nav>

        {/* Tabs */}
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tabButton} ${
                activeTab === tab.id ? styles.active : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${styles.tabContent} ${
              activeTab === tab.id ? styles.active : ""
            }`}
          >
            <div className={styles.imageGallery}>
              {tab.images.map((img, index) => (
                <div key={index} className={styles.imageWrapper}>
                  <Image
                    src={img.src}
                    alt={img.name}
                    width={300}
                    height={200}
                    className={styles.animatedImage}
                    style={{ "--index": index }}
                  />
                  <div className={styles.overlay}>
                    <h3>{img.name}</h3>
                    <p>{img.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}