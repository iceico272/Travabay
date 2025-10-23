"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./Hero.module.css";

const HeroCarousel = ({ slides }) => {
  return (
    <div className={styles.heroContainer}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className={styles.swiper}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className={styles.slideWrapper}>
              {/* Background Image */}
              <div className={styles.imageWrapper}>
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={idx === 0}
                  className={styles.image}
                />
              </div>

              {/* Overlay Content */}
              <div className={styles.overlay}>
                <h1 className={styles.title}>{slide.title}</h1>
                <p className={styles.subtitle}>{slide.subtitle}</p>
                <p className={styles.price}>
                  Starting Price: <span>{slide.price}Per Person</span> 
                </p>
                <Link href="/contact"><button className={styles.ctaBtn}>Request a Callback</button></Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
