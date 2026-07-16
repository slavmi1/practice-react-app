import Card from "../../../UI/Card/Card";
import StatsCard from "./StatsCard/StatsCard";

import styles from "./UserInfoCard.module.scss";

import avatar from "../../../../assets/images/avatar.png";
import calendar from "../../../../assets/icons/calendar_light.svg";
import clock from "../../../../assets/icons/clock_light.svg";
import completed from "../../../../assets/icons/completed.svg";
import phone from "../../../../assets/icons/phone.svg";
import email from "../../../../assets/icons/email.svg";
import type { User } from "../../../../Types/user";

type UserInfoCardProps = {
  user: User;
  totalBookings: number;
  upcomingBookings: number;
  completedBookings: number;
};

const UserInfoCard = ({
  user,
  totalBookings,
  upcomingBookings,
  completedBookings,
}: UserInfoCardProps) => {
  return (
    <Card className={styles.userInfoCard}>
      <img src={avatar} className={styles.avatar} />

      <div className={styles.userInfo}>
        <p className={styles.name}>{user.name}</p>
        <div className={styles.contact}>
          <img src={phone} />
          <p>{user.phone}</p>
        </div>
        <div className={styles.contact}>
          <img src={email} />
          <p>{user.email}</p>
        </div>
      </div>

      <div className={styles.statsContainer}>
        <StatsCard
          icon={calendar}
          text="Всего записей"
          number={totalBookings}
        />
        <StatsCard icon={clock} text="Предстоящих" number={upcomingBookings} />
        <StatsCard
          icon={completed}
          text="Завершенных"
          number={completedBookings}
        />
      </div>
    </Card>
  );
};

export default UserInfoCard;
