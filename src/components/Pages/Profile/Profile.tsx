import UserInfoCard from "./UserInfoCard/UserInfoCard";
import BookingsList from "./BookingsList/BookingsList";

import styles from "./Profile.module.scss";
import type { Booking } from "../../../Types/booking";

const bookings: Booking[] = [
  {
    _id: "1",
    userId: "1",
    serviceId: "1",
    date: "2026-07-16",
    time: "10:00",
    status: "confirmed",
  },
  {
    _id: "2",
    userId: "1",
    serviceId: "1",
    date: "2026-07-18",
    time: "14:30",
    status: "new",
  },
  {
    _id: "3",
    userId: "1",
    serviceId: "1",
    date: "2026-07-10",
    time: "12:00",
    status: "completed",
  },
  {
    _id: "4",
    userId: "1",
    serviceId: "1",
    date: "2026-07-20",
    time: "17:00",
    status: "cancelled",
  },
  {
    _id: "5",
    userId: "1",
    serviceId: "1",
    date: "2026-07-22",
    time: "11:30",
    status: "confirmed",
  },
];

const Profile = () => {
  return (
    <div className={styles.profile}>
      <h1 className={styles.title}>Личный кабинет</h1>
      <p className={styles.underTitle}>
        Просматривайте свои записи и управляйте ими в одном месте
      </p>
      <UserInfoCard />

      <h2 className={styles.myBookings}>Мои записи</h2>
      <BookingsList bookings={bookings} />
      <div></div>
    </div>
  );
};

export default Profile;
