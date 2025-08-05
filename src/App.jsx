import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import AdminDashboard from "./admin/pages/AdminDashBoard";
import ManageRooms from "./admin/pages/ManageRooms";
import Bookings from "./admin/pages/Bookings";
import BookingList from "./admin/components/BookingList";
import UserDashboard from "./users/pages/UserDashboard";
import BookRoom from "./users/pages/BookingForm";
import Rooms from "./users/pages/Room";
import Login from "./shared/Login";
import Register from "./shared/Register";
import ProtectedRoute from "./context/ProtectedRoute";
import "./App.css"

function App() {
  const { isAuthenticated, user, initialized } = useContext(AuthContext);

  if (!initialized) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status" />
          <p className="text-muted">Initializing app...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="container py-4">
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate
                  to={
                    user?.role === "admin"
                      ? "/admin/dashboard"
                      : "/user/dashboard"
                  }
                />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate
                  to={
                    user?.role === "admin"
                      ? "/admin/dashboard"
                      : "/user/dashboard"
                  }
                />
              ) : (
                <Register />
              )
            }
          />
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute requiredRole="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/book-room"
            element={
              <ProtectedRoute requiredRole="user">
                <BookRoom />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/rooms"
            element={
              <ProtectedRoute requiredRole="user">
                <Rooms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/bookings"
            element={
              <ProtectedRoute requiredRole="user">
                <BookingList isAdmin={false} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard/bookings"
            element={
              <ProtectedRoute requiredRole="admin">
                <Bookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard/rooms"
            element={
              <ProtectedRoute requiredRole="admin">
                <ManageRooms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate
                  to={
                    user?.role === "admin"
                      ? "/admin/dashboard"
                      : "/user/dashboard"
                  }
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
