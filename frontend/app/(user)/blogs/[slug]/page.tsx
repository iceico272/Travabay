import Hero from "../sections/Hero";
import BlogContent from "../sections/BlogContent";
import RelatedBlogs from "../sections/RelatedBlogs";

export default function BlogInfo() {
  // Mock blog data (replace with API later)
  const blog = {
    image: "/images/leh.jpg",
    title: "Lady Buddha, Da Nang – A Spiritual Icon",
    author: "John Traveler",
    date: "24 Sep, 2025",
    readTime: "5 min read",
    tags: ["Travel", "Vietnam", "Places To Visit"],
    content: [
      {
        type: "paragraph",
        text: "Meet Lady Buddha, the tallest Buddha statue in Vietnam, standing on the Son Tra Peninsula overlooking Da Nang.",
      },
      {
        type: "paragraph",
        text: "The statue is part of the Linh Ung Pagoda complex and is a significant spiritual and cultural symbol for the local people.Traveling is one of the most exciting ways to explore new places, meet people, and create memories that last a lifetime. It’s like opening a magical book where every destination writes a new chapter filled with adventure and learning. For beginners, traveling offers the perfect chance to step out of their comfort zones and embrace the wonders of the world. In this article, we will learn how to write paragraphs about traveling in different lengths, each highlighting the emotions, activities, and lessons that come with the journey. Whether you’re planning your first trip or dreaming of future adventures, this guide will inspire you to share your story. Let’s dive in!",
      },
      {
        type: "heading",
        text: "Why Visit Lady Buddha?",
      },
      {
        type: "paragraph",
        text: "From the base, visitors enjoy breathtaking panoramic views of Da Nang’s coastline, making it both a religious and tourist attraction.",
      },
      {
        type: "image",
        src: "/images/shimla.jpg",
        caption: "The stunning Lady Buddha statue overlooking the ocean.",
      },
      {
        type: "paragraph",
        text: "From the base, visitors enjoy breathtaking panoramic views of Da Nang’s coastline, making it both a religious and tourist attraction.In this article, we will learn how to write paragraphs about traveling in different lengths, each highlighting the emotions, activities, and lessons that come with the journey. Whether you’re planning your first trip or dreaming of future adventures, this guide will inspire you to share your story",
      },
      {
        type: "blockquote",
        text: "A spiritual icon and breathtaking viewpoint.",
      },
      {
        type: "subheading",
        text: "Tips for Travelers",
      },
      {
        type: "list",
        items: [
          "Best time to visit: Early morning or sunset.",
          "Wear modest clothing as it is a spiritual site.",
          "Bring a camera for amazing panoramic shots.",
        ],
      },
      {
        type: "paragraph",
        text: "Whether you are spiritual or simply seeking breathtaking views, Lady Buddha is a must-see landmark in Da Nang.",
      },
    ],
  };

  const relatedBlogs = [
    {
      id: 1,
      title: "Khai Dinh Tomb: A Fusion of Cultures",
      image: "/images/shimla.jpg",
      link: "/blogs/khai-dinh-tomb",
    },
    {
      id: 2,
      title: "Mystical Po Nagar Cham Towers",
      image: "/images/spain.jpg",
      link: "/blogs/po-nagar-cham-towers",
    },
  ];

  return (
    <>
      <Hero
        image={blog.image}
        title={blog.title}
        author={blog.author}
        date={blog.date}
        readTime={blog.readTime}
        tags={blog.tags}
      />
      <BlogContent content={blog.content} />
      <RelatedBlogs blogs={relatedBlogs} />
    </>
  );
}
