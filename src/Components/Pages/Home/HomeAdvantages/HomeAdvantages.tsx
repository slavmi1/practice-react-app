import Card from "../../../UI/Card/Card";
import styles from "./HomeAdvantages.module.scss";
import mastersImg from "../../../../assets/images/mastersImg.png";
import appointmentImg from "../../../../assets/images/calendar.png";
import haircutsImg from "/service-images/mansHaircut.png";

const advantages = [
  {
    title: "Опытные мастера",
    description: "Профессионалы своего дела с вниманием к деталям и стилю.",
    img: mastersImg,
  },
  {
    title: "Удобная запись",
    description: "Выбирайте услугу, дату и время онлайн за пару минут.",
    img: appointmentImg,
  },
  {
    title: "Современные стрижки",
    description: "Актуальные тренды и стильные решения для каждого.",
    img: haircutsImg,
  },
];

const HomeAdvantages = () => {
  return (
    <div className={styles.homeAdvantages}>
      {advantages.map((advantage) => (
        <Card key={advantage.title} className={styles.card}>
          <img src={advantage.img} className={styles.img} />
          <div className={styles.rightContent}>
            <h2 className={styles.title}>{advantage.title}</h2>
            <p className={styles.text}>{advantage.description}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default HomeAdvantages;
