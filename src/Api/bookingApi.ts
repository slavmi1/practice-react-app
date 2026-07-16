import type { Booking, CreateBookingData } from "../Types/booking";
import api from "./api";

export const getBookings = async (): Promise<Booking[]> => {
  const response = await api.get<Booking[]>("/bookings");

  return response.data;
};

export const createBooking = async (
  data: CreateBookingData,
): Promise<Booking> => {
  const response = await api.post<Booking>("/bookings", data);

  return response.data;
};

export const cancelBooking = async (bookingId: string): Promise<Booking> => {
  const response = await api.patch<Booking>(`/bookings/${bookingId}/cancel`);

  return response.data;
};
