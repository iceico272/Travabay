import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero({ image, title, author, date, readTime, tags }) {
  return (
    <section className={styles.hero}>
      <div className={styles.imageWrapper}>
        <Image src={image} alt={title} fill className={styles.heroImage} />
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.meta}>
          By <span className={styles.author}>{author}</span> • {date} •{" "}
          {readTime}
        </p>
        <div className={styles.tags}>
          {tags.map((tag, i) => (
            <span key={i} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
