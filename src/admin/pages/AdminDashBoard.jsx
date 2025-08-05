import { useEffect, useContext, Suspense } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function AdminDashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated, initialized, logoutUser } =
    useContext(AuthContext);

  if (!initialized) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <span className="ms-3 text-muted">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
        <span className="fw-bold">Welcome, {user?.name} (Admin)</span>
        <Link
          to="/admin/dashboard/bookings"
          className="btn btn-outline-primary"
        >
          Bookings
        </Link>
        <Link to="/admin/dashboard/rooms" className="btn btn-outline-secondary">
          Manage Rooms
        </Link>
        <button onClick={handleLogout} className="btn btn-outline-danger">
          Logout
        </button>
      </div>
      <section className="mb-5">
        <h2 className="text-2xl font-bold mb-3">Facility Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-lg overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1611892440504-42a792e24d32"
              alt="Luxury Room"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">Luxury Suite</h3>
              <p className="text-gray-600">
                Monitor availability and pricing for premium suites.
              </p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1578683014728-c73504a285f9"
              alt="Conference Room"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">Conference Room</h3>
              <p className="text-gray-600">
                Manage bookings for business events.
              </p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
              alt="Lounge Area"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">Lounge Area</h3>
              <p className="text-gray-600">
                Oversee maintenance and guest access.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="text-2xl font-bold mb-3">Recent Guest Feedback</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">★★★★★</div>
              <span className="ml-2 font-semibold">John D.</span>
            </div>
            <p className="text-gray-600">
              "The booking system was seamless, and the staff handled our
              requests promptly."
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">★★★★☆</div>
              <span className="ml-2 font-semibold">Sarah M.</span>
            </div>
            <p className="text-gray-600">
              "Great experience overall, but could use more frequent updates on
              room availability."
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">★★★★★</div>
              <span className="ml-2 font-semibold">Emily R.</span>
            </div>
            <p className="text-gray-600">
              "The admin portal made managing our group booking so easy.
              Excellent service!"
            </p>
          </div>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="d-flex justify-content-center align-items-center py-5">
            <div className="spinner-border text-secondary" role="status" />
            <span className="ms-3 text-muted">Loading content...</span>
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </div>
  );
}

export default AdminDashboard;
