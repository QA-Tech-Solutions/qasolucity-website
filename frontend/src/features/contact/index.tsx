import ContactHero from "./components/hero";
import ContactTrustStrip from "./components/trust-strip";
import ContactForm from "./components/contact-form";
import WhyContactUs from "./components/why-contact-us";
import ContactFAQ from "./components/contact-faq";
import ContactCTA from "./components/contact-cta";

import Footer from "../home/components/footer";

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <ContactTrustStrip />

      <ContactForm />

      <WhyContactUs />

      <ContactFAQ />

      <ContactCTA />

      <Footer />
    </>
  );
}