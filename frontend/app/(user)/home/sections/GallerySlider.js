"use client";
import PropTypes from "prop-types";
import { useRef } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaMapMarkerAlt } from "react-icons/fa";
import styles from "./GallerySlider.module.css";

export default function GallerySlider({ images }) {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    const { scrollLeft } = scrollRef.current;
    const cardWidth = 280 + 16; // card width + gap
    const scrollTo =
      direction === "left" ? scrollLeft - cardWidth : scrollLeft + cardWidth;
    scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>JOURNEY IN FRAMES</h2>
      <p className={styles.subheading}>Pictures Perfect Moments</p>

      <div className={styles.sliderWrapper}>
        <button
          className={styles.arrowLeft}
          onClick={() => handleScroll("left")}
        >
          <FaChevronLeft />
        </button>

        <div className={styles.slider} ref={scrollRef}>
          {images.map((img, i) => (
            <div key={i} className={styles.card}>
              <Image
                src={img.url}
                alt={img.title}
                width={300}
                height={450}
                className={styles.image}
              />
              <div className={styles.locationTag}>
                <FaMapMarkerAlt /> {img.location}
              </div>
            </div>
          ))}
        </div>

        <button
          className={styles.arrowRight}
          onClick={() => handleScroll("right")}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

GallerySlider.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    })
  ).isRequired,
};
