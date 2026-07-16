import type { Booking, CreateBookingData } from "../Types/booking";
import api from "./api";

export const createBooking = async (
  data: CreateBookingData,
): Promise<Booking> => {
  const response = await api.post<Booking>("/bookings", data);

  return response.data;
};

export const getBookings = async (): Promise<Booking[]> => {
  const response = await api.get<Booking[]>("/bookings");

  return response.data;
};
