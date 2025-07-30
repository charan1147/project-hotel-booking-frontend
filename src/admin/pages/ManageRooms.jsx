import RoomForm from "../components/RoomForm";
import RoomList from "../components/RoomList";

function ManageRooms() {
  return (
    <div className="container py-4">
      <h2 className="mb-4">Manage Rooms</h2>
      <div className="mb-5">
        <RoomForm />
      </div>
      <RoomList />
    </div>
  );
}

export default ManageRooms;
