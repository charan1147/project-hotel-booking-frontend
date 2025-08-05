import { useEffect, useContext, Suspense } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function AdminDashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated, initialized, logoutUser } =
    useContext(AuthContext);

  if (!initialized) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <span className="loading-text">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="container">
      <div className="header-group">
        <span className="welcome-text">Welcome, {user?.name} (Admin)</span>
        <Link to="/admin/dashboard/bookings" className="button button-primary">
          Bookings
        </Link>
        <Link to="/admin/dashboard/rooms" className="button button-secondary">
          Manage Rooms
        </Link>
        <button className="button button-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <section className="facilities-section">
        <h2 className="section-title">Facility Overview</h2>
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
                Monitor availability and pricing for premium suites.
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
                Manage bookings for business events.
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
                Oversee maintenance and guest access.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="reviews-section">
        <h2 className="section-title">Recent Guest Feedback</h2>
        <div className="review-list">
          <div className="review-card">
            <div className="review-header">
              <div className="stars">★★★★★</div>
              <span className="reviewer-name">John D.</span>
            </div>
            <p className="review-text">
              "The booking system was seamless, and the staff handled our
              requests promptly."
            </p>
          </div>
          <div className="review-card">
            <div className="review-header">
              <div className="stars">★★★★☆</div>
              <span className="reviewer-name">Sarah M.</span>
            </div>
            <p className="review-text">
              "Great experience overall, but could use more frequent updates on
              room availability."
            </p>
          </div>
          <div className="review-card">
            <div className="review-header">
              <div className="stars">★★★★★</div>
              <span className="reviewer-name">Emily R.</span>
            </div>
            <p className="review-text">
              "The admin portal made managing our group booking so easy.
              Excellent service!"
            </p>
          </div>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="loading-container">
            <div className="spinner spinner-secondary" />
            <span className="loading-text">Loading content...</span>
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </div>
  );
}

export default AdminDashboard;
