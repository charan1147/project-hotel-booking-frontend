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
      const { data } = await api.get("/api/rooms");
      setRooms(data);
    } catch {
      toast.error("Failed to load rooms");
    }
  };

  const fetchMyBookings = async () => {
    try {
      const { data } = await api.get("/api/booking/my-bookings");
      setMyBookings(data);
    } catch {
      toast.error("Failed to load your bookings");
    }
  };

  const fetchAllBookings = async () => {
    try {
      const { data } = await api.get("/api/booking");
      setAllBookings(data);
    } catch {
      toast.error("Failed to load all bookings");
    }
  };

  const createBooking = async (payload) => {
    try {
      const { data } = await api.post("/api/booking/create", payload);
      setMyBookings((prev) => [...prev, data]);
      toast.success("Booking created");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create booking");
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
      toast.error("Failed to cancel booking");
    }
  };

  const confirmBooking = async (id) => {
    try {
      const { data } = await api.put(`/api/booking/confirm/${id}`);
      setAllBookings((prev) => prev.map((b) => (b._id === id ? data : b)));
      toast.success("Booking confirmed");
    } catch {
      toast.error("Failed to confirm booking");
    }
  };

  // Admin room actions (optional – can be moved if not used often)
  const createRoom = async (data) => {
    try {
      const { data: newRoom } = await api.post("/api/rooms/create", data);
      setRooms((prev) => [...prev, newRoom]);
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

  return (
    <AppContext.Provider
      value={{
        rooms,
        fetchRooms,
        myBookings,
        fetchMyBookings,
        allBookings,
        fetchAllBookings,
        createBooking,
        cancelBooking,
        confirmBooking,
        createRoom,
        deleteRoom,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
