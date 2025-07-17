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
    <div>
      <h3>Add New Room</h3>
      {roomsError && <p>{roomsError}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Room Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
          min="1"
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Room Number"
          value={formData.number}
          onChange={(e) => setFormData({ ...formData, number: e.target.value })}
          required
          min="1"
        />
        <button type="submit" disabled={roomsLoading}>
          {roomsLoading ? "Adding Room..." : "Add Room"}
        </button>
      </form>
    </div>
  );
}

export default RoomForm;
