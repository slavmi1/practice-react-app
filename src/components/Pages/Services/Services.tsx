import styles from "./Services.module.scss";
import Card from "../../UI/Card/Card";
import BookingForm from "./BookingForm/BookingForm";
import ServicesList from "./ServicesList/ServicesList";
import type { Service } from "./types";
import { useState } from "react";

const services: Service[] = [
  {
    id: 1,
    title: "Мужская стрижка",
    description: "Классическая или современная стрижка",
    duration: 45,
    price: 1200,
    icon: "haircut",
  },
  {
    id: 2,
    title: "Оформление бороды",
    description: "Моделирование и уход за бородой",
    duration: 30,
    price: 800,
    icon: "beard",
  },
  {
    id: 3,
    title: "Стрижка + борода",
    description: "Комплексная услуга для завершённого образа",
    duration: 60,
    price: 1800,
    icon: "haircut-and-beard",
  },
  {
    id: 4,
    title: "Детская стрижка",
    description: "Аккуратная стрижка для мальчиков",
    duration: 40,
    price: 900,
    icon: "kids-haircut",
  },
  {
    id: 5,
    title: "Укладка",
    description: "Финальная укладка с профессиональными средствами",
    duration: 20,
    price: 600,
    icon: "styling",
  },
];

const Services = () => {
  const [selectedServiceId, setSelectedServiceId] = useState("");

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
