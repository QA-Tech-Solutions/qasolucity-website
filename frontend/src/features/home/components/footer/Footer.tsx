import Container from "@/components/layout/Container";

import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterNewsletter from "./FooterNewsletter";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <Container>

        <div className="grid gap-20 border-b border-white/10 py-24 lg:grid-cols-[1.4fr_2fr_1fr]">

          <FooterBrand />

          <FooterLinks />

          <FooterNewsletter />

        </div>

        <div className="flex flex-col items-center justify-between gap-5 py-8 text-sm text-slate-400 lg:flex-row">

          <p>
            © {new Date().getFullYear()} QA Solucity. All rights reserved.
          </p>

          <div className="flex gap-8">

            <a href="#">Privacy</a>

            <a href="#">Terms</a>

            <a href="#">Cookies</a>

          </div>

        </div>

      </Container>
    </footer>
  );
}