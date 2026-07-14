import UserInfoCard from "./UserInfoCard/UserInfoCard";
import BookingsList from "./BookingsList/BookingsList";

import styles from "./Profile.module.scss";

const bookings: Booking[] = [
  {
    id: 1,
    title: "Мужская стрижка",
    date: "2026-07-16",
    time: "10:00",
    duration: 45,
    price: 1200,
    status: "confirmed",
  },
  {
    id: 2,
    title: "Оформление бороды",
    date: "2026-07-18",
    time: "14:30",
    duration: 30,
    price: 800,
    status: "new",
  },
  {
    id: 3,
    title: "Стрижка + борода",
    date: "2026-07-10",
    time: "12:00",
    duration: 60,
    price: 1800,
    status: "completed",
  },
  {
    id: 4,
    title: "Королевское бритьё",
    date: "2026-07-20",
    time: "17:00",
    duration: 40,
    price: 1000,
    status: "cancelled",
  },
  {
    id: 5,
    title: "Детская стрижка",
    date: "2026-07-22",
    time: "11:30",
    duration: 30,
    price: 900,
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

      <h2>Мои записи</h2>
      <BookingsList bookings={bookings} />
      <div></div>
    </div>
  );
};

export default Profile;
