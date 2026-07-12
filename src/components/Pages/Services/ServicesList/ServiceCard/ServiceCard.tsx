import styles from "./ServiceCard.module.scss";
import clockIcon from "../../../../../assets/icons/clock.svg";
import selectedIcon from "../../../../../assets/icons/confirmed.svg";

import Card from "../../../../UI/Card/Card";
import Button from "../../../../UI/Button/Button";

type ServiceCardProps = {
  icon: string;
  title: string;
  description: string;
  duration: number;
  price: number;
  isSelected: boolean;
  onSelect: () => void;
};

const ServiceCard = (props: ServiceCardProps) => {
  const { icon, title, description, duration, price, isSelected, onSelect } =
    props;

  return (
    <Card
      className={`styles.serviceCard ${isSelected ? styles.serviceCard_selected : ""}`}
    >
      <div className={styles.top}>
        <img className={styles.icon} src={icon} alt="" aria-hidden="true" />

        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>

        {isSelected && (
          <div className={styles.selectedMark}>
            <img src={selectedIcon} />
          </div>
        )}
      </div>

      <hr className={styles.divider} />

      <div className={styles.bottom}>
        <span className={styles.duration}>
          <img src={clockIcon} alt="" aria-hidden="true" />
          {duration} мин
        </span>
        <span className={styles.price}>{price} ₽</span>
        <Button type="button" className={styles.button} onClick={onSelect}>
          {isSelected ? "Выбрано" : "Выбрать"}
        </Button>
      </div>
    </Card>
  );
};

export default ServiceCard;
