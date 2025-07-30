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
      <div className="d-flex flex-wrap gap-3">
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
    </div>
  );
}

export default UserDashboard;
