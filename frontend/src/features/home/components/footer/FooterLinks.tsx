import { footerLinks } from "./footer-data";

export default function FooterLinks() {
  return (
    <div className="grid grid-cols-3 gap-10">

      <div>

        <h4 className="mb-6 font-semibold">
          Services
        </h4>

        <ul className="space-y-4 text-slate-400">

          {footerLinks.services.map((item) => (
            <li key={item}>
              <a
                href="#"
                className="transition hover:text-white"
              >
                {item}
              </a>
            </li>
          ))}

        </ul>

      </div>

      <div>

        <h4 className="mb-6 font-semibold">
          Company
        </h4>

        <ul className="space-y-4 text-slate-400">

          {footerLinks.company.map((item) => (
            <li key={item}>
              <a
                href="#"
                className="transition hover:text-white"
              >
                {item}
              </a>
            </li>
          ))}

        </ul>

      </div>

      <div>

        <h4 className="mb-6 font-semibold">
          Resources
        </h4>

        <ul className="space-y-4 text-slate-400">

          {footerLinks.resources.map((item) => (
            <li key={item}>
              <a
                href="#"
                className="transition hover:text-white"
              >
                {item}
              </a>
            </li>
          ))}

        </ul>

      </div>

    </div>
  );
}