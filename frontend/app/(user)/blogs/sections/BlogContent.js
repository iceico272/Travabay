import Image from "next/image";
import styles from "./BlogContent.module.css";
import Link from "next/link";

export default function BlogContent({ content }) {
  return (
    <div className={styles.layout}>
      {/* Blog Content */}
      <article className={styles.contentWrapper}>
        {content.map((block, index) => {
          switch (block.type) {
            case "heading":
              return <h2 key={index} className={styles.heading}>{block.text}</h2>;
            case "subheading":
              return <h3 key={index} className={styles.subheading}>{block.text}</h3>;
            case "paragraph":
              return <p key={index} className={styles.paragraph}>{block.text}</p>;
            case "image":
              return (
                <div key={index} className={styles.imageWrapper}>
                  <Image
                    src={block.src}
                    alt={block.caption || "Blog image"}
                    width={800}
                    height={450}
                    className={styles.image}
                  />
                  {block.caption && <p className={styles.caption}>{block.caption}</p>}
                </div>
              );
            case "blockquote":
              return <blockquote key={index} className={styles.blockquote}>{block.text}</blockquote>;
            case "list":
              return (
                <ul key={index} className={styles.list}>
                  {block.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              );
            default:
              return null;
          }
        })}
      </article>

      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarCard}>
          <h3>Author</h3>
          <Image src="/images/team02.jpg" alt="Author" width={60} height={60} className={styles.authorImg}/>
          <p>By <strong>John Doe</strong></p>
          <p className={styles.authorBio}>Travel blogger sharing hidden gems and cultural stories from around the world.</p>
        </div>

        <div className={styles.sidebarCard}>
          <h3>Tags</h3>
          <div className={styles.tags}>
            <span>Travel</span>
            <span>Vietnam</span>
            <span>Culture</span>
          </div>
        </div>

        <div className={styles.sidebarCard}>
          <h3>Related Posts</h3>
          <ul className={styles.relatedList}>
            <li><Link href="/blogs/khai-dinh-tomb">Khai Dinh Tomb</Link></li>
            <li><Link href="/blogs/po-nagar-cham-towers">Po Nagar Cham Towers</Link></li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
