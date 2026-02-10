import { useEffect, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import BookingCard from "../../components/BookingCard";

function MyBookings() {
  const { myBookings, fetchMyBookings, cancelBooking } = useContext(AppContext);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  return (
    <div className="container py-4">
      <h2>My Bookings</h2>
      {myBookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        myBookings.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            onCancel={cancelBooking}
          />
        ))
      )}
    </div>
  );
}

export default MyBookings;
