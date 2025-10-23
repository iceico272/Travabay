// sections/SectionsContainer.js (MODIFIED)

"use client";
import React from "react";
import AboutSection from "./About";
import AllPackages from "./AllPackages";

/**
 * @typedef {object} PackageData
 * @property {string} image
 * @property {string} title
 * @property {string} newPrice
 * @property {string} duration
 * @property {string} location
 * @property {string} date
 * @property {string[]} tags
 * @property {string} slug
 * @property {number | string} id
 */

/**
 * @param {object} props
 * @param {any} props.aboutData
 * @param {PackageData[]} [props.packagesData] 
 * @param {string} props.categorySlug // 🏆 RECEIVE PROP
 * @param {string} props.subCategorySlug // 🏆 RECEIVE PROP
 */
const SectionsContainer = ({ aboutData, packagesData, categorySlug, subCategorySlug }) => {
    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>

            {/* About Section */}
            {aboutData && <AboutSection data={aboutData} />}

            {/* All Packages Section */}
            {(packagesData && packagesData.length > 0) && (
                <AllPackages 
                    data={packagesData} 
                    categorySlug={categorySlug} // 🏆 PASS PROP DOWN
                    subCategorySlug={subCategorySlug} // 🏆 PASS PROP DOWN
                />
            )}

        </div>
    );
};

export default SectionsContainer;