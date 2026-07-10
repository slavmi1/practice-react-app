import styles from "./ServiceCard.module.scss";
import clockIcon from "../../../assets/service_icons/clock.svg";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";

type ServiceCardProps = {
  icon: string;
  title: string;
  description: string;
  duration: number;
  price: number;
};

const ServiceCard = (props: ServiceCardProps) => {
  const { icon, title, description, duration, price } = props;

  return (
    <Card className={styles.serviceCard}>
      <div className={styles.top}>
        <img className={styles.icon} src={icon} alt="" aria-hidden="true" />

        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.bottom}>
        <span className={styles.duration}>
          <img src={clockIcon} alt="" aria-hidden="true" />
          {duration} мин
        </span>
        <span className={styles.price}>{price} ₽</span>
        <Button className={styles.button}>Выбрать</Button>
      </div>
    </Card>
  );
};

export default ServiceCard;
