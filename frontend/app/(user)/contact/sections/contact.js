"use client";

import React, { useEffect, useRef } from "react";
import styles from "./contact.module.css";
// import Image from "next/image";
import {
  FaFacebookF,
  // FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  // FaPinterestP,
  // FaYoutube,
} from "react-icons/fa"; // Social icons

const Contact = () => {
  const contactRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const contact = contactRef.current;
      if (!contact) return;

      const sections = contact.querySelectorAll(
        `.${styles.contactInfo}, .${styles.contactForm}`
      );
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight - 100) {
          section.classList.add(styles.visible);
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.contactContainer} ref={contactRef}>
      {/* Left Section */}
      <div className={styles.contactInfo}>
        <h2>CONTACT INFO</h2>
        <p>
          “Welcome to Travabay Holidays Where Every Journey Becomes a Story. At
          Travabay Holidays, we believe travel is more than just visiting places
          it’s about creating experiences that touch your soul, fill your heart,
          and stay with you forever. Whether it’s the royal charm of Rajasthan,
          the serene backwaters of Kerala, the vibrant nightlife of Thailand,
          the luxury of Dubai, or the breathtaking landscapes of Switzerland, we
          curate journeys that match your dreams. We specialize in personalized
          domestic and international holiday packages from family vacations,
          romantic getaways, and women-special tours to adventure trips and
          group excursions. Every itinerary is carefully designed with detailed
          day-by-day plans, handpicked accommodations, smooth transfers, and
          exclusive inclusions to ensure a hassle-free and unforgettable
          experience. With Travabay, your comfort and happiness are our
          priority. Our dedicated travel experts are with you at every step from
          planning your trip to ensuring you return home with memories worth a
          lifetime. So whether you’re chasing sunsets on foreign shores,
          exploring hidden gems in India, or simply seeking a relaxing break
          from the everyday hustle, Travabay Holidays is your trusted partner in
          making every journey magical. Travabay Holidays Explore.
          Dream. Discover.”
        </p>

        <div className={styles.infoBlock}>
          <h3>ADDRESS</h3>
          <p>
            Manas chowk, Baba Farid Nagar, <br /> Sitabuldi, Nagpur,
            Maharashtra 440001
          </p>
          <a href="mailto:info@yourdomain.com">info@yourdomain.com</a>
        </div>

        <div className={styles.infoBlock}>
          <h3>PHONE</h3>
          <p>9579659074</p>
          <div className={styles.socialIcons}>
            <a
              href="https://www.facebook.com/people/Travabay-Holidays/61555526094194/"
              className={styles.facebook}
            >
              <FaFacebookF />
            </a>
            {/* <a href="#" className={styles.twitter}>
                <FaTwitter />
              </a> */}
            <a
              href="https://www.instagram.com/travabay/"
              className={styles.instagram}
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/102466205/admin/page-posts/published/"
              className={styles.linkedin}
            >
              <FaLinkedinIn />
            </a>
            {/* <a href="#" className={styles.pinterest}>
                <FaPinterestP />
              </a>
              <a href="#" className={styles.youtube}>
                <FaYoutube />
              </a> */}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className={styles.contactForm}>
        <h2>CONTACT FORM</h2>
        <form>
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="E-mail address" />
          <textarea placeholder="Message"></textarea>
          <button type="submit">SEND MESSAGE</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
