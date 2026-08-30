import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const PUBLIC_DIR = path.join(process.cwd(), "public");

// Cover images aren't a uniform aspect ratio, and the article hero should
// size itself to whatever the image actually is rather than cropping it
// into a fixed box. PNG stores width/height as big-endian uint32s right
// after the 8-byte signature + IHDR chunk header, so reading just the
// first 24 bytes is enough - no need for an image-processing dependency.
function readPngDimensions(publicPath: string): { width: number; height: number } | null {
  try {
    const fd = fs.openSync(path.join(PUBLIC_DIR, publicPath), "r");
    const header = Buffer.alloc(24);
    fs.readSync(fd, header, 0, 24, 0);
    fs.closeSync(fd);
    return { width: header.readUInt32BE(16), height: header.readUInt32BE(20) };
  } catch {
    return null;
  }
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
  imageWidth: number;
  imageHeight: number;
}

// Falls back to this aspect ratio (matches most of the real covers) if a
// post's image is missing or isn't a readable PNG, so a broken image
// still reserves a sane layout box instead of collapsing to 0 height.
const DEFAULT_IMAGE_SIZE = { width: 1536, height: 1024 };

function readPostFile(filename: string): BlogPost {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogFrontmatter;
  const { width, height } = readPngDimensions(frontmatter.image) ?? DEFAULT_IMAGE_SIZE;

  return {
    ...frontmatter,
    slug,
    content,
    readTime: readingTime(content).text,
    imageWidth: width,
    imageHeight: height,
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
