export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Adeniyi John",
    role: "Quality Assurance Engineer",
    company: "FinTech Company",
    image: "/images/testimonials/john.jpeg",
    rating: 5,
    quote:
      "QA Solucity transformed our development process. Their meticulous testing uncovered issues before production and significantly improved our release confidence.",
  },

  {
    id: 2,
    name: "Iyeoluwa Malomo",
    role: "SCRUM Master",
    company: "Travel Agency",
    image: "/images/testimonials/sarah.png",
    rating: 5,
    quote:
      "Their QA consultants integrated seamlessly into our team. Communication was excellent and the automation suite they delivered reduced our regression time dramatically.",
  },

  {
    id: 3,
    name: "Joshua Boluwade",
    role: "Engineering Lead",
    company: "SaaS Startup",
    image: "/images/testimonials/michael.jpeg",
    rating: 5,
    quote:
      "One of the most professional QA teams we've worked with. From manual testing to automation, everything was documented and delivered beyond expectations.",
  },
];