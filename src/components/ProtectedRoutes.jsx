import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useContext(AppContext);

  if (loading) return <div className="text-center py-5">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (adminOnly && user.role !== "admin")
    return <Navigate to="/user/dashboard" replace />;

  return children;
};

export default ProtectedRoute;
