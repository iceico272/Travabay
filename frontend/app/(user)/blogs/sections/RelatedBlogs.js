import Image from "next/image";
import Link from "next/link";
import styles from "./RelatedBlogs.module.css";

export default function RelatedBlogs({ blogs }) {
  return (
    <section className={styles.related}>
      <h2 className={styles.heading}>Related Blogs</h2>
      <div className={styles.grid}>
        {blogs.map((blog) => (
          <Link key={blog.id} href={blog.link} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image src={blog.image} alt={blog.title} fill className={styles.image}/>
            </div>
            <h3 className={styles.title}>{blog.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
