import type { BookingView } from "../../../../Types/booking";
import BookingCard from "./BookingCard/BookingCard";
import styles from "./BookingsList.module.scss";

type BookingsListProps = {
  bookings: BookingView[];
  onCancel: (bookingId: string) => void;
};

const BookingsList = ({ bookings, onCancel }: BookingsListProps) => {
  return (
    <div className={styles.bookingsList}>
      {bookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} onCancel={onCancel} />
      ))}
    </div>
  );
};

export default BookingsList;
