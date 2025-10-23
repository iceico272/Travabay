"use client";
import React, { useState } from "react";
import styles from "./FAQ.module.css";
import { FaChevronRight } from "react-icons/fa";

const FAQSection = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
 
  
  return (
    <section className="sectionContainer">
      <div className={styles.faqWrapper}>
        <h2 className={styles.heading}>Frequently Asked Questions</h2>
        <p className={styles.subheading}>Your right to Know!</p>
        <div className={styles.line}></div>

        <div className={styles.accordion}>
          {data.map((item, index) => (
            <div key={index} className={styles.accordionItem}>
              <button
                className={styles.accordionHeader}
                onClick={() => toggleFAQ(index)}
              >
                <span>Q: {item.question}</span>
                <FaChevronRight
                  className={`${styles.icon} ${
                    activeIndex === index ? styles.rotate : ""
                  }`}
                />
              </button>
              {activeIndex === index && (
                <div className={styles.accordionBody}>
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
