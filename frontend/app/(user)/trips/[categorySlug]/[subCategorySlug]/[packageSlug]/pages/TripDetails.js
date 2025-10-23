
import { useState, useRef, useEffect } from "react";
import styles from "./TripDetails.module.css";

// --- ICON SUBSTITUTES (Inline SVGs) ---
const EnvelopeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7.01 4.706L15 4.217V4a1 1 0 0 0-1-1H2zm0 2.217V12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5.217l-7 4.697L1 5.217z"/>
  </svg>
);
const PrintIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M2.5 5.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-7zM2 5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-1v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V5H2z"/>
    <path d="M12 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-1 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
    <path fillRule="evenodd" d="M13 14H3V6h10v8z"/>
  </svg>
);
const ShareIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M13.854 3.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708-.708l1.5-1.5a.5.5 0 0 1 .708 0zM8.5 7.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V7.5z"/>
    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6.5zm-6 3a.5.5 0 0 0-.5.5v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3a.5.5 0 0 0-.5-.5z"/>
  </svg>
);
const ExchangeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M1.777 5.75c.42.42 1.08.75 1.777.75h9.492a.5.5 0 0 0 .354-.854l-1.5-1.5a.5.5 0 0 0-.708.708l.586.586H3.554c-.21 0-.41-.084-.566-.239l-1.5-1.5a.5.5 0 0 0-.708.708l1.5 1.5zM14.223 10.25a.5.5 0 0 0-.354.146l-1.5 1.5a.5.5 0 0 0 .708.708l.586-.586h9.492c.697 0 1.357-.33 1.777-.75a.5.5 0 0 0-.354-.854z"/>
  </svg>
);
const PlusIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
  </svg>
);
const MinusIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
  </svg>
);
const MapMarkerIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
  </svg>
);
const ChevronRightIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
  </svg>
);
const PhoneIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.292 2.89a.5.5 0 0 1 .098.384l-1.397 4.098a.5.5 0 0 0 .193.535l2.793 2.793a.5.5 0 0 0 .535.193l4.098-1.397a.5.5 0 0 1 .384.098l2.216 1.797a1.745 1.745 0 0 1 .163 2.611l-1.079 1.08a.5.5 0 0 1-.708 0L9.435 9.435a.5.5 0 0 1-.146-.353V6.5a.5.5 0 0 0-.5-.5H6.5a.5.5 0 0 0-.5.5v2.583a.5.5 0 0 1-.353.146L3.435 14.791a.5.5 0 0 1 0 .708l-1.08 1.079a1.745 1.745 0 0 1-.611-.741z"/>
  </svg>
);

// --- DATA DEFINITIONS ---
const sections = [
  { id: "itinerary", name: "Itinerary" },
  { id: "tour-details", name: "Tour Details" },
  { id: "tour-information", name: "Tour Information" },
  { id: "need-to-know", name: "Need to Know" },
  { id: "policy-terms", name: "Policy & Terms" },
  { id: "upgrades", name: "Upgrades" },
];

const upgrades = [
  {
    id: "flight",
    title: "Flight Upgrade",
    content:
      "Upgrade your flight to Premium Economy or Business Class for extra comfort. Baggage allowance and meals will be upgraded accordingly.",
  },
  {
    id: "primeSeats",
    title: "Prime Seats",
    content:
      "Reserve prime seats on the bus or flight for extra legroom and better views. Available at a minimal additional cost.",
  },
];

const tourInfo = [
  {
    id: "inclusion",
    title: "Tour Inclusion",
    content: [
      "To and fro economy class air travel for 'Mumbai to Mumbai Tour' guests as mentioned in the itinerary.",
      "Airfare, Airport taxes and Visa Fees.",
      "Baggage Allowance as per the airline policy.",
      "Tour Manager Services throughout the tour.",
      "Entrance fees of all sightseeing places to be visited from inside.",
      "Accommodation in comfortable and convenient hotels on twin sharing basis.",
      "All Meals - Breakfast, Lunch, Dinner (set menu) as mentioned in the itinerary.",
      "All Tips - Guide, Driver & Restaurants.",
      "Cost of internal airfare as mentioned in the itinerary.",
      "Complimentary insurance up to 59 years of age.",
    ],
  },
  {
    id: "exclusion",
    title: "Tour Exclusion",
    content: [
      "Travel insurance (if age is over 59).",
      "Personal expenses and optional activities.",
      "Porterage and local conveyance charges.",
      "Excess baggage fees.",
    ],
  },
  {
    id: "preparation",
    title: "Advance Preparation",
    content: [
      "Carry a valid passport with at least 6 months validity.",
      "Ensure you have the necessary visas and travel documents.",
      "Pack comfortable clothing and footwear suitable for walking.",
      "Carry local currency and international cards for expenses.",
      "Check airline baggage policies before packing.",
    ],
  },
];

const travelDetails = [
  {
    id: "flight",
    title: "Flight Details",
    content: [
      "Your flight will be with Singapore Airlines or similar.",
      "Departure from selected city, economy class.",
      "Baggage allowance: 20kg per person.",
      "Flight schedule may vary depending on airline availability.",
    ],
  },
  {
    id: "accommodation",
    title: "Accommodation Details",
    content: [
      "City / Country: Singapore - Singapore",
      "Hotel: M Hotel Singapore / or similar",
      "Check In - Check Out: 13 Feb - 16 Feb",
      "Note: Hotel details are tentative only. The hotel or place of accommodation may change.",
    ],
  },
  {
    id: "reporting",
    title: "Reporting & Dropping",
    content: [
      "Tour group reporting at Singapore Changi Airport at 10:00 AM.",
      "Drop will be at the same location after tour completion.",
      "Please reach the meeting point 30 minutes before scheduled time.",
    ],
  },
];

const itineraryData = [
  {
    id: 1,
    day: "Day 1 / 13 Feb, 26",
    activity: "Arrival at Singapore (3 Nights)",
    content:
      "Arrive at Changi International Airport, Singapore, and meet your tour manager. Transfer to your hotel for check-in. The rest of the day is free for leisure or optional activities. Dinner included.",
  },
  {
    id: 2,
    day: "Day 2 / 14 Feb, 26",
    activity: "Singapore City Tour & Gardens by the Bay",
    content:
      "Enjoy a morning city tour covering Merlion Park, China Town, and Little India. In the evening, visit the spectacular Gardens by the Bay, including the Cloud Forest and Flower Dome. Meals included.",
  },
  {
    id: 3,
    day: "Day 3 / 15 Feb, 26",
    activity: "Singapore – Universal Studios – Singapore",
    content:
      "Spend the full day at Universal Studios Singapore, Southeast Asia's first movie theme park. Enjoy thrilling rides and attractions based on your favorite blockbusters. Meals included.",
  },
  {
    id: 4,
    day: "Day 4 / 16 Feb, 26",
    activity: "Singapore – Departure",
    content:
      "After breakfast, check out from the hotel and proceed to Changi Airport for your flight back home. Tour concludes with beautiful memories. Breakfast included.",
  },
];

const needToKnowData = {
  weather: ["Hot & humid"],
  transport: {
    air: [
      "Mumbai - Singapore //Singapore - Mumbai.",
      "We use combination of Airlines like Singapore Airlines, Malaysian Airlines etc.",
    ],
    coach: ["A/C coach - Seating capacity depends upon group size"],
  },
  documents: [
    "Original passport with minimum 6 months validity from the date of tour arrival along with sufficient blank pages for the stamping of visa",
    "A valid Tourist Visa for the duration of the tour",
    "Handwritten passport is not acceptable",
  ],
};

const cancellationTable = [
  {
    fromDays: "121",
    toDays: "90",
    fromDate: "28 Aug 2023",
    toDate: "15 Oct 2025",
    fee: "10%",
  },
  {
    fromDays: "91",
    toDays: "120",
    fromDate: "16 Oct 2025",
    toDate: "14 Nov 2025",
    fee: "15%",
  },
  {
    fromDays: "61",
    toDays: "90",
    fromDate: "15 Nov 2025",
    toDate: "14 Dec 2025",
    fee: "20%",
  },
  {
    fromDays: "46",
    toDays: "60",
    fromDate: "15 Dec 2025",
    toDate: "29 Dec 2025",
    fee: "30%",
  },
  {
    fromDays: "31",
    toDays: "45",
    fromDate: "30 Dec 2025",
    toDate: "13 Jan 2026",
    fee: "40%",
  },
  {
    fromDays: "16",
    toDays: "30",
    fromDate: "14 Jan 2026",
    toDate: "28 Jan 2026",
    fee: "50%",
  },
  {
    fromDays: "6",
    toDays: "15",
    fromDate: "29 Jan 2026",
    toDate: "07 Feb 2026",
    fee: "75%",
  },
  {
    fromDays: "0",
    toDays: "5",
    fromDate: "08 Feb 2026",
    toDate: "13 Feb 2026",
    fee: "100%",
  },
];

const paymentTerms =
  'Guest can pay by Cheque/ Demand Draft/ Debit card / Credit card/ NEFT/ RTGS/ IMPS. For Debit / Credit card payment additional 1.8 % convenience charge will be applicable. Cheque / Demand draft should be in favour of "Veena Patil Hospitality Pvt. ltd".';

const remarks = [
  "All meals are provided by Veena World in case the flight reaches the stipulated destination early morning or leaves destination late in the evening.",
  "Standard Check-in and check-out time of International hotels is usually 1500 hrs and 1200 hrs respectively.",
  "Guests may please note that for Domestic flights or internal flights from one city to another city on international tours, the baggage allowance will be as per the airline policy.",
];

export default function TripDetails() {
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [openTravel, setOpenTravel] = useState("accommodation");
  const [openInfo, setOpenInfo] = useState("inclusion");
  const [activeUpgrade, setActiveUpgrade] = useState("flight");
  const [openDay, setOpenDay] = useState(1);
  const [openKnowBefore, setOpenKnowBefore] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState("Itinerary");

  const departureCities = [
    "All departures",
    "Cochin",
    "Chennai",
    "Kolkata",
    "Coimbatore",
    "Ahmedabad",
    "Goa",
    "Indore",
    "New Delhi",
    "Bangalore",
    "Hyderabad",
    "Nagpur",
    "Mumbai",
    "Joining/Leaving",
  ];

  const departureDates = [
    {
      date: "16",
      day: "THU",
      price: "₹94,000",
      note: "Only J/L available",
      month: "Oct 2025",
    },
    {
      date: "19",
      day: "SUN",
      price: "₹1,18,000",
      note: "On-Tour Diwali",
      month: "Oct 2025",
    },
    {
      date: "22",
      day: "WED",
      price: "₹94,000",
      note: "On-Tour Diwali",
      month: "Oct 2025",
    },
    {
      date: "26",
      day: "SUN",
      price: "₹1,20,000",
      note: "Diwali Special",
      month: "Oct 2025",
    },
    { date: "14", day: "FRI", price: "₹1,21,000", note: "", month: "Nov 2025" },
    { date: "12", day: "FRI", price: "₹1,22,000", note: "", month: "Dec 2025" },
    { date: "23", day: "TUE", price: "₹1,30,000", note: "", month: "Dec 2025" },
    { date: "27", day: "SAT", price: "₹1,33,000", note: "", month: "Dec 2025" },
    { date: "23", day: "FRI", price: "₹1,20,000", note: "", month: "Jan 2026" },
    {
      date: "13",
      day: "FRI",
      price: "₹1,15,000",
      note: "Lowest Price",
      month: "Feb 2026",
    },
    { date: "06", day: "FRI", price: "₹1,21,000", note: "", month: "Mar 2026" },
  ];

  // Group dates by month
  const groupedDates = departureDates.reduce((acc, d) => {
    const month = d.month;
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(d);
    return acc;
  }, {});

  // Refs for all itinerary sections
  const sectionRefs = {
    Itinerary: useRef(null),
    "Tour Details": useRef(null),
    "Tour Information": useRef(null),
    "Need to Know": useRef(null),
    "Policy & Terms": useRef(null),
    Upgrades: useRef(null),
  };

  // --- LOGIC: Scrollspy & Smooth Scroll ---
  const handleTabClick = (tabName, id) => {
    setActiveMainTab(tabName);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.scrollY + 100;
      let currentActiveTab = sections[0].name;

      for (const section of sections) {
        const ref = sectionRefs[section.name];
        if (ref.current) {
          const top = ref.current.offsetTop;
          const height = ref.current.offsetHeight;
          if (scrollThreshold >= top && scrollThreshold < top + height) {
            currentActiveTab = section.name;
          }
        }
      }
      setActiveMainTab(currentActiveTab);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRefs]);

  // --- Render Functions ---
  const renderItineraryContent = () => (
    <>
      <div className={styles.itineraryHeader}>
        <h4>Itinerary (Day Wise)</h4>
        <button className={styles.viewAllDays}>View all days</button>
      </div>
      <div className={styles.itineraryGrid}>
        <div className={styles.itineraryList}>
          {itineraryData.map((item) => (
            <div
              key={item.id}
              className={`${styles.itineraryItem} ${openDay === item.id ? styles.activeDay : ""}`}
            >
              <div
                className={styles.dayHeader}
                onClick={() => setOpenDay(openDay === item.id ? 0 : item.id)}
              >
                <div className={styles.dayText}>
                  <span className={styles.dot}></span>
                  <p className={styles.day}>
                    {item.day.split(" / ")[0]} /{" "}
                    <span className={styles.dateInfo}>{item.day.split(" / ")[1]}</span>
                  </p>
                  <p className={styles.activity}>{item.activity}</p>
                </div>
                <button className={styles.toggleBtn}>
                  {openDay === item.id ? <MinusIcon /> : <PlusIcon />}
                </button>
              </div>
              <div
                className={`${styles.dayContent} ${openDay === item.id ? styles.dayContentOpen : ""}`}
              >
                <p>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.infoBox}>
        <div
          className={styles.infoBoxHeader}
          onClick={() => setOpenKnowBefore(!openKnowBefore)}
        >
          <h5>Know, before you book</h5>
          <button className={styles.readMoreBtn}>
            {openKnowBefore ? "Read Less" : "Read More"}
          </button>
        </div>
        {openKnowBefore && (
          <div className={styles.infoBoxContent}>
            <p>Please note:</p>
            <p>
              <b>Airline:</b> On group tours, we generally fly with
              group-friendly airlines. Premium upgrades available at extra cost.
            </p>
            <p>
              <b>Visas:</b> Check latest requirements before travel.
            </p>
            <p>
              <b>Baggage:</b> Standard check-in allowance 20kg per person.
            </p>
          </div>
        )}
      </div>
    </>
  );

  const renderTourDetailsContent = () => (
    <div className={styles.tourDetailsSection}>
      <h4>Tour details</h4>
      <p className={styles.detailsSubtitle}>Best facilities with no added cost.</p>
      <div className={styles.infoTabs}>
        {travelDetails.map((detail) => (
          <button
            key={detail.id}
            className={`${styles.infoTab} ${openTravel === detail.id ? styles.activeTab : ""}`}
            onClick={() => setOpenTravel(detail.id)}
          >
            {detail.title}
          </button>
        ))}
      </div>
      <div className={styles.infoContent}>
        {openTravel === "accommodation" ? (
          <table className={styles.detailsTable}>
            <thead>
              <tr>
                <th>City - Country</th>
                <th>Hotel</th>
                <th>Check In - Check Out</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Singapore - Singapore</td>
                <td>M Hotel Singapore / or similar</td>
                <td>13 Feb - 16 Feb</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        ) : (
          <ul>
            {travelDetails
              .find((d) => d.id === openTravel)
              ?.content.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
          </ul>
        )}
        <p className={styles.note}>* Note: Details are tentative only.</p>
      </div>
    </div>
  );

  const renderTourInformationContent = () => (
    <div className={styles.tourInfoSection}>
      <h4>Tour Information</h4>
      <p className={styles.detailsSubtitle}>Read this to prepare for your tour in the best way!</p>
      <div className={styles.infoTabs}>
        {tourInfo.map((info) => (
          <button
            key={info.id}
            className={`${styles.infoTab} ${openInfo === info.id ? styles.activeTab : ""}`}
            onClick={() => setOpenInfo(info.id)}
          >
            {info.title}
          </button>
        ))}
      </div>
      <div className={styles.infoContent}>
        {tourInfo.map(
          (info) =>
            openInfo === info.id && (
              <ul key={info.id} className="list-disc ml-5 space-y-1">
                {info.content.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            )
        )}
      </div>
    </div>
  );

  const renderNeedToKnowContent = () => (
    <div className={styles.needToKnowSection}>
      <h4>Need to Know</h4>
      <p className={styles.detailsSubtitle}>Things to consider before the trip!</p>
      <div className={styles.needToKnowContent}>
        <h5>Weather</h5>
        <ul className={styles.knowList}>
          {needToKnowData.weather.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <p className={styles.weatherLink}>
          For detailed information about weather kindly visit{" "}
          <a href="http://www.accuweather.com" target="_blank">
            www.accuweather.com
          </a>
        </p>
        <h5>Transport</h5>
        <h6>Air Travel:</h6>
        <ul className={styles.knowList}>
          {needToKnowData.transport.air.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <h6>Coach Travel:</h6>
        <ul className={styles.knowList}>
          {needToKnowData.transport.coach.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <h5>Documents Required for Travel</h5>
        <ul className={styles.knowList}>
          {needToKnowData.documents.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderPolicyTermsContent = () => (
    <div className={styles.cancellationSection}>
      <h4>Cancellation Policy & Payment Terms</h4>
      <p className={styles.policyText}>
        * The cancellation policy applies to the tour departing from Mumbai on
        13 Feb 2026...
      </p>
      <div className={styles.cancellationTableContainer}>
        <table className={styles.cancellationTable}>
          <thead>
            <tr>
              <th>From Days</th>
              <th>To Days</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Cancellation Fee (%)</th>
            </tr>
          </thead>
          <tbody>
            {cancellationTable.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 transition">
                <td className="p-3 border-r text-sm">{row.fromDays}</td>
                <td className="p-3 border-r text-sm">{row.toDays}</td>
                <td className="p-3 border-r text-sm">{row.fromDate}</td>
                <td className="p-3 border-r text-sm">{row.toDate}</td>
                <td className="p-3 text-red-600 font-semibold">{row.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.paymentRemarks}>
        <h5>Payment Terms</h5>
        <p className="text-sm">{paymentTerms}</p>
        <h5>Remarks</h5>
        <ul className="list-disc ml-5 text-sm space-y-1">
          {remarks.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderUpgradesContent = () => (
    <div className={styles.upgradesSection}>
      <h4>Upgrades Available</h4>
      <p className={styles.upgradesSubtitle}>Want luxury? Add upgrades at minimum cost!</p>
      <div className={styles.upgradeTabs}>
        {upgrades.map((upgrade) => (
          <button
            key={upgrade.id}
            className={`${styles.upgradeTab} ${activeUpgrade === upgrade.id ? styles.activeUpgradeTab : ""}`}
            onClick={() => setActiveUpgrade(upgrade.id)}
          >
            {upgrade.title}
          </button>
        ))}
      </div>
      <div className={styles.upgradeContent}>
        {upgrades.map(
          (upgrade) =>
            activeUpgrade === upgrade.id && (
              <p key={upgrade.id}>{upgrade.content}</p>
            )
        )}
      </div>
    </div>
  );

  const renderAllItineraryContent = () => (
    <>
      <div id={sections[0].id} ref={sectionRefs[sections[0].name]} className={styles.contentSection}>
        {renderItineraryContent()}
      </div>
      <div id={sections[1].id} ref={sectionRefs[sections[1].name]} className={styles.contentSection}>
        {renderTourDetailsContent()}
      </div>
      <div id={sections[2].id} ref={sectionRefs[sections[2].name]} className={styles.contentSection}>
        {renderTourInformationContent()}
      </div>
      <div id={sections[3].id} ref={sectionRefs[sections[3].name]} className={styles.contentSection}>
        {renderNeedToKnowContent()}
      </div>
      <div id={sections[4].id} ref={sectionRefs[sections[4].name]} className={styles.contentSection}>
        {renderPolicyTermsContent()}
      </div>
      <div id={sections[5].id} ref={sectionRefs[sections[5].name]} className={styles.contentSection}>
        {renderUpgradesContent()}
      </div>
    </>
  );

  return (
    <section>
      <div className={styles.tripDetails} data-testid="top-section-row">
        <div className={styles.left}>
          <div className={styles.topSection}>
            <h3 className={styles.mainHeading}>
              Select departure city, dates & add guest to book your tour
            </h3>
            <p className={styles.subHeading}>
              As seats fill, prices increase! So book today!
            </p>
            <div className={styles.selectionScrollContainer}>
              <h4 className={styles.stepTitle}>1. SELECT DEPARTURE CITY & DATE</h4>
              <div className={styles.cityButtons}>
                {departureCities.map((city) => (
                  <button
                    key={city}
                    className={`${styles.cityBtn} ${selectedCity === city ? styles.activeCity : ""}`}
                    onClick={() => setSelectedCity(city)}
                  >
                    {city === "All departures" && <span className={styles.checkMark}>✔</span>}
                    {city}
                  </button>
                ))}
              </div>
              <div className={styles.datesHeader}>
                <p className={styles.allDatesText}>All departure dates ({departureDates.length})</p>
                <p className={styles.allDatesHint}>
                  All inclusive tours, lock in at this great price today.
                </p>
                <span className={styles.celebrationLink}>Celebrations</span>
              </div>
              <div className={styles.datesGridWrapper}>
                {Object.entries(groupedDates).map(([month, dates]) => (
                  <div key={month} className={styles.monthGroup}>
                    <div className={styles.monthTitle}>
                      {month.split(" ")[0]}
                      <span className={styles.monthYear}>{month.split(" ")[1]}</span>
                    </div>
                    <div className={styles.datesGrid}>
                      {dates.map((d, i) => (
                        <div
                          key={i}
                          className={`${styles.dateCard} ${d.note ? styles.hasNote : ""} ${
                            d.note === "Lowest Price" ? styles.lowestPrice : ""
                          }`}
                        >
                          <p className={styles.day}>{d.day}</p>
                          <p className={styles.date}>{d.date}</p>
                          <p className={styles.price}>{d.price}</p>
                          {d.note && (
                            <span
                              className={`${styles.noteTag} ${d.note === "Lowest Price" ? styles.lowestPriceTag : ""}`}
                            >
                              {d.note}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.termsAndConditions}>
              <ul>
                <li>* Terms and Conditions apply. 5% GST is applicable on given tour price.</li>
                <li>Mentioned tour prices are Per Person for Indian Nationals only.</li>
                <li>TCS at 5% or 10% if PAN is inoperative or not linked with Aadhaar!</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.summaryCard}>
            <h4>BOOKING SUMMARY</h4>
            <p>
              Dept. city: <b>{selectedCity}</b>
            </p>
            <p>
              Dept. date: <b>13 Feb 2026 → 16 Feb 2026</b>
            </p>
            <p className={styles.smallText}>Travellers: 0 Adult(s) | 0 Child | 0 Infant</p>
            <p className={styles.smallText}>Rooms: 0 Room</p>
            <hr className={styles.summaryDivider} />
            <p className={styles.basicPrice}>
              Basic Price<span className={styles.priceAmount}>₹1,15,000</span>
            </p>
            <div className={styles.priceLinks}>
              <a href="#" className={styles.priceLink}>
                View Pricing Table <ChevronRightIcon className="inline ml-1" />
              </a>
              <a href="#" className={styles.priceLink}>
                Cancellation Policy <ChevronRightIcon className="inline ml-1" />
              </a>
            </div>
            <p className={styles.emi}>
              EMI Available: <span>₹3,878/month</span>
            </p>
            <a href="#" className={styles.priceLink}>
              Check eligibility <ChevronRightIcon className="inline ml-1" />
            </a>
            <div className={styles.callToActions}>
              <div className={styles.contactInfo}>
                <PhoneIcon />
                <span>1800 313 5555</span>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Locate nearest Veena World
                </a>
              </div>
              <div className={styles.actions}>
                <button className={styles.enquireBtn}>Enquire Now</button>
                <button className={styles.bookBtn}>Book Online</button>
              </div>
            </div>
          </div>
          <div className={styles.termsFooter}>
            * Terms and Conditions apply.
            <ul className="list-disc ml-4 space-y-1">
              <li>TCS at 5% or 10% if PAN is inoperative or not linked with Aadhaar!</li>
              <li>Mentioned tour prices are Per Person for Indian Nationals only.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.tripDetails} data-testid="itinerary-section-row">
        <div className={styles.left}>
          <div className={styles.mainTabsWrapper}>
            <div className={styles.mainTabs}>
              {sections.map((section) => (
                <button
                  key={section.id}
                  className={`${styles.mainTab} ${activeMainTab === section.name ? styles.activeMainTab : ""}`}
                  onClick={() => handleTabClick(section.name, section.id)}
                >
                  {section.name}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.mainContentArea}>{renderAllItineraryContent()}</div>
        </div>
        <div className={styles.right}>
        <div className={styles.mapActionsContainer}>
  <div className={styles.mapContainer}>
    <button className={styles.mapContainerButton}>
      <MapMarkerIcon /> Map View
    </button>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.189179084091!2d103.81983631475456!3d1.3520834999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da190d7c8a1f11%3A0x2d3d4ff0e1080ff!2sSingapore!5e0!3m2!1sen!2sin!4v1696532841234!5m2!1sen!2sin"
      width="100%"
      height="200"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={styles.mapIframe}
    ></iframe>
  </div>
  <div className="flex flex-col space-y-2 mt-4">
    <button className={styles.actionBtn}>
      <ShareIcon /> Send Itinerary
    </button>
    <button className={styles.actionBtn}>
      <PrintIcon /> Print Itinerary
    </button>
    <button className={styles.actionBtn}>
      <EnvelopeIcon /> Email Itinerary
    </button>
    <button className={styles.actionBtn}>
      <ExchangeIcon /> Compare Tour
    </button>
  </div>
</div>
          <div className={styles.termsFooter}>
            * Terms and Conditions apply.
            <ul className="list-disc ml-4 space-y-1">
              <li>TCS at 5% or 10% if PAN is inoperative or not linked with Aadhaar!</li>
              <li>Mentioned tour prices are Per Person for Indian Nationals only.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
