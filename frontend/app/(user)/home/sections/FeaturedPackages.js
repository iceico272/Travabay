'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './FeaturedPackages.module.css';

const FeaturedPackages = () => {
  const packages = [
    {
      id: 1,
      image: '/images/leh.jpg',
      name: 'Canada Adventure',
      description: 'Explore the stunning landscapes of Canada with breathtaking mountains and lakes.',
    },
    {
      id: 2,
      image: '/images/shimla.jpg',
      name: 'Tropical Sunset Getaway',
      description: 'Relax on pristine beaches with stunning sunset views and luxurious resorts.',
    },
    {
      id: 3,
      image: '/images/spain.jpg',
      name: 'European Architecture Tour',
      description: 'Discover historic architecture and cultural landmarks across Europe.',
    },
    {
      id: 4,
      image: '/images/europe.jpg',
      name: 'London City Escape',
      description: 'Experience the iconic landmarks and vibrant culture of London.',
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Featured Packages</h2>
      <p className={styles.subtitle}>Discover our top travel packages</p>
      <div className={styles.grid}>
        {packages.map((pkg) => (
          <div key={pkg.id} className={styles.card}>
            <Image src={pkg.image} alt={pkg.name} className={styles.image} width={200} height={300} />
            <div className={styles.overlay}>
              <h3 className={styles.overlayTitle}>{pkg.name}</h3>
              <p className={styles.overlayDescription}>{pkg.description}</p>
              <Link href={`/packages/${pkg.id}`} className={styles.viewLink}>View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPackages;