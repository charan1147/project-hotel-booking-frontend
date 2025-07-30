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
