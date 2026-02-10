import { useEffect, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import RoomCard from "../../components/RoomCard";

function Rooms() {
  const { rooms, fetchRooms } = useContext(AppContext);

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="container py-4">
      <h2>Available Rooms</h2>
      <div className="row">
        {rooms.map((room) => (
          <div key={room._id} className="col-md-4 mb-4">
            <RoomCard room={room} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;
