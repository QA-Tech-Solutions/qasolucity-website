import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const BLOG_IMAGES_DIR = path.join(process.cwd(), "public", "images", "blog");

// Most posts' frontmatter points at a per-slug cover image
// (/images/blog/<slug>.png) that was never actually supplied — only 3
// real cover images exist so far. Rather than 404ing on every one of
// those posts, fall back to one of the 3 real images, picked
// deterministically per slug so the same post always gets the same
// placeholder instead of a different one on every rebuild.
const FALLBACK_IMAGES = [
  "/images/blog/blog-1.png",
  "/images/blog/blog-2.png",
  "/images/blog/blog-3.png",
];

function resolveImage(slug: string, image: string): string {
  const filename = path.basename(image);
  if (fs.existsSync(path.join(BLOG_IMAGES_DIR, filename))) {
    return image;
  }
  const hash = [...slug].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return FALLBACK_IMAGES[hash % FALLBACK_IMAGES.length];
}

export interface BlogFrontmatter {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  author: string;
  authorRole: string;
}

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  readTime: string;
  content: string;
}

function readPostFile(filename: string): BlogPost {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogFrontmatter;

  return {
    ...frontmatter,
    image: resolveImage(slug, frontmatter.image),
    slug,
    content,
    readTime: readingTime(content).text,
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(readPostFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  return readPostFile(`${slug}.md`);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const all = getAllPosts().filter((item) => item.slug !== post.slug);
  const sameCategory = all.filter((item) => item.category === post.category);
  const rest = all.filter((item) => item.category !== post.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
