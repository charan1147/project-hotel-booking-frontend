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
      <div style={{ textAlign: "center", padding: "50px" }}>
        <div
          className="spinner"
          style={
            {
              /* Add CSS for spinner */
            }
          }
        />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      {authError && <p style={{ color: "red" }}>{authError}</p>}
      <div>
        <button onClick={() => navigate("/user/rooms")}>View Rooms</button>
        <button onClick={() => navigate("/user/book-room")}>Book a Room</button>
        <button onClick={() => navigate("/user/bookings")}>My Bookings</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default UserDashboard;
