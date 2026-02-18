import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function UserDashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-vh-100 bg-light">
      <div
        className="position-relative text-white text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&auto=format&fit=crop&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
        <div className="position-relative z-1 container py-5">
          <h1 className="display-3 fw-bold mb-3">
            Welcome, {user?.name || "Guest"}!
          </h1>
          <p className="lead fs-4 mb-5 opacity-90">
            Your perfect stay is just a click away
          </p>

          <div className="d-flex flex-wrap justify-content-center gap-4">
            <Link to="/user/rooms" className="btn btn-primary btn-lg px-5 py-3">
              View Rooms
            </Link>
            <Link
              to="/user/book-room"
              className="btn btn-success btn-lg px-5 py-3"
            >
              Book Now
            </Link>
            <Link
              to="/user/bookings"
              className="btn btn-outline-light btn-lg px-5 py-3"
            >
              My Bookings
            </Link>
            <button
              onClick={logout}
              className="btn btn-outline-danger btn-lg px-5 py-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <h2 className="text-center mb-5 fw-light fs-2">Featured Stays</h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&auto=format&fit=crop&q=80"
                alt="Luxury ocean-view room"
                className="card-img-top"
                style={{ height: "280px", objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80"
                alt="Modern elegant suite"
                className="card-img-top"
                style={{ height: "280px", objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1549638441-b787d2e11f14?w=800&auto=format&fit=crop&q=80"
                alt="Hotel pool and lounge"
                className="card-img-top"
                style={{ height: "280px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
