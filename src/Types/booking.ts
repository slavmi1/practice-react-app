export type Booking = {
  _id: string;
  userId: string | null;
  serviceId: string;
  date: string;
  time: string;
  name: string;
  phone: string;
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
  name: string;
  phone: string;
};
