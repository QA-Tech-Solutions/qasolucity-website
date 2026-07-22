import { services } from "./services";
import ServiceCard from "./ServiceCard";

export default function ServiceGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service) => (
        <ServiceCard
          key={service.title}
          {...service}
        />
      ))}
    </div>
  );
}