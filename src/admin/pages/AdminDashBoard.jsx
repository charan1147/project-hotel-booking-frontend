import { useEffect, useContext, Suspense } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function AdminDashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated, initialized, logoutUser } =
    useContext(AuthContext);

if (!initialized) {
  return <p style={{ textAlign: "center" }}>Loading...</p>;
}


  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (!initialized) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  return (
    <div>
      <div
        style={{ marginBottom: "20px", display: "flex", gap: "10px" }}
        className="dashboard-nav"
      >
        <span>Welcome, {user?.name} (Admin)</span>
        <Link to="/admin/dashboard/bookings">Bookings</Link>
        <Link to="/admin/dashboard/rooms">Manage Rooms</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Suspense
        fallback={<p style={{ textAlign: "center" }}>Loading content...</p>}
      >
        <Outlet />
      </Suspense>
    </div>
  );
}

export default AdminDashboard;
