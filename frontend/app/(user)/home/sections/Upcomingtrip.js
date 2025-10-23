"use client";
import React, { useState } from "react";
import styles from "./Upcomingtrip.module.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

// 3. Dynamically import the Slider component, disabling SSR
const SlickSlider = dynamic(() => 
  import('react-slick').then((mod) => mod.default), 
  {

 ssr: false, 
 loading: () => <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Trips...</div>,
});

// Dummy Data Month Wise
const tripsData = {
 "SEP '25": [
  {
   id: 1,
   title: "6-Day Dubai Group Trip with Ferrari World & City Tours",
   duration: "5N/6D",
   location: "Dubai - Dubai",
   date: "27 Sep",
   oldPrice: "₹58,999",
   newPrice: "₹54,999",
   image: '/images/leh.jpg',
  },
  {
   id: 2,
   title: "7 Days Ziro Music Festival Tour Package",
   duration: "6N/7D",
   location: "Guwahati - Guwahati",
   date: "24 Sep",
   oldPrice: "₹48,990",
   newPrice: "₹40,990",
   image: '/images/shimla.jpg',
  },
  {
   id: 3,
   title: "8 Days Backpacking Japan Tour Package - WanderOn Community Trip",
   duration: "7N/8D",
   location: "Tokyo - Osaka",
   date: "27 Sep",
   oldPrice: "₹1,64,999",
   newPrice: "₹1,39,999",
   image: '/images/spain.jpg',
  },
  {
   id: 4,
   title: "Live Europe’s Best Moments: 11-Day Oktoberfest Community Trip",
   duration: "10N/11D",
   location: "Amsterdam - Prague",
   date: "16 Sep",
   oldPrice: "₹2,29,990",
   newPrice: "₹1,89,990",
   image: '/images/europe.jpg',
  },
  {
   id: 5,
   title: "Live Europe’s Best Moments: 11-Day Oktoberfest Community Trip",
   duration: "10N/11D",
   location: "Amsterdam - Prague",
   date: "16 Sep",
   oldPrice: "₹2,29,990",
   newPrice: "₹1,89,990",
   image: '/images/himachal.jpg',
  },
  {
   id: 6,
   title: "Live Europe’s Best Moments: 11-Day Oktoberfest Community Trip",
   duration: "10N/11D",
   location: "Amsterdam - Prague",
   date: "16 Sep",
   oldPrice: "₹2,29,990",
   newPrice: "₹1,89,990",
   image: '/images/kerala.jpg',
  },
 ],
 "OCT '25": [
  {
   id: 5,
   title: "Swiss Alps Adventure 7 Days",
   duration: "6N/7D",
   location: "Zurich - Interlaken",
   date: "10 Oct",
   oldPrice: "₹1,89,999",
   newPrice: "₹1,59,999",
   image: '/images/kolkata.jpg',
  },
 ],
};

const months = [
 "SEP '25",
 "OCT '25",
 "NOV '25",
 "DEC '25",
 "JAN '26",
 "FEB '26",
 "MAR '26",
 "APR '26",
 "MAY '26",
 "JUN '26",
];

const CommunityTrips = () => {
 const [activeMonth, setActiveMonth] = useState("SEP '25");
 const router = useRouter();

 const handleCardClick = (id) => {
  router.push(`/trip/${id}`);
 };

 const handleViewAll = () => {
  router.push("/upcomingtrips");
 };

 const dataToShow = tripsData[activeMonth] || [];

 const settings = {
 dots: true,
 infinite: false,
 speed: 500,
 slidesToShow: 4,
 slidesToScroll: 1,
 responsive: [
  {
   breakpoint: 1200,
   settings: { slidesToShow: 3 }
  },
  {
   breakpoint: 900,
   settings: { slidesToShow: 2 }
  },
  {
   breakpoint: 600,
   settings: { slidesToShow: 1, arrows: false }
  }
 ]
};

 return (
  <div className={styles.outerContainer}>
   <div className={styles.innerContainer}>
    
    {/* Header */}
    <div className={styles.topSection}>
     <div className={styles.headerRow}>
      <div className={styles.headerLeft}>
       <h2>Upcoming Community Trips</h2>
      </div>
      <div className={styles.headerRight}>
       <button onClick={handleViewAll} className={styles.viewAll}>
        View All <FaChevronRight />
       </button>
      </div>
     </div>

     {/* Tabs */}
     <div className={styles.tabs}>
      {months.map((month) => (
       <button
        key={month}
        className={`${styles.tab} ${activeMonth === month ? styles.activeTab : ""}`}
        onClick={() => setActiveMonth(month)}
       >
        {month}
       </button>
      ))}
     </div>
    </div>

    {/* Slider - Now using the dynamically imported component */}
    <SlickSlider {...settings}>
     {dataToShow.map((trip) => (
      <div key={trip.id} className={styles.cardWrapper}>
       <div className={styles.card} onClick={() => handleCardClick(trip.id)}>
        <Image src={trip.image} alt={trip.title} fill className={styles.image} />
        <div className={styles.priceTag}>
         <span className={styles.oldPrice}>{trip.oldPrice}</span>
         <span className={styles.newPrice}>{trip.newPrice}/- Onwards</span>
        </div>
        <div className={styles.overlay}>
         <h3>{trip.title}</h3>
         <div className={styles.details}>
          <div className={styles.left}>
           <span><FaClock /> {trip.duration}</span>
           <span><FaCalendarAlt /> {trip.date}</span>
          </div>
          <div className={styles.right}>
           <span><FaMapMarkerAlt /> {trip.location}</span>
          </div>
         </div>
        </div>
       </div>
      </div>
     ))}
    </SlickSlider>
   </div>
  </div>
 );
};

export default CommunityTrips;