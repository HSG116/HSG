import ServiceCard from "../ServiceCard";
import { SERVICES } from "@/data/services";

export default function ServiceCardExample() {
  return (
    <div className="p-4 bg-background">
      <ServiceCard service={SERVICES[0]} index={0} />
    </div>
  );
}
