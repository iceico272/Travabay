"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaMoon, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa"; 

import "swiper/css";
import "swiper/css/navigation";
import styles from "./BestTrips.module.css";

const TripsSection = ({ data }) => {
  return (
    <section className={styles.tripsSection}>
      <h2 className={styles.heading}>{data.heading}</h2>
      <p className={styles.subheading}>{data.subheading}</p>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          enabled: true,
        }}
        autoplay={{ delay: 4000 }}
        loop={true}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className={styles.slider}
      >
        {data.trips.map((trip, idx) => (
          <SwiperSlide key={idx}>
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
                <span className={styles.oldPrice}>{trip.oldPrice}</span>{" "}
                <span className={styles.newPrice}>{trip.newPrice}</span>
                <span className={styles.onwards}> onwards</span>
              </div>

              {/* Transparent overlay body */}
              <div className={styles.cardBody}>
                {trip.tag && <span className={styles.tag}>{trip.tag}</span>}
                <h3 className={styles.title}>{trip.title}</h3>

                <div className={styles.meta}>
                  <FaMoon/> <span>{trip.duration}</span>
                </div>
                <div className={styles.meta}>
                  <FaMapMarkerAlt/> <span>{trip.location}</span>
                </div>
                <div className={styles.meta}>
                  <FaCalendarAlt/> <span>{trip.date}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TripsSection;
