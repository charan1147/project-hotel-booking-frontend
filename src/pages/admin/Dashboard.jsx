import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-vh-100 bg-light">
      <div
        className="position-relative text-white text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1578683015146-b644c1c9c678?w=1920&auto=format&fit=crop&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-60"></div>

        <div className="position-relative z-1 container py-5">
          <h1 className="display-3 fw-bold mb-3">Admin Control Panel</h1>
          <h3 className="mb-5">Welcome, {user?.name || "Administrator"}!</h3>

          <div className="d-flex flex-wrap justify-content-center gap-4">
            <Link
              to="/admin/rooms"
              className="btn btn-primary btn-lg px-5 py-3"
            >
              Manage Rooms
            </Link>
            <Link
              to="/admin/bookings"
              className="btn btn-info btn-lg px-5 py-3"
            >
              All Bookings
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
        <h2 className="text-center mb-5 fw-light fs-2">
          Hotel Overview & Management
        </h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&auto=format&fit=crop&q=80"
                alt="Elegant hotel lobby & reception"
                className="card-img-top"
                style={{ height: "280px", objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1611892440504-42a792a0327f?w=800&auto=format&fit=crop&q=80"
                alt="Luxury hotel suite interior"
                className="card-img-top"
                style={{ height: "280px", objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1561501878-aabd62634533?w=800&auto=format&fit=crop&q=80"
                alt="Modern hotel building exterior"
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
