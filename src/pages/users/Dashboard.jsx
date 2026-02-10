import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";

function UserDashboard() {
  const { user, logout } = useContext(AppContext);

  return (
    <div className="container py-5">
      <h1>Welcome, {user?.name}!</h1>
      <div className="d-flex gap-3 mt-4">
        <Link to="/user/rooms" className="btn btn-primary">
          View Rooms
        </Link>
        <Link to="/user/book-room" className="btn btn-success">
          Book Room
        </Link>
        <Link to="/user/bookings" className="btn btn-info">
          My Bookings
        </Link>
        <button onClick={logout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserDashboard;
