"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import styles from "./BestTrips.module.css";

const ActivitiesSection = ({ data }) => {
  return (
    <section className={styles.tripsSection}>
      <h2 className={styles.heading}>{data.heading}</h2>
      <p className={styles.subheading}>{data.subheading}</p>

      <Swiper
        modules={[Navigation]}
        navigation
        loop
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 3 },
        }}
        className={styles.slider}
      >
        {data.activities.map((activity, idx) => (
          <SwiperSlide key={idx}>
            <div className={styles.card}>
              
              <Image
                src={activity.image}
                alt={activity.title}
                fill
                className={styles.image}
               
              />

              {/* Overlay Info */}
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  width: "100%",
                  background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                  color: "#fff",
                  gap: "2px",
                  padding: "12px",
                  zIndex: 2,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    background: "#000",
                    padding: "4px 8px",
                    borderRadius: "6px",  
                    display: "inline-block",
                    marginBottom: "4px",
                    fontSize: "12px",
                  }}
                >
                  <FaMapMarkerAlt style={{ marginRight: 4 }} />
                  {activity.country}
                </div>

                <div
                  style={{
                    background: "#157dc2",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    display: "inline-block",
                    fontWeight: "bold",
                    fontSize: "13px",
                    marginBottom: "4px",
                  }}
                >
                  {activity.title}
                </div>

                <div
                  style={{
                    background: "#000",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    display: "inline-block",
                    fontSize: "12px",
                  }}
                >
                  <FaClock style={{ marginRight: 4 }} />
                  {activity.duration}
                </div>
              </div>
            </div>

            {/* Below Text */}
            <p style={{ marginTop: "10px", fontSize: "14px", color: "#333" }}>
              {activity.description}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ActivitiesSection;
