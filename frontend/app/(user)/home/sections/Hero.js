'use client';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './Hero.module.css';

const carouselData = [
  {
    type: 'image',
    src: 'https://wanderon-images.gumlet.io/new-homepage-data/Hero%20Section/hero-thumbnail-new.jpeg',
   headline: 'Travabay',
   description: 'Your gateway to unforgettable journeys!',
   },
  {
    type: 'video',
    src: 'https://wanderon-video.gumlet.io/header-video+(1080p).mp4',
    headline: 'AMAZING CARIBBEAN',
    description: 'Your gateway to unforgettable journeys!',
  },
  {
    type: 'image',
    src: '/images/spain.jpg',
    headline: 'SPAIN ADVENTURE',
    description: 'Your gateway to unforgettable journeys!',
  },
];

const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <Carousel
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={5000}
        showStatus={false}
        showArrows={true}
        className={styles.carousel}
        swipeable={true}
        emulateTouch={true}
      >
        {carouselData.map((item, index) => (
          <div key={index} className={styles.carouselSlide}>
            {item.type === 'image' ? (
              <div
                className={styles.mediaBackground}
                style={{ backgroundImage: `url(${item.src})` }}
              />
            ) : (
              <video
                className={styles.mediaVideo}
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
              />
            )}

            <div className={styles.overlayText}>
              {item.headline && <h2>{item.headline}</h2>}
              {item.description && <p className={styles.typewriter}>{item.description}</p>}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;
