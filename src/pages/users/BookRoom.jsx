import { useState, useContext, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";

function BookRoom() {
  const { rooms, fetchRooms, createBooking } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    roomId: searchParams.get("roomId") || "",
    checkIn: "",
    checkOut: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createBooking(form);
    if (success) navigate("/user/bookings");
  };

  return (
    <div className="container py-4">
      <h2>Book a Room</h2>
      <form onSubmit={handleSubmit}>
        <select
          className="form-select mb-3"
          value={form.roomId}
          onChange={(e) => setForm({ ...form, roomId: e.target.value })}
          required
        >
          <option value="">Select Room</option>
          {rooms.map((r) => (
            <option key={r._id} value={r._id}>
              {r.name} - ${r.price}
            </option>
          ))}
        </select>
        <input
          type="date"
          className="form-control mb-3"
          value={form.checkIn}
          onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
          required
        />
        <input
          type="date"
          className="form-control mb-3"
          value={form.checkOut}
          onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Name"
          className="form-control mb-3"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-3"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <button type="submit" className="btn btn-success">
          Book Now
        </button>
      </form>
    </div>
  );
}

export default BookRoom;
