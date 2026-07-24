export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  slug: string;
}

export const blogs: Blog[] = [
  {
    id: 1,
    title: "Why Every Startup Needs a QA Strategy Before Launch",
    excerpt:
      "Learn how early quality assurance reduces bugs, lowers costs and improves customer trust.",
    category: "QA Strategy",
    readTime: "6 min read",
    image: "/images/blog/blog-1.png",
    slug: "/blog/qa-strategy-before-launch",
  },
  {
    id: 2,
    title: "Playwright vs Cypress: Which Testing Tool Should You Choose?",
    excerpt:
      "A practical comparison of two of today's most popular automation testing frameworks.",
    category: "Automation",
    readTime: "8 min read",
    image: "/images/blog/blog-2.png",
    slug: "/blog/playwright-vs-cypress",
  },
  {
    id: 3,
    title: "Common API Testing Mistakes Teams Make",
    excerpt:
      "Avoid the pitfalls that lead to unstable integrations and production failures.",
    category: "API Testing",
    readTime: "5 min read",
    image: "/images/blog/blog-3.png",
    slug: "/blog/api-testing-mistakes",
  },
];