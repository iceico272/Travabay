"use client";

import React from "react";
import styles from "./Stats.module.css";
import { FaSmile, FaTrophy, FaUserTie, FaMapMarkerAlt, FaRocket } from "react-icons/fa";
// ❌ REMOVE DIRECT IMPORT: import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic"; // ✅ NEW: Import dynamic

// ✅ NEW: Dynamically import CountUp and disable SSR
// 💡 FIX: Access the .default property of the resolved module object
const CountUpNoSSR = dynamic(() => import('react-countup').then((mod) => mod.default), {
 ssr: false,
});

const statsData = [
{
 icon: <FaSmile />,
 value: 871935,
 label: "Happy guests",
},
{
 icon: <FaTrophy />,
 value: 67657,
 label: "Tours completed",
},
{
 icon: <FaUserTie />,
 value: 325,
 label: "Tour Experts",
},
{
 icon: <FaMapMarkerAlt />,
 value: 2500,
 label: "Tour destinations",
},
{
 icon: <FaRocket />,
 value: null,
 label: "Our Lakshya: Bharat Ki Sabse Behtareen Travel Company",
},
];

const Stats = () => {
const { ref, inView } = useInView({
 triggerOnce: true,
 threshold: 0.3,
});

return (
 <div className={styles.statsContainer} ref={ref}>
 <div className={styles.content}>
  <div className={styles.headingSection}>
  <div className={styles.leftBorder}></div>
  <div>
   <p className={styles.subHeading}>We are curating experiences that</p>
   <h2 className={styles.heading}>enables everyone to travel the world</h2>
  </div>
  </div>
  <div className={styles.statsGrid}>
  {statsData.map((stat, index) => (
   <div key={index} className={styles.statItem}>
   <div className={styles.icon}>{stat.icon}</div>
   <div className={styles.value}>
    {stat.value !== null ? (
    // ✅ USE THE DYNAMICALLY IMPORTED COMPONENT
    <CountUpNoSSR
     start={0}
     end={inView ? stat.value : 0}
     duration={2.5}
     separator=","
    />
    ) : (
    stat.label
    )}
   </div>
   {stat.value !== null && <div className={styles.label}>{stat.label}</div>}
   </div>
  ))}
  </div>
 </div>
 </div>
);
};

export default Stats;