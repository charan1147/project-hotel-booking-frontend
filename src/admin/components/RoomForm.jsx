import { useContext, useState } from "react";
import { RoomContext } from "../../context/RoomContext";

const RoomForm = () => {
  const { createRoom } = useContext(RoomContext);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
    capacity: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createRoom(formData);
    if (success) {
      setFormData({ name: "", type: "", price: "", capacity: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Room Name"
        required
      />
      <input
        name="type"
        value={formData.type}
        onChange={handleChange}
        placeholder="Room Type"
        required
      />
      <input
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        type="number"
        required
      />
      <input
        name="capacity"
        value={formData.capacity}
        onChange={handleChange}
        placeholder="Capacity"
        type="number"
        required
      />
      <button type="submit">Add Room</button>
    </form>
  );
};

export default RoomForm;
