import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"; 

function UserDashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-md-4 mb-3">
          <img
            src="https://images.unsplash.com/photo-1578683015146-b644c1c9c678?w=800&auto=format&fit=crop"
            alt="Luxury hotel room"
            className="img-fluid rounded shadow"
            style={{ height: "220px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-4 mb-3">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop"
            alt="Modern hotel lounge"
            className="img-fluid rounded shadow"
            style={{ height: "220px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-4 mb-3">
          <img
            src="https://images.unsplash.com/photo-1549638441-b787d2e11f14?w=800&auto=format&fit=crop"
            alt="Hotel exterior & pool"
            className="img-fluid rounded shadow"
            style={{ height: "220px", objectFit: "cover" }}
          />
        </div>
      </div>

      <h1 className="text-center mb-4">Welcome, {user?.name || "Guest"}!</h1>

      <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
        <Link to="/user/rooms" className="btn btn-primary btn-lg px-4">
          View Rooms
        </Link>
        <Link to="/user/book-room" className="btn btn-success btn-lg px-4">
          Book Room
        </Link>
        <Link to="/user/bookings" className="btn btn-info btn-lg px-4">
          My Bookings
        </Link>
        <button onClick={logout} className="btn btn-danger btn-lg px-4">
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserDashboard;
