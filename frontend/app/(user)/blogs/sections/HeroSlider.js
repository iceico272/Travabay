"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import styles from "./HeroSlider.module.css";

const HeroSlider = ({ slides }) => {
  return (
    <div className={styles.sliderWrapper}>
     <Swiper
  modules={[Autoplay, Navigation, Pagination]}
  autoplay={{ delay: 5000, disableOnInteraction: false }}
  loop={true}
  navigation
  pagination={{ clickable: true }}
  className={styles.swiper}
>
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={styles.slideContent}>
              <div className={styles.imageWrapper}>
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className={styles.image}
                />
                <div className={styles.overlay}></div>
              </div>

              <div className={styles.textWrapper}>
                <h2 className={styles.title}>{slide.title}</h2>
                <div className={styles.tags}>
                  {slide.tags.map((tag, i) => (
                    <span key={i} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <p className={styles.meta}>
                  {slide.date} • Written by <strong>{slide.author}</strong>
                </p>
                <a href={slide.link} className={styles.readMore}>
                  {slide.readTime} →
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
