"use client";
import React, { useState } from "react";
import styles from "./About.module.css";

const AboutSection = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleReadMore = () => {
    setExpanded(!expanded);
  };

  return (
    <section className={styles.aboutSection}>
      <div className={styles.header}>
        <h2>{data.heading}</h2>
        <button className={styles.readBtn} onClick={toggleReadMore}>
          {expanded ? "Read Less" : "Read More"}
        </button>
      </div>
      <p className={styles.text}>
        {expanded ? data.fullText : data.shortText}
      </p>
    </section>
  );
};

export default AboutSection;
