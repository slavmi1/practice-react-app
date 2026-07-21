import styles from "./Badge.module.scss";
import successIcon from "../../../assets/icons/confirmed.svg";
import cancelledIcon from "../../../assets/icons/cancelled.svg";
import newIcon from "../../../assets/icons/new.svg";

type BadgeType = "confirmed" | "new" | "completed" | "cancelled";

type BadgeProps = {
  type: BadgeType;
};

type BadgeConfigItem = {
  label: string;
  icon: string;
};

const badgeConfig: Record<BadgeType, BadgeConfigItem> = {
  confirmed: {
    label: "Подтверждена",
    icon: successIcon,
  },
  new: {
    label: "Новая",
    icon: newIcon,
  },
  completed: {
    label: "Завершена",
    icon: successIcon,
  },
  cancelled: {
    label: "Отменена",
    icon: cancelledIcon,
  },
};

const Badge = (props: BadgeProps) => {
  const { type } = props;
  const badge = badgeConfig[type];

  return (
    <span className={`${styles.badge} ${styles[type]}`}>
      <span className={styles.icon_wrapper}>
        <img
          className={styles.badge_icon}
          src={badge.icon}
          alt=""
          aria-hidden="true"
        />
      </span>
      <span>{badge.label}</span>
    </span>
  );
};

export default Badge;
