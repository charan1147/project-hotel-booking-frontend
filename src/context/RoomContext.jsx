import { createContext, useState, useCallback } from "react";
import api from "../api/axios";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(false);
  const [roomsError, setRoomsError] = useState(null);

  const fetchRooms = useCallback(
    async (force = false) => {
      if (!force && rooms.length > 0) return;
      try {
        setRoomsLoading(true);
        setRoomsError(null);
        const res = await api.get("/api/rooms");
        const data = Array.isArray(res?.data?.data) ? res.data.data : [];
        setRooms(data);
      } catch (err) {
        console.error("Room fetch failed:", err);
        setRoomsError(err.response?.data?.message || "Failed to fetch rooms");
      } finally {
        setRoomsLoading(false);
      }
    },
    [rooms.length]
  );

  const createRoom = async (roomData) => {
    try {
      setRoomsLoading(true);
      setRoomsError(null);
      const res = await api.post("/api/rooms/create", roomData);
      setRooms((prev) => [...prev, res.data.data]);
      return true;
    } catch (err) {
      console.error("Room creation failed:", err);
      setRoomsError(err.response?.data?.message || "Failed to create room");
      return false;
    } finally {
      setRoomsLoading(false);
    }
  };

  const updateRoom = async (id, updatedData) => {
    try {
      setRoomsLoading(true);
      setRoomsError(null);
      const res = await api.put(`/api/rooms/${id}`, updatedData);
      setRooms((prev) =>
        prev.map((room) => (room._id === id ? res.data.data : room))
      );
      return true;
    } catch (err) {
      console.error("Room update failed:", err);
      setRoomsError(err.response?.data?.message || "Failed to update room");
      return false;
    } finally {
      setRoomsLoading(false);
    }
  };

  const deleteRoom = async (id) => {
    try {
      setRoomsLoading(true);
      setRoomsError(null);
      await api.delete(`/api/rooms/${id}`);
      setRooms((prev) => prev.filter((room) => room._id !== id));
      return true;
    } catch (err) {
      console.error("Room deletion failed:", err);
      setRoomsError(err.response?.data?.message || "Failed to delete room");
      return false;
    } finally {
      setRoomsLoading(false);
    }
  };

  return (
    <RoomContext.Provider
      value={{
        rooms,
        roomsLoading,
        roomsError,
        fetchRooms,
        createRoom,
        updateRoom,
        deleteRoom,
        clearRoomError: () => setRoomsError(null),
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
