import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AppProvider } from "./contexts/AppContext";

import Login from "./pages/shared/Login";
import Register from "./pages/shared/Register";


import UserDashboard from "./pages/users/Dashboard";
import Rooms from "./pages/users/Rooms";
import BookRoom from "./pages/users/BookRoom";
import MyBookings from "./pages/users/MyBookings";

import AdminDashboard from "./pages/admin/Dashboard";
import ManageRooms from "./pages/admin/ManageRooms";
import AllBookings from "./pages/admin/AllBookings";


const Protected = ({ children, adminOnly = false }) => {
  return children;
};

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/user/dashboard"
              element={
                <Protected>
                  <UserDashboard />
                </Protected>
              }
            />
            <Route
              path="/user/rooms"
              element={
                <Protected>
                  <Rooms />
                </Protected>
              }
            />
            <Route
              path="/user/book-room"
              element={
                <Protected>
                  <BookRoom />
                </Protected>
              }
            />
            <Route
              path="/user/bookings"
              element={
                <Protected>
                  <MyBookings />
                </Protected>
              }
            />

            <Route
              path="/admin/dashboard"
              element={
                <Protected adminOnly>
                  <AdminDashboard />
                </Protected>
              }
            />
            <Route
              path="/admin/rooms"
              element={
                <Protected adminOnly>
                  <ManageRooms />
                </Protected>
              }
            />
            <Route
              path="/admin/bookings"
              element={
                <Protected adminOnly>
                  <AllBookings />
                </Protected>
              }
            />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
