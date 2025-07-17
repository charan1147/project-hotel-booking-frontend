import { createContext, useState, useCallback } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingsError, setBookingsError] = useState(null);

  const fetchBookings = useCallback(async () => {
    try {
      setBookingsLoading(true);
      const res = await api.get("/api/booking");
      setBookings(res.data.data || res.data);
      setBookingsError(null);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to fetch bookings";
      setBookingsError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setBookingsLoading(false);
    }
  }, []);

  const fetchMyBookings = useCallback(async () => {
    try {
      setBookingsLoading(true);
      const res = await api.get("/api/booking/mybookings");
      setBookings(res.data.data || res.data);
      setBookingsError(null);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to fetch your bookings";
      setBookingsError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setBookingsLoading(false);
    }
  }, []);

  const fetchBooking = useCallback(async (id) => {
    try {
      setBookingsLoading(true);
      const res = await api.get(`/api/booking/${id}`);
      setCurrentBooking(res.data.data || res.data);
      setBookingsError(null);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to fetch booking";
      setBookingsError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setBookingsLoading(false);
    }
  }, []);

  const createBooking = useCallback(async (data) => {
    try {
      setBookingsLoading(true);
      const res = await api.post("/api/booking/create", data);
      setBookings((prev) => [...prev, res.data.data || res.data]);
      setBookingsError(null);
      toast.success("Booking created successfully");
      return true;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to create booking";
      setBookingsError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setBookingsLoading(false);
    }
  }, []);

  const updateBooking = useCallback(async (id, data) => {
    try {
      setBookingsLoading(true);
      const res = await api.put(`/api/booking/${id}`, data);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? res.data.data || res.data : b))
      );
      setBookingsError(null);
      toast.success("Booking updated successfully");
      return true;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to update booking";
      setBookingsError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setBookingsLoading(false);
    }
  }, []);

  const deleteBooking = useCallback(async (id) => {
    try {
      setBookingsLoading(true);
      await api.delete(`/api/booking/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      setBookingsError(null);
      toast.success("Booking deleted successfully");
      return true;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to delete booking";
      setBookingsError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setBookingsLoading(false);
    }
  }, []);

  const confirmBooking = useCallback(async (id) => {
    try {
      setBookingsLoading(true);
      await api.put(`/api/booking/confirm/${id}`);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, confirmed: true } : b))
      );
      setBookingsError(null);
      toast.success("Booking confirmed successfully");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to confirm booking";
      setBookingsError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setBookingsLoading(false);
    }
  }, []);

  const cancelBooking = useCallback(async (id) => {
    try {
      setBookingsLoading(true);
      await api.delete(`/api/booking/cancel/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      setBookingsError(null);
      toast.success("Booking canceled successfully");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to cancel booking";
      setBookingsError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setBookingsLoading(false);
    }
  }, []);

  const clearBookingError = useCallback(() => {
    setBookingsError(null);
  }, []);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        currentBooking,
        bookingsLoading,
        bookingsError,
        fetchBookings,
        fetchMyBookings,
        fetchBooking,
        createBooking,
        updateBooking,
        deleteBooking,
        confirmBooking,
        cancelBooking,
        clearBookingError,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
   