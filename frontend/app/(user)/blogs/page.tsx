import HeroSlider from "./sections/HeroSlider";
import BlogsGrid from "./sections/BlogsGrid";

const slidesData = [
  {
    image: "/images/leh.jpg",
    title: "My First Blog",
    tags: ["React", "Next.js"],
    date: "Aug 20, 2025",
    author: "Shikha Singh",
    link: "/blogs/first-blog",
    readTime: "3 min read",
  },
  {
    image: "/images/spain.jpg",
    title: "Another Post",
    tags: ["JavaScript", "Frontend"],
    date: "Aug 21, 2025",
    author: "Admin",
    link: "/blogs/second-post",
    readTime: "4 min read",
  },
];

export default function BlogsPage() {
  return (
    <>
      <HeroSlider slides={slidesData} />
      <BlogsGrid />
        
    </>
  );
}
