import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { formatDate } from "../../../../lib/formatDate";
import { getAllBlogs, getBlogBySlug } from "../../../../lib/getAllBlogs";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: "Blog not found",
    };
  }

  return {
    title: `${blog.title} | John Doe`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: blog.image ? [blog.image] : [],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <Container>
      <div className="max-w-4xl mx-auto">
        {" "}
        {blog.image && (
          <Image
            src={blog.image}
            alt={blog.title}
            width={800}
            height={400}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
        )}
        <Heading className="text-3xl md:text-4xl font-bold mb-4">
          {blog.title}
        </Heading>
        <div className="flex items-center gap-4 mb-6 text-neutral-600">
          <span>{formatDate(blog.date)}</span>
          {blog.reading_time && (
            <>
              <span>•</span>
              <span>{blog.reading_time} min read</span>
            </>
          )}
        </div>
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-neutral-100 text-neutral-700 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <Paragraph className="text-lg mb-8">{blog.description}</Paragraph>
        {blog.html && (
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.html }}
          />
        )}
      </div>
    </Container>
  );
}
