import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-md-4 mb-3">
          <img
            src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&auto=format&fit=crop"
            alt="Elegant hotel lobby"
            className="img-fluid rounded shadow"
            style={{ height: "220px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-4 mb-3">
          <img
            src="https://images.unsplash.com/photo-1611892440504-42a792a0327f?w=800&auto=format&fit=crop"
            alt="Luxury suite interior"
            className="img-fluid rounded shadow"
            style={{ height: "220px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-4 mb-3">
          <img
            src="https://images.unsplash.com/photo-1561501878-aabd62634533?w=800&auto=format&fit=crop"
            alt="Hotel rooftop view"
            className="img-fluid rounded shadow"
            style={{ height: "220px", objectFit: "cover" }}
          />
        </div>
      </div>

      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <h3 className="text-center mb-5">Welcome, {user?.name || "Admin"}!</h3>

      <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
        <Link to="/admin/rooms" className="btn btn-primary btn-lg px-4">
          Manage Rooms
        </Link>
        <Link to="/admin/bookings" className="btn btn-info btn-lg px-4">
          All Bookings
        </Link>
        <button onClick={logout} className="btn btn-danger btn-lg px-4">
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
