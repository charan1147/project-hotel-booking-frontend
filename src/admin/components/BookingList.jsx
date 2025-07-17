import { useEffect, useContext, useMemo, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import { BookingContext } from "../../context/BookingContext";
import { toast } from "react-toastify";

function BookingList({ isAdmin = false }) {
  const { user, initialized } = useContext(AuthContext);
  const {
    bookings,
    bookingsLoading,
    bookingsError,
    fetchBookings,
    fetchMyBookings,
    confirmBooking,
    cancelBooking,
    clearBookingError,
  } = useContext(BookingContext);

  const handleFetch = useCallback(async () => {
    try {
      if (!initialized) return;
      if (isAdmin && user?.role === "admin") {
        console.log("Fetching all bookings...");
        await fetchBookings();
      } else {
        console.log("Fetching user bookings...");
        await fetchMyBookings();
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error(err.response?.data?.message || "Failed to fetch bookings");
    }
  }, [isAdmin, user, initialized, fetchBookings, fetchMyBookings]);

  useEffect(() => {
    handleFetch();
    return () => clearBookingError();
  }, [handleFetch, clearBookingError]);

  const handleConfirmBooking = useCallback(
    async (id) => {
      try {
        await confirmBooking(id);
        toast.success("Booking confirmed successfully");
      } catch (err) {
        console.error("Confirm booking error:", err);
        toast.error(err.response?.data?.message || "Failed to confirm booking");
      }
    },
    [confirmBooking]
  );

  const handleCancelBooking = useCallback(
    async (id) => {
      try {
        await cancelBooking(id);
        toast.success("Booking canceled successfully");
      } catch (err) {
        console.error("Cancel booking error:", err);
        toast.error(err.response?.data?.message || "Failed to cancel booking");
      }
    },
    [cancelBooking]
  );

  const bookingItems = useMemo(
    () =>
      bookings.map((booking) => (
        <div
          key={booking._id}
          style={{
            marginBottom: "10px",
            padding: "10px",
            border: "1px solid #ddd",
          }}
          className="booking-item"
        >
          <p>
            <strong>Room:</strong> {booking.roomId?.name || "Unknown"}
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
          {isAdmin && !booking.confirmed && (
            <button
              onClick={() => handleConfirmBooking(booking._id)}
              disabled={bookingsLoading}
              style={{ marginRight: "5px" }}
            >
              Confirm
            </button>
          )}
          <button
            onClick={() => handleCancelBooking(booking._id)}
            disabled={bookingsLoading}
          >
            Cancel
          </button>
        </div>
      )),
    [
      bookings,
      bookingsLoading,
      isAdmin,
      handleConfirmBooking,
      handleCancelBooking,
    ]
  );

  if (!initialized || bookingsLoading)
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (bookingsError)
    return <p style={{ color: "red", textAlign: "center" }}>{bookingsError}</p>;

  return (
    <div>
      <h2>{isAdmin ? "All Bookings" : "My Bookings"}</h2>
      {bookings.length === 0 ? <p>No bookings found.</p> : bookingItems}
    </div>
  );
}

export default BookingList;
