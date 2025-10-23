import Hero from './(user)/home/sections/Hero.js';
import WhyBest from './(user)/home/sections/WhyBest';
import GallerySlider from './(user)/home/sections/GallerySlider';
import { GalleryImage } from "@/components/types/galleryslider";
import Contact from './(user)/contact/sections/contact';
import CommunityTrips from './(user)/home/sections/Upcomingtrip';
import FeaturedPackages from './(user)/home/sections/FeaturedPackages';
import International from './(user)/home/sections/International';
import Romantic from './(user)/home/sections/Romantic';
import SliderBanner from './(user)/home/sections/SliderBanner';
import Stats from './(user)/home/sections/Stats';


export default function HomePage() {
  const images: GalleryImage[] = [
    { url: "/images/leh.jpg", title: "leh", location: "leh" },
    { url: "/images/shimla.jpg", title: "shimla", location: "shimla" },
    { url: "/images/spain.jpg", title: "spain", location: "spain" },
    { url: "/images/europe.jpg", title: "europe", location: "europe" },
    { url: "/images/leh.jpg", title: "leh", location: "leh" },
    { url: "/images/shimla.jpg", title: "shimla", location: "shimla" },
    { url: "/images/spain.jpg", title: "spain", location: "spain" },
    { url: "/images/europe.jpg", title: "europe", location: "europe" },
    { url: "/images/leh.jpg", title: "leh", location: "leh" },
    { url: "/images/shimla.jpg", title: "shimla", location: "shimla" },
    { url: "/images/spain.jpg", title: "spain", location: "spain" },
    { url: "/images/europe.jpg", title: "europe", location: "europe" },
  ];

  return (
    <>
      <Hero />
      <SliderBanner />
      <International /> 
      <CommunityTrips />
      <Romantic />
      <SliderBanner />
      <FeaturedPackages />
      <WhyBest />
      <GallerySlider images={images} />
      <Stats />
      <Contact />
    </>
  );
}
