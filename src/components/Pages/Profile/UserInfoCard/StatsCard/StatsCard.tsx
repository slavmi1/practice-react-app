import Card from "../../../../UI/Card/Card";
import styles from "./StatsCard.module.scss";

type StatsCardProps = {
  text: string;
  number: number;
  icon: string;
};

const StatsCard = ({ text, number, icon }: StatsCardProps) => {
  return (
    <Card className={styles.statsCard}>
      <div className={styles.iconWrapper}>
        <img className={styles.icon} src={icon} />
      </div>
      <div>
        <p className={styles.text}>{text}</p>
        <p className={styles.number}>{number}</p>
      </div>
    </Card>
  );
};

export default StatsCard;
