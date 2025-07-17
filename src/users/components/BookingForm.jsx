import { useState, useEffect, useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BookingContext } from "../../context/BookingContext";
import { RoomContext } from "../../context/RoomContext";
// import { toast } from "react-toastify"; // Uncomment if using react-toastify

function BookingForm() {
  const { user } = useContext(AuthContext);
  const { createBooking, bookingsLoading, bookingsError, clearBookingError } =
    useContext(BookingContext);
  const { rooms, fetchRooms, roomsLoading, roomsError } =
    useContext(RoomContext);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const preSelectedRoomId = queryParams.get("roomId") || "";

  const [formData, setFormData] = useState({
    roomId: preSelectedRoomId,
    name: "",
    email: "",
    checkInDate: "",
    checkOutDate: "",
  });

  // Sync formData with user and preSelectedRoomId
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      roomId: preSelectedRoomId,
      name: user?.name || prev.name,
      email: user?.email || prev.email,
    }));
  }, [user, preSelectedRoomId]);

  // Fetch rooms only once on mount
  useEffect(() => {
    fetchRooms();
    return () => {
      clearBookingError();
    };
  }, [fetchRooms, clearBookingError]);

  // Memoize available rooms to prevent re-renders
  const availableRooms = useMemo(
    () => rooms.filter((room) => room.status === "available"),
    [rooms]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate dates
    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(checkIn) || isNaN(checkOut)) {
      // toast.error("Invalid date format.");
      alert("Invalid date format.");
      return;
    }
    if (checkIn < today) {
      // toast.error("Check-in date cannot be in the past.");
      alert("Check-in date cannot be in the past.");
      return;
    }
    if (checkIn >= checkOut) {
      // toast.error("Check-out date must be after check-in date.");
      alert("Check-out date must be after check-in date.");
      return;
    }

    const success = await createBooking(formData);
    if (success) {
      setFormData({
        roomId: "",
        name: user?.name || "",
        email: user?.email || "",
        checkInDate: "",
        checkOutDate: "",
      });
      // toast.success("Booking created successfully!");
      navigate("/user/bookings");
    }
  };

  return (
    <div>
      <h3>Create Booking</h3>
      {(bookingsError || roomsError) && (
        <p style={{ color: "red" }}>{bookingsError || roomsError}</p>
      )}
      <form onSubmit={handleSubmit}>
        {roomsLoading ? (
          <p>Loading rooms...</p>
        ) : (
          <select
            value={formData.roomId}
            onChange={(e) =>
              setFormData({ ...formData, roomId: e.target.value })
            }
            required
            disabled={bookingsLoading}
          >
            <option value="">Select Room</option>
            {availableRooms.map((room) => (
              <option key={room._id} value={room._id}>
                {room.name} (#{room.number})
              </option>
            ))}
          </select>
        )}

        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value.trim() })
          }
          required
          disabled={bookingsLoading}
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value.trim() })
          }
          required
          disabled={bookingsLoading}
        />

        <input
          type="date"
          placeholder="Check-In Date"
          value={formData.checkInDate}
          onChange={(e) =>
            setFormData({ ...formData, checkInDate: e.target.value })
          }
          required
          disabled={bookingsLoading}
        />

        <input
          type="date"
          placeholder="Check-Out Date"
          value={formData.checkOutDate}
          onChange={(e) =>
            setFormData({ ...formData, checkOutDate: e.target.value })
          }
          required
          disabled={bookingsLoading}
        />

        <button type="submit" disabled={bookingsLoading || roomsLoading}>
          {bookingsLoading ? "Booking..." : "Book Room"}
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
