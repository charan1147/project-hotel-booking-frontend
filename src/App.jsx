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

import ProtectedRoute from "./components/ProtectedRoutes";

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
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/rooms"
              element={
                <ProtectedRoute>
                  <Rooms />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/book-room"
              element={
                <ProtectedRoute>
                  <BookRoom />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/bookings"
              element={
                <ProtectedRoute>
                  <MyBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/rooms"
              element={
                <ProtectedRoute adminOnly>
                  <ManageRooms />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/bookings"
              element={
                <ProtectedRoute adminOnly>
                  <AllBookings />
                </ProtectedRoute>
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
