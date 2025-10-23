"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/autoplay";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./International.module.css";

const destinations = [
  { name: "Bali", price: "44,999", img: "/images/leh.jpg" },
  { name: "Maldives", price: "74,999", img: "/images/shimla.jpg" },
  { name: "Singapore", price: "34,999", img: "/images/spain.jpg" },
  { name: "Thailand", price: "44,999", img: "/images/europe.jpg" },
  { name: "Vietnam", price: "57,999", img: "/images/leh.jpg" },
  { name: "Bali", price: "44,999", img: "/images/leh.jpg" },
  { name: "Maldives", price: "74,999", img: "/images/shimla.jpg" },
  { name: "Singapore", price: "34,999", img: "/images/spain.jpg" },
];

export default function International() {
  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.wrapper}>
        {/* HERO SECTION */}
        <div className={styles.hero}>
          <div className={styles.mediaWrapper}>
            {/* if image */}
            {/* <Image
              src="https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg"
              alt="Hero Background" width={300} height={300}
              className={styles.mediaImage}
            /> */}
            {/* if video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className={styles.mediaVideo}
            >
              <source src="https://wanderon-video.gumlet.io/header-video+(1080p).mp4" />
            </video>
          </div>

          <div className={styles.overlay}></div>
          <div className={styles.heroContent}>
            <h1>International Trips</h1>
            <p>Discover the world, one destination at a time</p>
            <button className={styles.exploreBtn}>Explore</button>
          </div>
        </div>

        {/* SLIDER SECTION (all devices) */}
        <div className={styles.sliderWrapper}>
          <Swiper
            spaceBetween={20}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Navigation, Pagination, Autoplay]}
            className={styles.mySwiper}
            breakpoints={{
              0: { slidesPerView: 1.1, spaceBetween: 12 }, // Mobile
              480: { slidesPerView: 1.3, spaceBetween: 14 },
              640: { slidesPerView: 2, spaceBetween: 16 }, // Tablet
              1024: { slidesPerView: 3, spaceBetween: 20 }, // Desktop
              1280: { slidesPerView: 5, spaceBetween: 25 },
            }}
          >
            {destinations.map((d, i) => (
              <SwiperSlide key={i}>
                <div className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={d.img}
                      alt={d.name}
                      width={300}
                      height={350}
                      className={styles.cardImg}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h3>{d.name}</h3>
                    <p>Starting Price Rs. {d.price}/-</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
