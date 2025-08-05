import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

function UserDashboard() {
  const navigate = useNavigate();
  const { user, authLoading, authError, logoutUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (authLoading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center py-5">
        <div className="spinner-border text-primary mb-3" role="status" />
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Welcome, {user?.name}!</h1>
      {authError && <p className="text-danger">{authError}</p>}
      <div className="d-flex flex-wrap gap-3 mb-5">
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/user/rooms")}
        >
          View Rooms
        </button>
        <button
          className="btn btn-outline-success"
          onClick={() => navigate("/user/book-room")}
        >
          Book a Room
        </button>
        <button
          className="btn btn-outline-info"
          onClick={() => navigate("/user/bookings")}
        >
          My Bookings
        </button>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <section className="mb-5">
        <h2 className="text-2xl font-bold mb-3">Our Facilities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-lg overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1611892440504-42a792e24d32"
              alt="Luxury Room"
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">Luxury Suite</h3>
              <p className="text-gray-600">
                Experience comfort in our premium suites.
              </p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1578683014728-c73504a285f9"
              alt="Conference Room"
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">Conference Room</h3>
              <p className="text-gray-600">
                Perfect for business meetings and events.
              </p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
              alt="Lounge Area"
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">Lounge Area</h3>
              <p className="text-gray-600">Relax in our cozy lounge spaces.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-3">Guest Reviews</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">★★★★★</div>
              <span className="ml-2 font-semibold">John D.</span>
            </div>
            <p className="text-gray-600">
              "Amazing stay! The rooms were clean, and the staff was incredibly
              friendly. Highly recommend!"
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">★★★★☆</div>
              <span className="ml-2 font-semibold">Sarah M.</span>
            </div>
            <p className="text-gray-600">
              "Great facilities and convenient booking process. Will definitely
              come back!"
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">★★★★★</div>
              <span className="ml-2 font-semibold">Emily R.</span>
            </div>
            <p className="text-gray-600">
              "The lounge area was so relaxing, and the service was top-notch.
              Loved it!"
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserDashboard;
