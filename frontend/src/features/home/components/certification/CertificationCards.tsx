import { certificationCards } from "./data";
import CertificationCard from "./CertificationCard";

export default function CertificationCards() {
  return (
    <div className="mt-16 grid gap-8 lg:grid-cols-2">
      {certificationCards.map((card) => (
        <CertificationCard
          key={card.title}
          {...card}
        />
      ))}
    </div>
  );
}