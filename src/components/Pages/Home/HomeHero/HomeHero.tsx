import Button from "../../../UI/Button/Button";
import Card from "../../../UI/Card/Card";

import styles from "./HomeHero.module.scss";
import heroImg from "../../../../assets/images/HomeHero.png";
import calenderIcon from "../../../../assets/icons/calendar_light.svg";

import { useNavigate } from "react-router";

const HomeHero = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/services");
  };

  return (
    <Card style={{ padding: 0 }} className={styles.homeHero}>
      <div className={styles.leftHalf}>
        <h1 className={styles.title}>
          Онлайн-запись <br /> в барбершоп
        </h1>
        <hr className={styles.divider} />

        <p className={styles.text}>
          Выберите услугу, удобную дату и время — <br />и запишитесь за пару
          минут.
        </p>
        <Button
          onClick={handleOnClick}
          icon={calenderIcon}
          className={styles.button}
        >
          Записаться
        </Button>
      </div>

      <div className={styles.rightHalf}>
        <img src={heroImg} className={styles.heroImg} />
      </div>
    </Card>
  );
};

export default HomeHero;
