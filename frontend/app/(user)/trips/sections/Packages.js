import styles from "./Packages.module.css";

export default async function TripsPage() {
  // ✅ Dummy data (baad me API call laga dena)
  const guidelines = await Promise.resolve([
    "While applying for a Schengen Visa, your passport should be valid 6 months post the date of travel.",
    "Your passport should have at least 2 blank pages with all the previous Visa applications through the same passport.",
    "It is advised to activate an International roaming plan as per the countries you are visiting, before departing from India.",
    "Currency exchange rates at airports are comparatively higher. Rather exchange your currency from your city in India for better deals. You can also use an International travel card which is widely accepted in Europe.",
    "Purchase tickets for major monuments in advance to save time.",
  ]);

  const packages = await Promise.resolve([
    "Europe Tour Packages from Chennai",
    "Europe Tour Packages from Ahmedabad",
    "Europe Tour Packages from Bangalore",
    "Europe Tour Packages from Mumbai",
    "Europe Honeymoon Packages",
    "Europe Tour Packages From Delhi",
    "Europe tour Packages From Hyderabad",
    "Europe tour packages from Kolkata",
    "Europe tour Packages From Lucknow",
    "Europe tour packages from Pune",
    "Europe tour packages from Jaipur",
  ]);

  return (
    <div className={styles.europeSection}>
      {/* Guidelines */}
      <div className={styles.guidelinesCard}>
        <h2 className={styles.heading}>Europe Travel Guidelines</h2>
        <ol>
          {guidelines.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ol>
      </div>

      {/* Packages */}
      <div className={styles.packagesCard}>
        <h3 className={styles.subHeading}>Europe Tour Packages</h3>
        <div className={styles.packagesList}>
          {packages.map((pkg, index) => (
            <button key={index} className={styles.packageBtn}>
              {pkg}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
