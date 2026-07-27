import {
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const items = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@qasolucity.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+234 xxx xxx xxxx",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Lagos, Nigeria",
  },
  {
    icon: Clock3,
    title: "Business Hours",
    value: "Mon – Fri • 9AM – 6PM",
  },
];

export default function ContactHeroStats() {
  return (
    <div className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/50">

      <h3 className="text-2xl font-bold text-slate-900">
        Get in Touch
      </h3>

      <p className="mt-3 leading-7 text-slate-600">
        Reach out through any of the channels below.
      </p>

      <div className="mt-10 space-y-8">

        {items.map(({ icon: Icon, title, value }) => (
          <div
            key={title}
            className="flex gap-5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50">
              <Icon className="h-5 w-5 text-indigo-600" />
            </div>

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                {title}
              </p>

              <p className="mt-2 font-semibold text-slate-900">
                {value}
              </p>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}