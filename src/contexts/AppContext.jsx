import { createContext, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [allBookings, setAllBookings] = useState([]);

  const fetchRooms = async () => {
    try {
      const res = await api.get("/api/rooms");
      setRooms(res.data || []);
    } catch {
      toast.error("Failed to load rooms");
    }
  };

  const createRoom = async (data) => {
    try {
      const res = await api.post("/api/rooms/create", data);
      setRooms((prev) => [...prev, res.data]);
      toast.success("Room added");
    } catch {
      toast.error("Failed to add room");
    }
  };

  const deleteRoom = async (id) => {
    try {
      await api.delete(`/api/rooms/${id}`);
      setRooms((prev) => prev.filter((r) => r._id !== id));
      toast.success("Room deleted");
    } catch {
      toast.error("Failed to delete room");
    }
  };

  const fetchMyBookings = async () => {
    try {
      const res = await api.get("/api/booking/my-bookings");
      setMyBookings(res.data || []);
    } catch {
      toast.error("Failed to load your bookings");
    }
  };

  const fetchAllBookings = async () => {
    try {
      const res = await api.get("/api/booking/");
      setAllBookings(res.data || []);
    } catch {
      toast.error("Failed to load bookings");
    }
  };

  const createBooking = async (data) => {
    try {
      const res = await api.post("/api/booking/create", data);
      setMyBookings((prev) => [...prev, res.data]);
      toast.success("Booking created");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to book");
      return false;
    }
  };

  const cancelBooking = async (id) => {
    try {
      await api.delete(`/api/booking/${id}`);
      setMyBookings((prev) => prev.filter((b) => b._id !== id));
      setAllBookings((prev) => prev.filter((b) => b._id !== id));
      toast.success("Booking cancelled");
    } catch {
      toast.error("Failed to cancel");
    }
  };

  const confirmBooking = async (id) => {
    try {
      const res = await api.put(`/api/booking/confirm/${id}`);
      setAllBookings((prev) => prev.map((b) => (b._id === id ? res.data : b)));
      toast.success("Booking confirmed");
    } catch {
      toast.error("Failed to confirm");
    }
  };

  return (
    <AppContext.Provider
      value={{
        rooms,
        fetchRooms,
        createRoom,
        deleteRoom,
        myBookings,
        fetchMyBookings,
        allBookings,
        fetchAllBookings,
        createBooking,
        cancelBooking,
        confirmBooking,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
