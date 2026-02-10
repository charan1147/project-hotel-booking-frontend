function BookingCard({ booking, onCancel, onConfirm, isAdmin }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5>{booking.roomId?.name || "Room"}</h5>
        <p>
          <strong>Check-in:</strong>{" "}
          {new Date(booking.checkIn).toLocaleDateString()}
          <br />
          <strong>Check-out:</strong>{" "}
          {new Date(booking.checkOut).toLocaleDateString()}
          <br />
          <strong>Status:</strong> {booking.confirmed ? "Confirmed" : "Pending"}
        </p>
        <div className="d-flex gap-2">
          {!booking.confirmed && onCancel && (
            <button
              className="btn btn-outline-danger"
              onClick={() => onCancel(booking._id)}
            >
              Cancel
            </button>
          )}
          {isAdmin && !booking.confirmed && onConfirm && (
            <button
              className="btn btn-outline-success"
              onClick={() => onConfirm(booking._id)}
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingCard;
