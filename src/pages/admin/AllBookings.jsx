import { useEffect, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import BookingCard from "../../components/BookingCard";

function AllBookings() {
  const { allBookings, fetchAllBookings, confirmBooking, cancelBooking } =
    useContext(AppContext);

  useEffect(() => {
    fetchAllBookings();
  }, []);

  return (
    <div className="container py-4">
      <h2>All Bookings</h2>
      {allBookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        allBookings.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            onCancel={() => cancelBooking(booking._id)}
            onConfirm={() => confirmBooking(booking._id)}
            isAdmin
          />
        ))
      )}
    </div>
  );
}

export default AllBookings;
