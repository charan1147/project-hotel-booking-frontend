import { useEffect, useContext } from "react";
import { RoomContext } from "../../context/RoomContext";

function RoomList() {
  const {
    rooms,
    roomsLoading,
    roomsError,
    fetchRooms,
    deleteRoom,
    clearRoomError,
  } = useContext(RoomContext);

  useEffect(() => {
    fetchRooms();
    return () => {
      clearRoomError();
    };
  }, []);

  const handleDelete = async (id) => {
    await deleteRoom(id);
    await fetchRooms();
  };

  return (
    <div className="mt-4">
      <h3 className="mb-3">Room List</h3>

      {roomsLoading && (
        <div className="d-flex align-items-center">
          <div className="spinner-border text-primary me-2" role="status" />
          <span className="text-muted">Loading rooms...</span>
        </div>
      )}

      {roomsError && (
        <div className="alert alert-danger" role="alert">
          {roomsError}
        </div>
      )}

      {!roomsLoading && !roomsError && (
        <>
          {rooms.length === 0 ? (
            <div className="alert alert-warning" role="alert">
              No rooms found.
            </div>
          ) : (
            <div className="row">
              {rooms.map((room, index) => {
                if (!room || !room._id) return null;
                return (
                  <div key={room._id || index} className="col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">{room.name}</h5>
                        <p className="card-text">
                          <strong>Number:</strong> {room.number}
                          <br />
                          <strong>Price:</strong> ${room.price}
                          <br />
                          <strong>Description:</strong> {room.description}
                          <br />
                          <strong>Status:</strong>{" "}
                          <span
                            className={`badge ${
                              room.status === "available"
                                ? "bg-success"
                                : "bg-secondary"
                            }`}
                          >
                            {room.status}
                          </span>
                        </p>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleDelete(room._id)}
                          disabled={roomsLoading}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default RoomList;
  