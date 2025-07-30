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

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <span className="ms-3 text-muted">Loading bookings...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Your Bookings</h2>
      {bookings.length === 0 ? (
        <div className="alert alert-warning text-center" role="alert">
          No bookings found.
        </div>
      ) : (
        <div className="row">
          {bookings.map((booking) => (
            <div key={booking._id} className="col-md-6 mb-4">
              <div className="card h-100">
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
                    {booking.confirmed ? "Yes" : "No"}
                  </p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(booking._id)}
                    disabled={loading}
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserBookings;
