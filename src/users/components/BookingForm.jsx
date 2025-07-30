import { useState, useEffect, useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BookingContext } from "../../context/BookingContext";
import { RoomContext } from "../../context/RoomContext";

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

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      roomId: preSelectedRoomId,
      name: user?.name || prev.name,
      email: user?.email || prev.email,
    }));
  }, [user, preSelectedRoomId]);

  useEffect(() => {
    fetchRooms();
    return () => {
      clearBookingError();
    };
  }, [fetchRooms, clearBookingError]);

  const availableRooms = useMemo(
    () => rooms.filter((room) => room.status === "available"),
    [rooms]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(checkIn) || isNaN(checkOut)) {
      alert("Invalid date format.");
      return;
    }
    if (checkIn < today) {
      alert("Check-in date cannot be in the past.");
      return;
    }
    if (checkIn >= checkOut) {
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
      navigate("/user/bookings");
    }
  };

  return (
    <div className="container">
      <h3 className="mb-4">Create Booking</h3>

      {(bookingsError || roomsError) && (
        <div className="alert alert-danger" role="alert">
          {bookingsError || roomsError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-12">
          {roomsLoading ? (
            <div className="d-flex align-items-center">
              <div className="spinner-border text-primary me-2" role="status" />
              <span className="text-muted">Loading rooms...</span>
            </div>
          ) : (
            <select
              className="form-select"
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
        </div>

        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value.trim() })
            }
            required
            disabled={bookingsLoading}
          />
        </div>

        <div className="col-md-6">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value.trim() })
            }
            required
            disabled={bookingsLoading}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Check-In Date</label>
          <input
            type="date"
            className="form-control"
            value={formData.checkInDate}
            onChange={(e) =>
              setFormData({ ...formData, checkInDate: e.target.value })
            }
            required
            disabled={bookingsLoading}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Check-Out Date</label>
          <input
            type="date"
            className="form-control"
            value={formData.checkOutDate}
            onChange={(e) =>
              setFormData({ ...formData, checkOutDate: e.target.value })
            }
            required
            disabled={bookingsLoading}
          />
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-success"
            disabled={bookingsLoading || roomsLoading}
          >
            {bookingsLoading ? "Booking..." : "Book Room"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;
