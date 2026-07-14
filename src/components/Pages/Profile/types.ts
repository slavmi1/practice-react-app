export type Booking = {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: "confirmed" | "new" | "completed" | "cancelled";
};
