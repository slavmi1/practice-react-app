import styles from "./Services.module.scss";
import Card from "../../UI/Card/Card";
import BookingForm from "./BookingForm/BookingForm";
import ServicesList from "./ServicesList/ServicesList";
import type { Service } from "./types";
import { useEffect, useState } from "react";
import { getServices } from "../../../Api/servicesApi";

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState("");

  useEffect(() => {
    const loadServices = async () => {
      const services = await getServices();

      setServices(services);
    };

    loadServices();
  }, []);

  return (
    <section className={styles.services}>
      <Card className={styles.topCard}>
        <h1 className={styles.title}>Услуги и запись</h1>
        <p className={styles.underTitle}>
          Выберите услугу, дату и время, затем оставьте свои контакты для записи
        </p>
      </Card>

      <div className={styles.content}>
        <ServicesList
          services={services}
          selectedServiceId={selectedServiceId}
          onServiceSelect={setSelectedServiceId}
        />
        <BookingForm
          services={services}
          selectedServiceId={selectedServiceId}
          onServiceSelect={setSelectedServiceId}
        />
      </div>
    </section>
  );
};

export default Services;
