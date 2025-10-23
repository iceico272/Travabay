import Image from "next/image";
import Breadcrumb from "./Breadcrumb";
import styles from "./Hero.module.css";


export default function AboutPage() {
  return (
    <div className={styles.container}>
      {/* Flags Image */}
      <div className={styles.bannerWrapper}>
        <Image
          src="/images/leh.jpg"  
          alt="About Banner"
          width={1200}
          height={100}
          className={styles.bannerImage}
          priority
        />
      </div>

      {/* Breadcrumb */}
      <Breadcrumb />
      
    </div>
  );
}
