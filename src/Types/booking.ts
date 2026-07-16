export type Booking = {
  _id: string;
  userId: string;
  serviceId: string;
  date: string;
  time: string;
  status: "confirmed" | "new" | "completed" | "cancelled";
};

export type BookingView = Booking & {
  title: string;
  duration: number;
  price: number;
};

export type CreateBookingData = {
  serviceId: string;
  date: string;
  time: string;
};
