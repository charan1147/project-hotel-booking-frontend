import { createContext, useState, useCallback } from "react";
import api from "../api/axios";
// import { toast } from "react-toastify";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(false);
  const [roomsError, setRoomsError] = useState(null);

  // Fetch all rooms with memoized callback
  const fetchRooms = useCallback(async () => {
    if (rooms.length > 0) return; // Skip fetch if rooms already loaded
    try {
      console.log("Fetching rooms...");
      setRoomsLoading(true);
      setRoomsError(null);
      const res = await api.get("/api/rooms");
      setRooms(res.data.data || []);
    } catch (err) {
      console.error("Room fetch failed:", err);
      setRoomsError(err.response?.data?.message || "Failed to fetch rooms");
      // toast.error(err.response?.data?.message || "Failed to fetch rooms");
    } finally {
      setRoomsLoading(false);
    }
  }, [rooms.length]);

  // Create a new room
  const createRoom = async (roomData) => {
    try {
      setRoomsLoading(true);
      setRoomsError(null);
      const res = await api.post("/api/rooms/create", roomData);
      setRooms((prev) => [...prev, res.data.data]);
      // toast.success("Room created successfully");
      return true;
    } catch (err) {
      console.error("Room creation failed:", err);
      setRoomsError(err.response?.data?.message || "Failed to create room");
      // toast.error(err.response?.data?.message || "Failed to create room");
      return false;
    } finally {
      setRoomsLoading(false);
    }
  };

  // Update a room by ID
  const updateRoom = async (id, updatedData) => {
    try {
      setRoomsLoading(true);
      setRoomsError(null);
      const res = await api.put(`/api/rooms/${id}`, updatedData);
      setRooms((prev) =>
        prev.map((room) => (room._id === id ? res.data.data : room))
      );
      // toast.success("Room updated successfully");
      return true;
    } catch (err) {
      console.error("Room update failed:", err);
      setRoomsError(err.response?.data?.message || "Failed to update room");
      // toast.error(err.response?.data?.message || "Failed to update room");
      return false;
    } finally {
      setRoomsLoading(false);
    }
  };

  // Delete a room by ID
  const deleteRoom = async (id) => {
    try {
      setRoomsLoading(true);
      setRoomsError(null);
      await api.delete(`/api/rooms/${id}`);
      setRooms((prev) => prev.filter((room) => room._id !== id));
      // toast.success("Room deleted successfully");
      return true;
    } catch (err) {
      console.error("Room deletion failed:", err);
      setRoomsError(err.response?.data?.message || "Failed to delete room");
      // toast.error(err.response?.data?.message || "Failed to delete room");
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
