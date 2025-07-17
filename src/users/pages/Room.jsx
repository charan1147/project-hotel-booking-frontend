import { useEffect, useContext } from "react";
import { RoomContext } from "../../context/RoomContext";
import RoomCard from "../components/RoomCard";

function Rooms() {
  const { rooms, loading, error, fetchRooms, clearRoomError } =
    useContext(RoomContext);

  useEffect(() => {
    fetchRooms(); 

    return () => {
      clearRoomError(); 
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Available Rooms</h2>
      {rooms.length === 0 ? (
        <p>No rooms found.</p>
      ) : (
        rooms.map((room) => <RoomCard key={room._id} room={room} />)
      )}
    </div>
  );
}

export default Rooms;
