import type { Service } from "../types";
import ServiceCard from "./ServiceCard/ServiceCard";
import styles from "./ServicesList.module.scss";

type ServicesListProps = {
  services: Service[];
  selectedServiceId: string;
  onServiceSelect: (serviceId: string) => void;
};

const ServicesList = (props: ServicesListProps) => {
  const { services, selectedServiceId, onServiceSelect } = props;

  return (
    <div className={styles.servicesList}>
      {services.map((service) => (
        <ServiceCard
          key={service._id}
          icon={service.icon}
          title={service.title}
          description={service.description}
          duration={service.duration}
          price={service.price}
          isSelected={selectedServiceId === String(service._id)}
          onSelect={() => onServiceSelect(String(service._id))}
        />
      ))}
    </div>
  );
};

export default ServicesList;
