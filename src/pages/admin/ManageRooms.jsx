import { useEffect, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import RoomCard from "../../components/RoomCard";

function ManageRooms() {
  const { rooms, fetchRooms, createRoom, deleteRoom } = useContext(AppContext);
  const [form, setForm] = useState({
    name: "",
    price: "",
    number: "",
    description: "",
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await createRoom(form);
    setForm({ name: "", price: "", number: "", description: "" });
  };

  return (
    <div className="container py-4">
      <h2>Manage Rooms</h2>

      <form onSubmit={handleCreate} className="mb-5">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="form-control mb-2"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="form-control mb-2"
          required
        />
        <input
          type="number"
          placeholder="Room Number"
          value={form.number}
          onChange={(e) => setForm({ ...form, number: e.target.value })}
          className="form-control mb-2"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-success">
          Add Room
        </button>
      </form>

      {/* Room list */}
      <div className="row">
        {rooms.map((room) => (
          <div key={room._id} className="col-md-4 mb-4">
            <RoomCard room={room} />
            <button
              className="btn btn-danger mt-2"
              onClick={() => deleteRoom(room._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageRooms;
