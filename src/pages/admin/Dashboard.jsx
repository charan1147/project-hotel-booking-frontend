import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";

function AdminDashboard() {
  const { user, logout } = useContext(AppContext);

  return (
    <div className="container py-5">
      <h1>Welcome, Admin {user?.name}!</h1>
      <div className="d-flex gap-3 mt-4">
        <Link to="/admin/rooms" className="btn btn-primary">
          Manage Rooms
        </Link>
        <Link to="/admin/bookings" className="btn btn-info">
          All Bookings
        </Link>
        <button onClick={logout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
