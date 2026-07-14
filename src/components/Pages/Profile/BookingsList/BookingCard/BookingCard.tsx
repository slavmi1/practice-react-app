import Badge from "../../../../UI/Badge/Badge";
import Button from "../../../../UI/Button/Button";
import Card from "../../../../UI/Card/Card";

import type { Booking } from "../../types";
import styles from "./BookingCard.module.scss";

type BookingCardProps = {
  booking: Booking;
};

const BookingCard = ({ booking }: BookingCardProps) => {
  return (
    <Card className={styles.bookingCard}>
      <div className={styles.cardPart}>
        <p className={styles.title}>{booking.title}</p>
      </div>

      <div className={styles.cardPart}>
        <p className={styles.param}>Дата</p>
        <p className={styles.value}>{booking.date}</p>
      </div>

      <div className={styles.cardPart}>
        <p className={styles.param}>Время</p>
        <p className={styles.value}>{booking.time}</p>
      </div>

      <div className={styles.cardPart}>
        <p className={styles.param}>Длительность</p>
        <p className={styles.value}>{booking.duration} мин</p>
      </div>

      <div className={styles.cardPart}>
        <p className={styles.param}>Стоимость</p>
        <p className={styles.value}>{booking.price} ₽</p>
      </div>

      <div className={styles.cardPart}>
        <Badge type={booking.status} />

        {(booking.status === "confirmed" || booking.status === "new") && (
          <Button className={styles.button}>Отменить запись</Button>
        )}
      </div>
    </Card>
  );
};

export default BookingCard;
