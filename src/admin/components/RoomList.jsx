import { useContext, useEffect } from "react";
import { RoomContext } from "../../context/RoomContext";

const RoomList = () => {
  const { rooms, fetchRooms, deleteRoom, roomsLoading } =
    useContext(RoomContext);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  if (roomsLoading) return <p>Loading...</p>;

  return (
    <div>
      <h3>Room List</h3>
      <ul>
        {rooms.map((room) => (
          <li key={room._id}>
            {room.name} - {room.type} - ₹{room.price} - Capacity:{" "}
            {room.capacity}
            <button onClick={() => deleteRoom(room._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
