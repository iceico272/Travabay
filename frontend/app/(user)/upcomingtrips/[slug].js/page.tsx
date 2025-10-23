// import GallerySlider from '@/components/pages/Home/GallerySlider';
import Hero from '../../trips/[categorySlug]/[subCategorySlug]/[packageSlug]/pages/Hero';
import TripDetails from '../../trips/[categorySlug]/[subCategorySlug]/[packageSlug]/pages/TripDetails';
import  SimilarTrips from '../../trips/[categorySlug]/[subCategorySlug]/[packageSlug]/pages/SimilarTrips';
const tripData = {
  title: "Best of Singapore",
  reviews: 78,
  rating: 4.9,
  duration: "4 Days",
  country: "1 Country",
  city: "1 City",
  location: "Singapore (3N)",
  priceMumbai: "₹1,15,000",
  priceJoining: "₹92,000",
  emi: "₹3,878/month",
  banner: "/images/shimla.jpg", // Replace with an actual accessible image path
  highlights: [
      "Marina Bay Sands",
      "Sentosa Island",
      "Universal Studios",
      "Gardens by the Bay",
  ],
};
export default function HomePage() {
 
  return (
    <>
     <Hero trip={tripData} />
      <TripDetails/>    
     < SimilarTrips/>
</>
);
}