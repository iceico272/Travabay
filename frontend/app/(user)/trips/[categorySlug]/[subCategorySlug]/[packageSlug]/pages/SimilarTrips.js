"use client";
import styles from "./SimilarTrips.module.css";
import Image from "next/image";

export default function SimilarTrips() {
 const trips = [
  {
   id: 1,
   title: "Singapore Thailand",
   reviews: 15,
   rating: 5,
   duration: 8,
   countries: "2 Countries 3 Cities",
   dates: "1 Date",
   emi: "₹5,294/mo",
   price: "₹1,57,000",
   image: "/images/europe.jpg",
  },
  {
   id: 2,
   title: "Singapore Malaysia",
   reviews: 148,
   rating: 5,
   duration: 7,
   countries: "2 Countries 3 Cities",
   dates: "14 Dates",
   emi: "₹4,889/mo",
   price: "₹1,45,000",
   image: "/images/europe.jpg",
  },
 ];

 return (
  <section className={styles.similarTrips}>
   <h2 className={styles.heading}>Similar Tours for You</h2>

   <div className={styles.grid}>
    {trips.map((trip) => (
     <div key={trip.id} className={styles.card}>
      <div className={styles.imageWrapper}>
       {/* FIX: Added the 'fill' prop to make the image size relative to the parent.
        Requires styles.imageWrapper to have position: relative/absolute/fixed and defined dimensions. */}
       <Image 
                    src={trip.image} 
                    alt={trip.title} 
                    className={styles.image} 
                    fill // <-- The fix
                />
       <span className={styles.tag}>GROUP TOUR</span>
       <span className={styles.tagSecondary}>ASSIST</span>
       <button className={styles.heart}>♡</button>
      </div>

      <div className={styles.cardBody}>
       <h3 className={styles.title}>{trip.title}</h3>
       <p className={styles.reviews}>
        {"⭐".repeat(trip.rating)} {trip.reviews} Reviews
       </p>
       <p className={styles.inclusive}>∞ All Inclusive ℹ</p>

       <div className={styles.details}>
        <div>
         <strong>{trip.duration}</strong>
         <span>Days</span>
        </div>
        <div>
         <strong>{trip.countries}</strong>
         <span>Destinations</span>
        </div>
        <div>
         <strong>{trip.dates}</strong>
         <span>Departures</span>
        </div>
       </div>

       <div className={styles.pricing}>
        <p className={styles.emi}>EMI from <span>{trip.emi}</span></p>
        <p className={styles.price}>
         Starts from <strong>{trip.price}</strong><br />
         <small>per person on twin sharing</small>
        </p>
       </div>

       <div className={styles.buttons}>
        <button className={styles.viewBtn}>View Tour Details</button>
        <button className={styles.bookBtn}>Book Online</button>
       </div>
      </div>
     </div>
    ))}
   </div>
  </section>
 );
};