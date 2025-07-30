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

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <span className="ms-3 text-muted">Loading rooms...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Available Rooms</h2>
      {rooms.length === 0 ? (
        <div className="alert alert-warning text-center" role="alert">
          No rooms found.
        </div>
      ) : (
        <div className="row">
          {rooms.map((room) => (
            <div key={room._id} className="col-md-4 mb-4">
              <RoomCard room={room} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Rooms;
