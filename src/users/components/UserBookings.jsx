import { useEffect } from "react";
import { useBooking } from "../../context/useBooking"; 

function UserBookings() {
  const {
    bookings,
    loading,
    error,
    fetchMyBookings,
    deleteBooking,
    clearBookingError,
  } = useBooking();

  useEffect(() => {
    fetchMyBookings();

    return () => {
      clearBookingError();
    };
  }, []);

  const handleDelete = async (id) => {
    const success = await deleteBooking(id);
    if (success) {
      fetchMyBookings();
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id}>
            <p>
              <strong>Room:</strong> {booking.roomId?.name || "Unknown Room"}
            </p>
            <p>
              <strong>Check-In:</strong>{" "}
              {new Date(booking.checkInDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Check-Out:</strong>{" "}
              {new Date(booking.checkOutDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Confirmed:</strong> {booking.confirmed ? "Yes" : "No"}
            </p>
            <button
              onClick={() => handleDelete(booking._id)}
              disabled={loading}
            >
              Cancel Booking
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default UserBookings;
