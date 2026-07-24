export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "What QA services do you provide?",
    answer:
      "We provide manual testing, automation testing, API testing, performance testing, QA consulting, QA strategy, and corporate QA training.",
  },
  {
    question: "Can your QA engineers work with our existing team?",
    answer:
      "Absolutely. We integrate seamlessly into Agile and Scrum teams, participating in sprint planning, daily standups, regression testing, and release validation.",
  },
  {
    question: "Do you build automation frameworks?",
    answer:
      "Yes. We build scalable automation frameworks using Playwright, Cypress, Selenium, Postman, and other modern testing tools depending on your technology stack.",
  },
  {
    question: "Which industries do you specialize in?",
    answer:
      "We work with FinTech, HealthTech, SaaS, Retail, Government, Education, Logistics, and enterprise software organizations.",
  },
  {
    question: "Can you test before product launch?",
    answer:
      "Definitely. We help teams validate releases through functional, regression, API, performance, and exploratory testing before production deployment.",
  },
  {
    question: "Do you provide ongoing QA support?",
    answer:
      "Yes. Whether you need a dedicated QA team or continuous testing support after launch, we offer flexible engagement models tailored to your business.",
  },
];