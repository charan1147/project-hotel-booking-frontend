import { useEffect, useContext, useMemo, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import { BookingContext } from "../../context/BookingContext";
import { toast } from "react-toastify";

function Bookings() {
  const { initialized, isAuthenticated, user } = useContext(AuthContext);
  const {
    bookings,
    bookingsLoading,
    bookingsError,
    fetchBookings,
    confirmBooking,
    cancelBooking,
    clearBookingError,
  } = useContext(BookingContext);

  const handleFetchBookings = useCallback(async () => {
    try {
      if (initialized && isAuthenticated && user?.role === "admin") {
        await fetchBookings();
      }
    } catch (err) {
      console.error("Fetch bookings error:", err);
      toast.error(err.response?.data?.message || "Failed to fetch bookings");
    }
  }, [initialized, isAuthenticated, user, fetchBookings]);

  useEffect(() => {
    handleFetchBookings();
    return () => clearBookingError();
  }, [handleFetchBookings, clearBookingError]);

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
        <div key={booking._id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">
              {booking.roomId?.name || "Unknown Room"}
            </h5>
            <p className="card-text">
              <strong>Check-In:</strong>{" "}
              {new Date(booking.checkInDate).toLocaleDateString()}
              <br />
              <strong>Check-Out:</strong>{" "}
              {new Date(booking.checkOutDate).toLocaleDateString()}
              <br />
              <strong>Confirmed:</strong>{" "}
              {booking.confirmed ? (
                <span className="badge bg-success">Yes</span>
              ) : (
                <span className="badge bg-warning text-dark">No</span>
              )}
            </p>
            <div className="d-flex gap-2">
              {!booking.confirmed && (
                <button
                  className="btn btn-outline-success"
                  onClick={() => handleConfirmBooking(booking._id)}
                  disabled={bookingsLoading}
                >
                  Confirm Booking
                </button>
              )}
              <button
                className="btn btn-outline-danger"
                onClick={() => handleCancelBooking(booking._id)}
                disabled={bookingsLoading}
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )),
    [bookings, bookingsLoading, handleConfirmBooking, handleCancelBooking]
  );

  if (!initialized || bookingsLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <span className="ms-3 text-muted">Loading bookings...</span>
      </div>
    );
  }

  if (bookingsError) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {bookingsError}
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">All Bookings</h2>
      {bookings.length === 0 ? (
        <div className="alert alert-warning text-center" role="alert">
          No bookings found.
        </div>
      ) : (
        bookingItems
      )}
    </div>
  );
}

export default Bookings;
