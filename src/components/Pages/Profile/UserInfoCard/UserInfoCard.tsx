import Card from "../../../UI/Card/Card";
import StatsCard from "./StatsCard/StatsCard";

import styles from "./UserInfoCard.module.scss";

import avatar from "../../../../assets/images/avatar.png";
import calendar from "../../../../assets/icons/calendar_light.svg";
import clock from "../../../../assets/icons/clock_light.svg";
import completed from "../../../../assets/icons/completed.svg";
import phone from "../../../../assets/icons/phone.svg";
import email from "../../../../assets/icons/email.svg";

const UserInfoCard = () => {
  return (
    <Card className={styles.userInfoCard}>
      <img src={avatar} className={styles.avatar} />

      <div className={styles.userInfo}>
        <p className={styles.name}>Алексей Петров</p>
        <div className={styles.contact}>
          <img src={phone} />
          <p> +7(996) 461-32-12</p>
        </div>
        <div className={styles.contact}>
          <img src={email} />
          <p>alex@example.com</p>
        </div>
      </div>

      <div className={styles.statsContainer}>
        <StatsCard icon={calendar} text="Всего записей" number={4} />
        <StatsCard icon={clock} text="Предстоящих" number={2} />
        <StatsCard icon={completed} text="Завершенных" number={1} />
      </div>
    </Card>
  );
};

export default UserInfoCard;
