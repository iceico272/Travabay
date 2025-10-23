import styles from "./Footer.module.css";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerSection}>
            <h3>Travabay</h3>
            <p>
              Travabay Holidays: Your gateway to unforgettable journeys! From breathtaking domestic escapes to mesmerizing international adventures, we craft tailor-made travel experiences designed just for you. Explore. Dream. Discover with Travabay.
            </p>
          </div>
          {/* Column 2: Travel Specialists */}
          <div className={styles.footerSection}>
            <h3>Categories</h3>
            <ul>
              <li>
                <a href="#">
                  International Trips <span>&rarr;</span>
                </a>
                <hr className={styles.ruler} />
              </li>
              <li>
                <a href="#">
                  India Trips <span>&rarr;</span>
                </a>
                <hr className={styles.ruler} />
              </li>
              <li>
                <a href="#">
                  Weekend Trips <span>&rarr;</span>
                </a>
                <hr className={styles.ruler} />
              </li>
              <li>
                <a href="#">
                  Group Tours <span>&rarr;</span>
                </a>
                <hr className={styles.ruler} />
              </li>
            </ul>
          </div>
          {/* Column 3: Social Media */}
          <div className={styles.footerSection}>
            <h3>Connect With Us</h3>
            <div className={styles.socialMedia}>
              <p className={styles.socialLabel}>Follow us on social media for the latest updates!</p>
              <div className={styles.socialIcons}>
                <a href="https://www.facebook.com/people/Travabay-Holidays/61555526094194/" className={`${styles.socialIcon} ${styles.facebook}`}>
                  <FaFacebookF />
                </a>
                <a href="https://www.instagram.com/travabay/" className={`${styles.socialIcon} ${styles.instagram}`}>
                  <FaInstagram />
                </a>
                <a href="https://www.linkedin.com/company/102466205/admin/page-posts/published/" className={`${styles.socialIcon} ${styles.linkedin}`}>
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>
          {/* Column 4: Newsletter */}
          <div className={styles.footerSection}>
            <h3>Blogs</h3>
            <p>Inspiration, ideas, news and your feedback.</p>
          </div>
        </div>
      </footer>
      <div className={styles.bottomBarWrapper}>
        <div className={styles.bottomBar}>
          <p>
            Copyright © 2025 / | <a href="#">Privacy Policy</a> |{" "}
            <a href="/about">About Us</a> | <a href="#">FAQ</a> |{" "}
            <a href="/contact">Contact Support</a>
          </p>
          <p>Designed by /</p>
        </div>
      </div>
    </>
  );
};

export default Footer;