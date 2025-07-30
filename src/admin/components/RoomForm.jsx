import { useState, useContext } from "react";
import { RoomContext } from "../../context/RoomContext";

function RoomForm() {
  const { createRoom, fetchRooms, clearRoomError, roomsLoading, roomsError } =
    useContext(RoomContext);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    number: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const price = Number(formData.price);
    const number = Number(formData.number);
    if (price <= 0 || number <= 0) {
      alert("Price and Room Number must be positive numbers.");
      return;
    }

    const success = await createRoom(formData);
    if (success) {
      await fetchRooms();
      setFormData({ name: "", price: "", description: "", number: "" });
    }

    clearRoomError();
  };

  return (
    <div className="mb-4">
      <h3 className="mb-3">Add New Room</h3>

      {roomsError && (
        <div className="alert alert-danger" role="alert">
          {roomsError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Room Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="col-md-6">
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
            min="1"
          />
        </div>

        <div className="col-md-12">
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </div>

        <div className="col-md-6">
          <input
            type="number"
            className="form-control"
            placeholder="Room Number"
            value={formData.number}
            onChange={(e) =>
              setFormData({ ...formData, number: e.target.value })
            }
            required
            min="1"
          />
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-success"
            disabled={roomsLoading}
          >
            {roomsLoading ? "Adding Room..." : "Add Room"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RoomForm;
