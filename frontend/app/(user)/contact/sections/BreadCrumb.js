"use client";
import Link from "next/link";
import styles from "../../about/sections/Breadcrumb.module.css";

export default function Breadcrumb() {
  return (
    <div className={styles.breadcrumb}>
      <Link href="/" className={styles.link}>
        Home
      </Link>
      <span className={styles.separator}>/</span>
      <span>Contact</span>
    </div>
  );
}
