"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { Autoplay, FreeMode } from "swiper/modules";
import Image from "next/image";
import styles from "./SpecialBanner.module.css";

const SpecialBanner = ({ data }) => {
  return (
    <section className={styles.banner}>
      {/* Heading */}
      <div className={styles.headingWrapper}>
        <h2 className={styles.heading}>
          <span className={styles.white}>{data.titleWhite}</span>{" "}
          <span className={styles.yellow}>{data.titleHighlight}</span>{" "}
          <span className={styles.script}>{data.titleScript}</span>
        </h2>
      </div>

      {/* Image Slider */}
      <div className={styles.sliderWrapper}>
      <Swiper
  modules={[Autoplay, FreeMode]}
  loop={true}
  freeMode={true}
  autoplay={{
    delay: 0,
    disableOnInteraction: false,
  }}
  speed={4000}
  breakpoints={{
    320: { slidesPerView: 2.5, spaceBetween: 12 }, 
    480: { slidesPerView: 3, spaceBetween: 14 },   
    640: { slidesPerView: 4, spaceBetween: 16 },  
    1024: { slidesPerView: 6, spaceBetween: 18 },  
    1280: { slidesPerView: 8, spaceBetween: 20 },  
  }}
>

          {data.destinations.map((item, idx) => (
            <SwiperSlide key={idx} className={styles.slide}>
              <div className={styles.imageWrapper}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className={styles.image}
                />
                <p className={styles.name}>{item.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CTA */}
      <div className={styles.cta}>
        <span>{data.ctaText}</span>
      </div>
    </section>
  );
};

export default SpecialBanner;
