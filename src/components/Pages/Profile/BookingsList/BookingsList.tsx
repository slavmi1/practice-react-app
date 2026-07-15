import type { Booking } from "../../../../Types/booking";
import BookingCard from "./BookingCard/BookingCard";
import styles from "./BookingsList.module.scss";

type BookingsListProps = {
  bookings: Booking[];
};

const BookingsList = ({ bookings }: BookingsListProps) => {
  return (
    <div className={styles.bookingsList}>
      {bookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} />
      ))}
    </div>
  );
};

export default BookingsList;
