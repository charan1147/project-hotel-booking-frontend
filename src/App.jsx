import { useContext } from "react";
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

function App() {
  const { isAuthenticated, user, initialized } = useContext(AuthContext);

  if (!initialized) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              user?.role === "admin" ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <Navigate to="/user/dashboard" />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              user?.role === "admin" ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <Navigate to="/user/dashboard" />
              )
            ) : (
              <Register />
            )
          }
        />
        <Route
          path="/user/dashboard"
          element={
            isAuthenticated && user?.role === "user" ? (
              <UserDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/user/book-room"
          element={
            isAuthenticated && user?.role === "user" ? (
              <BookRoom />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/user/rooms"
          element={
            isAuthenticated && user?.role === "user" ? (
              <Rooms />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/user/bookings"
          element={
            isAuthenticated && user?.role === "user" ? (
              <BookingList isAdmin={false} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            isAuthenticated && user?.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route index element={<Navigate to="bookings" />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="rooms" element={<ManageRooms />} />
        </Route>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              user?.role === "admin" ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <Navigate to="/user/dashboard" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
    </Router>
  );
}

export default App;
