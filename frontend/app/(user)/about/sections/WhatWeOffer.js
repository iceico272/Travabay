import styles from "./WhatWeOffer.module.css";
import { FaChevronRight } from "react-icons/fa";

export default function WhatWeOffer() {
  return (
    <section className={styles.mainSection}>
      <div className={styles.container}>
        {/* === About Company (no background) === */}
        <div className={styles.aboutCompany}>
          <h2 className={styles.aboutTitle}>ABOUT OUR COMPANY</h2>
          <p className={styles.aboutDescription}>
            “Welcome to Travabay Holidays Where Every
            Journey Becomes a Story. At Travabay Holidays, we believe travel is
            more than just visiting places it’s about creating experiences that
            touch your soul, fill your heart, and stay with you forever. Whether
            it’s the royal charm of Rajasthan, the serene backwaters of Kerala,
            the vibrant nightlife of Thailand, the luxury of Dubai, or the
            breathtaking landscapes of Switzerland, we curate journeys that
            match your dreams. We specialize in personalized domestic and
            international holiday packages from family vacations, romantic
            getaways, and women-special tours to adventure trips and group
            excursions. Every itinerary is carefully designed with detailed
            day-by-day plans, handpicked accommodations, smooth transfers, and
            exclusive inclusions to ensure a hassle-free and unforgettable
            experience. With Travabay, your comfort and happiness are our
            priority. Our dedicated travel experts are with you at every step
            from planning your trip to ensuring you return home with memories
            worth a lifetime. So whether you’re chasing sunsets on foreign
            shores, exploring hidden gems in India, or simply seeking a relaxing
            break from the everyday hustle, Travabay Holidays is your trusted
            partner in making every journey magical. Travabay Holidays Explore.
            Dream. Discover.”
          </p>
        </div>

        {/* === Offer Section (with background) === */}
        <div className={styles.offerSection}>
          <h2 className={styles.title}>WHAT WE OFFER ?</h2>
          <p className={styles.subtitle}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat.
          </p>

          <div className={styles.content}>
            {/* Left list */}
            <ul className={styles.list}>
              <li>
                <FaChevronRight className={styles.icon} />
                Nam liber tempor cum soluta nobis eleifend option congue nihil
                imperdiet;
              </li>
              <li>
                <FaChevronRight className={styles.icon} />
                Option congue nihil imperdiet doming id quod mazim placerat
                facer;
              </li>
              <li>
                <FaChevronRight className={styles.icon} />
                Eodem modo typi, qui nunc nobis videntur parum clari, fiant
                sollemnes;
              </li>
              <li>
                <FaChevronRight className={styles.icon} />
                Investigationes demonstraverunt lectores
              </li>
            </ul>

            {/* Right paragraph */}
            <div className={styles.rightText}>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea commodo consequat. Eodem modo typi, qui nunc nobis
                videntur parum clari, fiant sollemnes in futurum. Ut wisi enim
                ad minim veniam, quis nostrud exerci tation ullamcorper suscipit
                lobortis nisl ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
