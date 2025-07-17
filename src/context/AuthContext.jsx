import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [initialized, setInitialized] = useState(false);

  // Fetch user profile on mount to restore authentication state
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setAuthLoading(true);
        const res = await api.get("/api/user/profile");
        setUser(res.data.user);
        setIsAuthenticated(true);
        setAuthError(null);
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
        setAuthError(err.response?.data?.message || "Session expired");
      } finally {
        setAuthLoading(false);
        setInitialized(true);
      }
    };
    fetchUser();
  }, []);

  // Login user
  const loginUser = async (userData) => {
    try {
      setAuthLoading(true);
      const res = await api.post("/api/user/login", userData);
      setUser(res.data.user);
      setIsAuthenticated(true);
      setAuthError(null);
      return true;
    } catch (err) {
      setAuthError(err.response?.data?.message || "Login failed");
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  // Register user
  const registerUser = async (userData) => {
    try {
      setAuthLoading(true);
      const res = await api.post("/api/user/register", userData);
      setUser(res.data.user);
      setIsAuthenticated(true);
      setAuthError(null);
      return true;
    } catch (err) {
      setAuthError(err.response?.data?.message || "Registration failed");
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  // Logout user
  const logoutUser = async () => {
    try {
      setAuthLoading(true);
      await api.post("/api/user/logout");
    } catch (err) {
      setAuthError(err.response?.data?.message || "Logout failed");
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setAuthLoading(false);
    }
  };

  // Delete user account
  const deleteAccount = async () => {
    try {
      setAuthLoading(true);
      await api.delete("/api/user/me");
      setUser(null);
      setIsAuthenticated(false);
      setAuthError(null);
    } catch (err) {
      setAuthError(err.response?.data?.message || "Failed to delete account");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        authLoading,
        authError,
        initialized,
        loginUser,
        registerUser,
        logoutUser,
        deleteAccount,
        clearAuthError: () => setAuthError(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
