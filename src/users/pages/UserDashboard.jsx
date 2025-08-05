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
      <div className="loading-container">
        <div className="spinner" />
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="welcome-title">Welcome, {user?.name}!</h1>
      {authError && <p className="error-text">{authError}</p>}
      <div className="button-group">
        <button
          className="button button-primary"
          onClick={() => navigate("/user/rooms")}
        >
          View Rooms
        </button>
        <button
          className="button button-success"
          onClick={() => navigate("/user/book-room")}
        >
          Book a Room
        </button>
        <button
          className="button button-info"
          onClick={() => navigate("/user/bookings")}
        >
          My Bookings
        </button>
        <button className="button button-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <section className="facilities-section">
        <h2 className="section-title">Our Facilities</h2>
        <div className="facility-grid">
          <div className="facility-card">
            <img
              src="https://short-link.me/1a5p0"
              alt="Luxury Room"
              className="facility-image"
            />
            <div className="facility-content">
              <h3 className="facility-title">Luxury Suite</h3>
              <p className="facility-description">
                Experience comfort in our premium suites.
              </p>
            </div>
          </div>
          <div className="facility-card">
            <img
              src="https://plus.unsplash.com/premium_photo-1681487144031-d502ea9abefc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVldGluZyUyMHJvb218ZW58MHx8MHx8fDA%3D"
              alt="Conference Room"
              className="facility-image"
            />
            <div className="facility-content">
              <h3 className="facility-title">Conference Room</h3>
              <p className="facility-description">
                Perfect for business meetings and events.
              </p>
            </div>
          </div>
          <div className="facility-card">
            <img
              src="https://short-link.me/15IEe"
              alt="Lounge Area"
              className="facility-image"
            />
            <div className="facility-content">
              <h3 className="facility-title">Lounge Area</h3>
              <p className="facility-description">
                Relax in our cozy lounge spaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="reviews-section">
        <h2 className="section-title">Guest Reviews</h2>
        <div className="review-list">
          <div className="review-card">
            <div className="review-header">
              <div className="stars">★★★★★</div>
              <span className="reviewer-name">John D.</span>
            </div>
            <p className="review-text">
              "Amazing stay! The rooms were clean, and the staff was incredibly
              friendly. Highly recommend!"
            </p>
          </div>
          <div className="review-card">
            <div className="review-header">
              <div className="stars">★★★★☆</div>
              <span className="reviewer-name">Sarah M.</span>
            </div>
            <p className="review-text">
              "Great facilities and convenient booking process. Will definitely
              come back!"
            </p>
          </div>
          <div className="review-card">
            <div className="review-header">
              <div className="stars">★★★★★</div>
              <span className="reviewer-name">Emily R.</span>
            </div>
            <p className="review-text">
              "The lounge area was so relaxing, and the service was top-notch.
              Loved it!"
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserDashboard;
