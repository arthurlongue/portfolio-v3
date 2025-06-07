import { Blog } from "@/types/blog";
import { ghostUtils, type Post } from "./ghost";

// Fallback blog data for development/demo purposes
const fallbackBlogs: Blog[] = [
  {
    title: "Getting Started with Ghost CMS",
    description:
      "Learn how to set up and configure Ghost CMS for your blog. This comprehensive guide covers everything from installation to customization.",
    date: "2024-01-15",
    slug: "getting-started-with-ghost-cms",
    image: "/images/default-blog.svg",
    tags: ["Ghost", "CMS", "Tutorial"],
    html: "<p>This is a demo blog post. Configure your Ghost CMS credentials in .env.local to see real content.</p>",
    reading_time: 5,
  },
  {
    title: "Building Modern Web Applications",
    description:
      "Explore the latest trends and technologies in web development. From React to Next.js, discover the tools that are shaping the future.",
    date: "2024-01-10",
    slug: "building-modern-web-applications",
    image: "/images/default-blog.svg",
    tags: ["React", "Next.js", "Web Development"],
    html: "<p>This is a demo blog post. Configure your Ghost CMS credentials in .env.local to see real content.</p>",
    reading_time: 8,
  },
];

// Convert Ghost Post to Blog type
function convertGhostPostToBlog(post: Post): Blog {
  return {
    id: post.id,
    title: post.title,
    description: post.excerpt || post.meta_description || "",
    date: post.published_at || post.created_at,
    slug: post.slug,
    image: post.feature_image || "/images/default-blog.svg",
    tags: post.tags?.map((tag) => tag.name) || [],
    html: post.html || "",
    plaintext: post.plaintext || "",
    reading_time: post.reading_time || 0,
    authors: post.authors || [],
    featured: post.featured,
    created_at: post.created_at,
    updated_at: post.updated_at,
    excerpt: post.excerpt,
    meta_title: post.meta_title,
    meta_description: post.meta_description,
  };
}

export async function getAllBlogs(): Promise<Blog[]> {
  // Check if Ghost CMS is configured
  if (!process.env.GHOST_URL || !process.env.GHOST_CONTENT_API_KEY) {
    console.warn(
      "Ghost CMS not configured. Using fallback data. Please set GHOST_URL and GHOST_CONTENT_API_KEY in .env.local"
    );
    return fallbackBlogs;
  }

  try {
    const posts = await ghostUtils.getAllPosts();

    return posts.map(convertGhostPostToBlog).sort((a: Blog, b: Blog) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error("Error fetching blogs from Ghost:", error);
    console.warn(
      "Falling back to demo data. Please check your Ghost CMS configuration."
    );
    return fallbackBlogs;
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  // Check if Ghost CMS is configured
  if (!process.env.GHOST_URL || !process.env.GHOST_CONTENT_API_KEY) {
    return fallbackBlogs.find((blog) => blog.slug === slug) || null;
  }

  try {
    const post = await ghostUtils.getPostBySlug(slug);
    return convertGhostPostToBlog(post);
  } catch (error) {
    console.error("Error fetching blog from Ghost:", error);
    return fallbackBlogs.find((blog) => blog.slug === slug) || null;
  }
}
