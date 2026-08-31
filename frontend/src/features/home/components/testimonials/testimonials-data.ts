export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  /** Omit when there's no real headshot to use — the card falls back to initials. */
  image?: string;
  quote: string;
  rating: number;
}

// Placeholder set — swap for real client testimonials (name/role/company/
// quote, and a photo where one's been provided) once available. Kept
// deliberately free of any "Verified"/"100% Recommended" style claims,
// since those shouldn't appear until they're actually true of whatever
// content is here.
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Iyeoluwa Malomo",
    role: "SCRUM Master",
    company: "SaaS Startup",
    image: "/images/testimonials/Iyeoluwa-1.png",
    rating: 5,
    quote:
      "Their QA consultants integrated seamlessly into our team. Communication was excellent and the automation suite they delivered reduced our regression time dramatically.",
  },
  {
    id: 2,
    name: "Joshua Boluwade",
    role: "Software Engineer",
    company: "SaaS Startup",
    // image: "/images/testimonials/Joshua.jpg",
    rating: 5,
    quote:
      "One of the most professional QA teams we've worked with. From manual testing to automation, everything was documented and delivered beyond expectations.",
  },
  // {
  //   id: 3,
  //   name: "Hello IBK",
  //   role: "Senior Software Engineer",
  //   company: "HealthTech Startup",
  //   image: "/images/testimonials/Joshua-2.jpg",
  //   rating: 5,
  //   quote:
  //     "We needed a QA partner who understood our compliance needs. QA Solucity not only delivered but also trained our internal team on best practices.",
  // },
  // {
  //   id: 4,
  //   name: "Ngozi Eze",
  //   role: "DevOps Engineer",
  //   company: "Cloud Infrastructure Firm",
  //   image: "/images/testimonials/John-6.jpeg",
  //   rating: 4,
  //   quote:
  //     "Their DevOps and QA integration was flawless. We saw a 40% reduction in post-release defects within the first quarter of working together.",
  // },
  // {
  //   id: 5,
  //   name: "Adeniyi John",
  //   role: "Quality Assurance Engineer",
  //   company: "FinTech Company",
  //   image: "/images/testimonials/John-5.jpg",
  //   rating: 5,
  //   quote:
  //     "QA Solucity transformed our development process. Their meticulous testing uncovered issues before production and significantly improved our release confidence.",
  // },
];