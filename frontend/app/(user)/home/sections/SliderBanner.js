// components/pages/Home/SliderBanner.js
"use client";
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import styles from './SliderBanner.module.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const slides = [
  {
    title: "Best Of Vietnam",
    subtitle: "South East Asia",
    description: "8 Days | 02 Oct | from ₹1,38,000",
    buttonText: "Book now",
    imageUrl: "/images/leh.jpg"
  },
  {
    title: "Explore Thailand",
    subtitle: "South East Asia",
    description: "7 Days | 15 Nov | from ₹99,000",
    buttonText: "Book now",
    imageUrl: "/images/spain.jpg"
  },
  {
    title: "Discover Japan",
    subtitle: "East Asia",
    description: "10 Days | 05 Dec | from ₹2,20,000",
    buttonText: "Book now",
    imageUrl: "/images/europe.jpg"
  },
];

const SliderBanner = () => {
  return (
    <div className={styles.sliderContainer}>
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={5000}
        showStatus={false}
        emulateTouch
        swipeable
      >
        {slides.map((slide, index) => (
          <div key={index} className={styles.slide}>
            <div className={styles.imageWrapper}>
              <Image
                src={slide.imageUrl}
                alt={slide.title}
                fill
                className={styles.image}
                priority
              />
              <div className={styles.overlay}></div>
              <div className={styles.contentContainer}>
                <div className={styles.borderLine}></div>
                <div className={styles.content}>
                  <h3 className={styles.subtitle}>{slide.subtitle}</h3>
                  <h2 className={styles.title}>{slide.title}</h2>
                  <p className={styles.description}>{slide.description}</p>
                  <button className={styles.button}>{slide.buttonText}</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SliderBanner;
