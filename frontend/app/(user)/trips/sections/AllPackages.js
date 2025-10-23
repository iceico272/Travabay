
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaMoon, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa"; 
import styles from "./BestTrips.module.css"; 

/**
 * @typedef {object} TripData
 * @property {string} image
 * @property {string} title
 * @property {string} newPrice
 * @property {string} duration
 * @property {string} location
 * @property {string} date
 * @property {string[]} tags
 * @property {string} id 
 * @property {string} slug 
 */

/**
 * @param {object} props
 * @param {TripData[]} props.data
 * @param {string} props.categorySlug 
 * @param {string} props.subCategorySlug 
 */
const AllPackages = ({ data, categorySlug, subCategorySlug }) => {
    
    
    const getPackageDetailLink = (trip) => {
        const packageSlug = trip.slug || trip.id; 
        return `/trips/${categorySlug}/${subCategorySlug}/${packageSlug}`;
    }; 


return (
 <section className={styles.tripsSection}>
 <h2 className={styles.heading}>All Packages</h2>

 <div className={styles.grid}>
  {data.map((trip, idx) => (
  <Link 
        key={trip.id || idx} 
        href={getPackageDetailLink(trip)} 
        passHref
        style={{ cursor: 'pointer' }} 
      >
    <div className={styles.card}>
     {/* Background Image */}
     <Image
     src={trip.image}
     alt={trip.title}
     fill
     className={styles.image}
     />

     {/* Price Tag */}
     <div className={styles.priceTag}>
     <span className={styles.newPrice}>{trip.newPrice}</span>
     <span className={styles.onwards}> onwards</span>
     </div>

     {/* Transparent overlay body */}
     <div className={styles.cardBody}>
     {trip.tags?.map((tag, i) => (
      <span key={i} className={styles.tag}>
      {tag}
      </span>
     ))}
     <h3 className={styles.title}>{trip.title}</h3>

     <div className={styles.meta}>
      <FaMoon /> <span>{trip.duration}</span>
     </div>
     <div className={styles.meta}>
      <FaMapMarkerAlt/> <span>{trip.location}</span>
     </div>
     <div className={styles.meta}>
      <FaCalendarAlt /> <span>{trip.date}</span>
     </div>
     </div>
    </div>
      </Link>
  ))}
 </div>
 </section>
);
};

export default AllPackages;