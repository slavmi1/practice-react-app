import type {
  Booking,
  CreateBookingData,
} from "../Components/Pages/Profile/types";
import api from "./api";

export const createBooking = async (
  data: CreateBookingData,
): Promise<Booking> => {
  const response = await api.post<Booking>("/bookings", data);

  return response.data;
};
