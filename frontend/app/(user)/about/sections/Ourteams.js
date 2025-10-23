"use client";
import React from "react";
import Image from "next/image";
import styles from "./Ourteams.module.css";
import Link from "next/link";
// Swiper import
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const TeamSection = () => {
  // 🔥 Dummy Data (later replace with backend data)
  const team = [
    {
      img: "/images/team02.jpg",
      name: "Govind Gaur",
      designation: "CEO, Founder",
      description:
        "Govind is a visionary travelpreneur with experience of leading 200+ community trips. He loves motorbiking and has covered 30,000 kms of extreme rides.",
    },
    {
      img: "/images/team02.jpg",
      name: "Madhusudan Jaju",
      designation: "Head of Finance",
      description:
        "Madhusudan is a passionate learner and instinctive marketer. He has led 40+ trips, covering 50,000 kms. A motivational speaker and avid trekker.",
    },
    {
      img: "/images/team02.jpg",
      name: "Chirag Jain",
      designation: "Head of Operations",
      description:
        "Chirag is a strong analyst of travel operations and runs the show. With diverse experiences, he ensures smooth execution for the community.",
    },
  ];

  return (
    <section className={styles.teamSection}>
      <h2 className={styles.title}>
        Meet Our Team. <span>The ideal set of extraordinary people</span>
      </h2>

      {/* ✅ Desktop View */}
      <div className={styles.teamGrid}>
        {team.map((member, index) => (
          <div key={index} className={styles.card}>
            <Image
              src={member.img}
              alt={member.name}
              width={180}
              height={180}
              className={styles.avatar}
            />
            <h3 className={styles.name}>{member.name}</h3>
            <p className={styles.designation}>{member.designation}</p>
            <div className={styles.socials}>
              <Link href="#">
                <FaLinkedin/>
              </Link>
              < Link href="#">
                <FaInstagram/>
              </Link>
            </div>
            <div className={styles.separator}></div>
            <p className={styles.description}>{member.description}</p>
          </div>
        ))}
      </div>

      {/* ✅ Mobile Swiper */}
      <div className={styles.teamSwiper}>
        <Swiper
          spaceBetween={20}
          slidesPerView={1.1}
          centeredSlides={true}
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          {team.map((member, index) => (
            <SwiperSlide key={index}>
              <div className={styles.card}>
                <Image
                  src={member.img}
                  alt={member.name}
                  width={180}
                  height={180}
                  className={styles.avatar}
                />
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.designation}>{member.designation}</p>
                <div className={styles.socials}>
                <Link href="#">
                <FaLinkedin/>
              </Link>
              < Link href="#">
                <FaInstagram/>
              </Link>
                </div>
                <div className={styles.separator}></div>
                <p className={styles.description}>{member.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TeamSection;
