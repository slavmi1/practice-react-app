import UserInfoCard from "./UserInfoCard/UserInfoCard";
import BookingsList from "./BookingsList/BookingsList";

import styles from "./Profile.module.scss";
import type { BookingView } from "../../../Types/booking";
import { useAuth } from "../../../Context/AuthContext/useAuth";
import { useEffect, useState } from "react";
import { cancelBooking, getBookings } from "../../../Api/bookingApi";
import { getServices } from "../../../Api/servicesApi";

const Profile = () => {
  const [bookings, setBookings] = useState<BookingView[]>([]);

  const [cancelError, setCancelError] = useState("");

  const { user } = useAuth();

  const totalBookings = bookings.length;

  const upcomimgBookings = bookings.filter(
    (booking) => booking.status === "new" || booking.status === "confirmed",
  ).length;

  const completedBookings = bookings.filter(
    (booking) => booking.status === "completed",
  ).length;

  const handleCancelBooking = async (bookingId: string) => {
    setCancelError("");

    try {
      const updatedBooking = await cancelBooking(bookingId);

      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking._id === updatedBooking._id
            ? {
                ...booking,
                status: updatedBooking.status,
              }
            : booking,
        ),
      );
    } catch {
      setCancelError("Не удалось отменить запись");
    }
  };

  useEffect(() => {
    const loadBookings = async () => {
      const [bookingsData, servicesData] = await Promise.all([
        getBookings(),
        getServices(),
      ]);

      const preparedBookings = bookingsData.map((booking) => {
        const service = servicesData.find(
          (service) => service._id === booking.serviceId,
        );

        return {
          ...booking,
          title: service?.title ?? "Неизвестная услуга",
          duration: service?.duration ?? 0,
          price: service?.price ?? 0,
        };
      });

      setBookings(preparedBookings);
    };

    loadBookings();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.profile}>
      <h1 className={styles.title}>Личный кабинет</h1>
      <p className={styles.underTitle}>
        Просматривайте свои записи и управляйте ими в одном месте
      </p>
      <UserInfoCard
        user={user}
        totalBookings={totalBookings}
        upcomingBookings={upcomimgBookings}
        completedBookings={completedBookings}
      />

      <h2 className={styles.myBookings}>Мои записи</h2>
      {cancelError && <p className={styles.error}>{cancelError}</p>}
      <BookingsList bookings={bookings} onCancel={handleCancelBooking} />
    </div>
  );
};

export default Profile;
