export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
}

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
    image: "/images/testimonials/John-5.jpg",
    rating: 5,
    quote:
      "QA Solucity transformed our development process. Their meticulous testing uncovered issues before production and significantly improved our release confidence.",
  },
  {
    id: 2,
    name: "Iyeoluwa Malomo",
    role: "SCRUM Master",
    company: "Travel Agency",
    image: "/images/testimonials/Iyeoluwa-1.png",
    rating: 5,
    quote:
      "Their QA consultants integrated seamlessly into our team. Communication was excellent and the automation suite they delivered reduced our regression time dramatically.",
  },
  {
    id: 3,
    name: "Joshua Boluwade",
    role: "Engineering Lead",
    company: "SaaS Startup",
    image: "/images/testimonials/Joshua.jpg",
    rating: 5,
    quote:
      "One of the most professional QA teams we've worked with. From manual testing to automation, everything was documented and delivered beyond expectations.",
  },
  {
    id: 4,
    name: "Chidinma Okafor",
    role: "Product Manager",
    company: "E-commerce Platform",
    image: "/images/testimonials/Iyeoluwa-2.jpeg",
    rating: 5,
    quote:
      "QA Solucity helped us ship faster with fewer bugs. Their detailed test reports gave our team the confidence to deploy weekly without breaking things.",
  },
  {
    id: 5,
    name: "Tunde Adebayo",
    role: "CTO",
    company: "HealthTech Startup",
    image: "/images/testimonials/Joshua-2.jpg",
    rating: 5,
    quote:
      "We needed a QA partner who understood our compliance needs. QA Solucity not only delivered but also trained our internal team on best practices.",
  },
  {
    id: 6,
    name: "Ngozi Eze",
    role: "DevOps Engineer",
    company: "Cloud Infrastructure Firm",
    image: "/images/testimonials/John-6.jpeg",
    rating: 4,
    quote:
      "Their DevOps and QA integration was flawless. We saw a 40% reduction in post-release defects within the first quarter of working together.",
  },
  {
    id: 7,
    name: "Oluwafemi Ogunleye",
    role: "Senior Developer",
    company: "EdTech Company",
    image: "/images/testimonials/Joshua-1.jpg",
    rating: 5,
    quote:
      "QA Solucity's automation scripts saved us countless hours. Their framework is robust, maintainable, and runs reliably in our CI/CD pipeline.",
  },
  {
    id: 8,
    name: "Folake Balogun",
    role: "Head of Product",
    company: "Logistics Startup",
    image: "/images/testimonials/Iyeoluwa-3.jpeg",
    rating: 5,
    quote:
      "They helped us identify critical performance bottlenecks before our peak season. Our uptime improved significantly after their load testing recommendations.",
  },
  {
    id: 9,
    name: "Emeka Nwosu",
    role: "QA Lead",
    company: "Banking Solutions",
    image: "/images/testimonials/John.jpeg",
    rating: 5,
    quote:
      "As a QA lead, I appreciated their collaborative approach. They shared knowledge freely and helped us adopt modern testing tools we hadn't considered.",
  },
  {
    id: 10,
    name: "Temilade Ajayi",
    role: "Project Manager",
    company: "Government Agency (Digital Services)",
    image: "/images/testimonials/John-2.jpeg",
    rating: 4,
    quote:
      "QA Solucity delivered under a tight timeline and with strict compliance requirements. Their attention to detail gave us the confidence to go live.",
  },
];