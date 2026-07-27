export interface ContactFAQ {
  question: string;
  answer: string;
}

export const contactFaqs: ContactFAQ[] = [
  {
    question: "How quickly will I receive a response?",
    answer:
      "Our team typically responds to all enquiries within one business day. For urgent requests, we'll do our best to respond even sooner.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes. We work with startups, SMEs and enterprise teams across different countries using remote collaboration tools.",
  },
  {
    question: "Can you sign an NDA before discussing my project?",
    answer:
      "Absolutely. We understand the importance of confidentiality and are happy to sign a Non-Disclosure Agreement before any detailed discussions.",
  },
  {
    question: "Do you provide one-time testing or ongoing QA support?",
    answer:
      "We offer both. Whether you need a one-time testing engagement or a dedicated QA partner for continuous releases, we can tailor our services to your needs.",
  },
];