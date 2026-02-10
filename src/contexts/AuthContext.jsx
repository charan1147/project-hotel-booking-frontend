import { createContext, useState, useEffect } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get("/api/auth/profile")
        .then((res) => setUser(res.data))
        .catch(() => localStorage.removeItem("token"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (data) => {
    try {
      const res = await api.post("/api/auth/login", data);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      toast.success("Logged in");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return false;
    }
  };

  const register = async (data) => {
    try {
      const res = await api.post("/api/auth/register", data);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      toast.success("Registered");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.info("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
