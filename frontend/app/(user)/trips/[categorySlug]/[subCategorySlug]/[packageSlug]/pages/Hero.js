
"use client";
import React from "react";
import styles from "./Hero.module.css";

export default function HeroSection({ trip }) {
  
 const localTrip = trip || {
  title: "Best of Singapore",
  reviews: 78,
  rating: 4.9,
  duration: "4 Days",
  country: "1 Country",
  city: "1 City",
  location: "Singapore (3N)",
  priceMumbai: "₹1,15,000",
  priceJoining: "₹92,000",
  emi: "₹3,878/month",
  banner: "/images/shimla.jpg", 
  highlights: [
   "Marina Bay Sands",
   "Sentosa Island",
   "Universal Studios",
   "Gardens by the Bay",
  ],
 };
  
 return (
  <section className={styles.hero} aria-label={`Trip hero - ${localTrip.title}`}>
   <div
    className={styles.banner}
    style={{ backgroundImage: `url('${localTrip.banner}')` }} 
    role="img"
    aria-hidden="true"
   />
   <div className={styles.gradient}></div>

   <div className={styles.container}>
    <div className={styles.contentWrapper}>
     {/* LEFT */}
     <div className={styles.left}>
      <h1 className={styles.title}>{localTrip.title}</h1>

      <div className={styles.topRow}>
       <div className={styles.rating}>
        <svg
         width="16"
         height="16"
         viewBox="0 0 24 24"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         aria-hidden="true"
        >
         <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          fill="#FFD166"
         />
        </svg>
        <strong className={styles.ratingNum}>{localTrip.rating}</strong>
        <span className={styles.reviews}>
         ({localTrip.reviews} Reviews)
        </span>
       </div>

       <div className={styles.infoBadges}>
        <span className={styles.badge}>{localTrip.duration}</span>
        <span className={styles.badge}>{localTrip.country}</span>
        <span className={styles.badge}>{localTrip.city}</span>
       </div>
      </div>

      <p className={styles.location}>{localTrip.location}</p>

      <div className={styles.highlights}>
       <h4>Tour Highlights</h4>
       <ul>
        {localTrip.highlights.map((h, idx) => (
         <li key={idx} className={styles.highlightItem}>
          <svg
           width="14"
           height="14"
           viewBox="0 0 24 24"
           fill="none"
           xmlns="http://www.w3.org/2000/svg"
           aria-hidden="true"
          >
           <circle cx="12" cy="12" r="12" fill="#FFD166" />
          </svg>
          <span>{h}</span>
         </li>
        ))}
       </ul>
      </div>

      <div className={styles.actions}>
       <button className={styles.itineraryBtn} type="button">
        View Daywise Itinerary
       </button>
      </div>
     </div>

     {/* RIGHT */}
     <aside className={styles.right}>
      <div className={styles.priceCard}>
       <div className={styles.priceRow}>
        <p className={styles.priceTitle}>Mumbai to Mumbai</p>
        <p className={styles.price}>{localTrip.priceMumbai}</p>
       </div>

       <div className={styles.priceRow}>
        <p className={styles.priceTitle}>Joining / Leaving</p>
        <p className={styles.price}>{localTrip.priceJoining}</p>
       </div>

       <button className={styles.ctaBtn} type="button">
        Dates & Prices
       </button>

       <p className={styles.emi}>EMI starts at {localTrip.emi}</p>
      </div>

      <form className={styles.formCard} onSubmit={(e) => e.preventDefault()}>
       <h4>Want us to call you?</h4>

       <label className={styles.hiddenLabel} htmlFor="fullname">
        Full name
       </label>
       <input id="fullname" name="fullname" type="text" placeholder="Full Name *" required />

       <label className={styles.hiddenLabel} htmlFor="phone">
        Phone number
       </label>
       <div className={styles.inputGroup}>
        <span className={styles.countryCode}>+91</span>
        <input id="phone" name="phone" type="tel" placeholder="Phone No. *" required />
       </div>

       <button className={styles.callBtn} type="submit">Request Call Back</button>
      </form>
     </aside>
    </div>
   </div>
  </section>
 );
}