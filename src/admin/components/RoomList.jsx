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
    <div>
      <h3>Room List</h3>

      {roomsLoading && <p>Loading rooms...</p>}
      {roomsError && <p>{roomsError}</p>}

      {!roomsLoading && !roomsError && (
        <>
          {rooms.length === 0 ? (
            <p>No rooms found.</p>
          ) : (
            rooms.map((room, index) => {
              if (!room || !room._id) return null; // Skip undefined or bad entries
              return (
                <div key={room._id || index}>
                  <p>Name: {room.name}</p>
                  <p>Number: {room.number}</p>
                  <p>Price: ${room.price}</p>
                  <p>Description: {room.description}</p>
                  <p>Status: {room.status}</p>
                  <button
                    onClick={() => handleDelete(room._id)}
                    disabled={roomsLoading}
                  >
                    Delete
                  </button>
                </div>
              );
            })
          )}
        </>
      )}
    </div>
  );
}

export default RoomList;
