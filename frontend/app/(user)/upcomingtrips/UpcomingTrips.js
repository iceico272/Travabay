"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaMoon,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaArrowRight,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";
import styles from "./UpcomingTrips.module.css";

const UpcomingTrips = () => {
  // ✅ Mock trips
  const mockTrips = [
    {
      id: 1,
      title: "Spiti Full Circuit Roadtrip",
      image: "/images/spiti.jpg",
      duration: "7N/8D",
      location: "Delhi - Delhi",
      dates: "Aug 9, Sep 5, Oct 10",
      price: 22999,
      currentPrice: 19999,
      destination: "India",
      subDestination: "Spiti",
    },
    {
      id: 2,
      title: "8-Day Leh Ladakh Tour Package with Turtuk",
      image: "/images/leh.jpg",
      duration: "7N/8D",
      location: "Leh - Leh",
      dates: "Aug 30, Sep 6, Oct 12",
      price: 28999,
      currentPrice: 24999,
      destination: "India",
      subDestination: "Ladakh",
    },
    {
      id: 3,
      title: "15 Days Summer Special European Grandeur",
      image: "/images/europe.jpg",
      duration: "14N/15D",
      location: "London - Rome",
      dates: "Sep 15, Oct 3",
      price: 290900,
      currentPrice: 259999,
      destination: "International",
      subDestination: "Europe",
    },
  ];

  const destinations = {
    India: ["Ladakh", "Spiti", "Meghalaya", "Kashmir", "Kerala"],
    International: ["Europe", "America", "Asia", "Australia"],
  };

  const months = [
    "Aug-25",
    "Sep-25",
    "Oct-25",
    "Nov-25",
    "Dec-25",
    "Jan-26",
    "Feb-26",
  ];

  const [filters, setFilters] = useState({
    destination: "India",
    subDestinations: [],
    duration: [2, 15],
    budget: [9000, 300000],
    month: null, // ✅ only one active month
  });

  const [trips, setTrips] = useState(mockTrips);
  const [showSubDestinations, setShowSubDestinations] = useState(false);

  // ✅ For expanded month with trip dates
  const [expandedMonth, setExpandedMonth] = useState(null);

  // ✅ Apply filters
  useEffect(() => {
    let filtered = mockTrips.filter((trip) => {
      const nights = parseInt(trip.duration.match(/(\d+)N/)?.[1] || "0");
      const price = trip.currentPrice || trip.price;

      const durationMatch =
        nights >= filters.duration[0] && nights <= filters.duration[1];
      const budgetMatch =
        price >= filters.budget[0] && price <= filters.budget[1];
      const destMatch = trip.destination === filters.destination;
      const subDestMatch =
        filters.subDestinations.length === 0 ||
        filters.subDestinations.includes(trip.subDestination);

      // ✅ only one month filter
      const monthMatch =
        !filters.month ||
        trip.dates.toLowerCase().includes(filters.month.split("-")[0].toLowerCase());

      return (
        durationMatch &&
        budgetMatch &&
        destMatch &&
        subDestMatch &&
        monthMatch
      );
    });
    // setTrips(filtered);
  }, [mockTrips]);

  const handleDestinationClick = (dest) => {
    setFilters((prev) => ({
      ...prev,
      destination: dest,
      subDestinations: [],
    }));
    setShowSubDestinations(true);
  };

  const toggleSubDestination = (sub) => {
    setFilters((prev) => ({
      ...prev,
      subDestinations: prev.subDestinations.includes(sub)
        ? prev.subDestinations.filter((d) => d !== sub)
        : [...prev.subDestinations, sub],
    }));
  };

  const toggleMonth = (month) => {
    // ✅ expand + set only one active month
    setExpandedMonth(expandedMonth === month ? null : month);
    setFilters((prev) => ({
      ...prev,
      month: prev.month === month ? null : month,
    }));
  };

  const handleRangeChange = (type, index, value) => {
    const newRange = [...filters[type]];
    newRange[index] = parseInt(value);
    setFilters((prev) => ({ ...prev, [type]: newRange }));
  };

  const clearFilters = () => {
    setFilters({
      destination: "India",
      subDestinations: [],
      duration: [2, 15],
      budget: [9000, 300000],
      month: null,
    });
    setExpandedMonth(null);
    setShowSubDestinations(false);
  };

  return (
    <div className={styles.container}>
      {/* ✅ Banner with text on image */}
      <div className={styles.banner}>
        <Image
          src="/images/banner.jpg"
          alt="Upcoming Trips"
          fill
          priority
          className={styles.bannerImage}
        />
        <div className={styles.bannerText}>
          <h1>UPCOMING COMMUNITY TRIPS</h1>
        </div>
      </div>

      <div className={styles.main}>
        {/* ✅ Left Filters */}
        <aside className={styles.sidebar}>
          <h2>Filters</h2>

          {/* Destinations */}
          <div className={styles.filterSection}>
            <label>Destinations</label>
            <div className={styles.destinations}>
              {["India", "International"].map((d) => (
                <span
                  key={d}
                  className={`${styles.destLabel} ${
                    filters.destination === d ? styles.active : ""
                  }`}
                  onClick={() => handleDestinationClick(d)}
                >
                  {d} <FaChevronRight />
                </span>
              ))}
            </div>
          </div>

          {/* Sub-destinations */}
          {showSubDestinations && (
            <div className={styles.filterSection}>
              <h4>
                {filters.destination} Destinations{" "}
                <FaTimes
                  className={styles.closeIcon}
                  onClick={() => setShowSubDestinations(false)}
                />
              </h4>
              <div className={styles.subDestinations}>
                {destinations[filters.destination].map((sub) => (
                  <label key={sub}>
                    <input
                      type="checkbox"
                      checked={filters.subDestinations.includes(sub)}
                      onChange={() => toggleSubDestination(sub)}
                    />
                    {sub}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Duration Slider */}
          <div className={styles.filterSection}>
            <label>Duration (Nights)</label>
            <div className={styles.range}>
              <input
                type="range"
                min="2"
                max="15"
                value={filters.duration[0]}
                onChange={(e) =>
                  handleRangeChange("duration", 0, e.target.value)
                }
              />
              <input
                type="range"
                min="2"
                max="15"
                value={filters.duration[1]}
                onChange={(e) =>
                  handleRangeChange("duration", 1, e.target.value)
                }
              />
              <div className={styles.rangeValues}>
                {filters.duration[0]}N - {filters.duration[1]}N
              </div>
            </div>
          </div>

          {/* Budget Slider */}
          <div className={styles.filterSection}>
            <label>Budget (₹)</label>
            <div className={styles.range}>
              <input
                type="range"
                min="9000"
                max="300000"
                step="1000"
                value={filters.budget[0]}
                onChange={(e) =>
                  handleRangeChange("budget", 0, e.target.value)
                }
              />
              <input
                type="range"
                min="9000"
                max="300000"
                step="1000"
                value={filters.budget[1]}
                onChange={(e) =>
                  handleRangeChange("budget", 1, e.target.value)
                }
              />
              <div className={styles.rangeValues}>
                ₹{filters.budget[0].toLocaleString()} - ₹
                {filters.budget[1].toLocaleString()}
              </div>
            </div>
          </div>

          {/* Month Filter (sidebar checkboxes) */}
          <div className={styles.filterSection}>
            <label>Months</label>
            <div className={styles.months}>
              {months.map((m) => (
                <label key={m}>
                  <input
                    type="radio"
                    checked={filters.month === m}
                    onChange={() => toggleMonth(m)}
                  />
                  {m.split("-")[0]}
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className={styles.buttons}>
            <button onClick={clearFilters}>Clear</button>
          </div>
        </aside>

        {/* ✅ Right Content */}
        <div className={styles.content}>
          {/* Month Bar */}
         <div className={styles.monthBar}>
  {months.map((m) => (
    <div key={m} className={styles.monthWrapper}>
      <button
        className={`${styles.monthBtn} ${
          filters.month === m ? styles.activeMonth : ""
        }`}
        onClick={() => toggleMonth(m)}
      >
        {m.split("-")[0]}
      </button>

      {/* ✅ Inline dates aligned with month */}
      {expandedMonth === m && (
        <div className={styles.monthDatesInline}>
          {mockTrips
            .flatMap((trip) =>
              trip.dates.split(",").map((d) => ({
                tripId: trip.id,
                tripTitle: trip.title,
                date: d.trim(),
              }))
            )
            .filter((d) =>
              d.date.toLowerCase().includes(m.split("-")[0].toLowerCase())
            )
            .map((d, idx) => (
              <span key={`${d.tripId}-${idx}`} className={styles.dateTag}>
                {d.date}
              </span>
            ))}
        </div>
      )}
    </div>
  ))}
</div>

          {/* Trips Grid */}
          <div className={styles.tripsGrid}>
            {trips.length === 0 && <p>No trips found 🚫</p>}
            {trips.map((trip, i) => (
              <motion.div
                key={trip.id}
                className={styles.tripCard}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Image
                  src={trip.image}
                  alt={trip.title}
                  width={400}
                  height={250}
                  className={styles.tripImage}
                />
                <div className={styles.tripInfo}>
                  <h3>{trip.title}</h3>
                  <div className={styles.details}>
                    <span>
                      <FaMoon /> {trip.duration}
                    </span>
                    <span>
                      <FaMapMarkerAlt /> {trip.location}
                    </span>
                    <span>
                      <FaCalendarAlt /> {trip.dates}
                    </span>
                  </div>
                  <div className={styles.priceBox}>
                    <span className={styles.oldPrice}>₹{trip.price}</span>
                    <span className={styles.newPrice}>
                      ₹{trip.currentPrice}
                    </span>
                  </div>
                  <Link href="" className={styles.viewBtn}>
                    View <FaArrowRight />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingTrips;
