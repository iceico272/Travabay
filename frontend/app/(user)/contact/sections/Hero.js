"use client";
import React, { useState } from "react";
import styles from "./Hero.module.css";

const ContactBanner = () => {
  const [mapError, setMapError] = useState(false);

  return (
    <div className={styles.bannerWrapper}>
      {!mapError ? (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d7442.316147773959!2d79.07705749169727!3d21.14610663567046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sManas%20chowk%2C%20Baba%20Farid%20Nagar%2C%20Sitabuldi%2C%20Nagpur%2C%20Maharashtra%20440001!5e0!3m2!1sen!2sin!4v1756704748298!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onError={() => setMapError(true)}
        ></iframe>
      ) : (
        <div className={styles.fallback}>
          <h2>Oops! Something went wrong.</h2>
          <p>Google Maps is not available right now. Please try again later.</p>
        </div>
      )}
       
    </div>
  );
};

export default ContactBanner;
