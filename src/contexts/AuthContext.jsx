import { createContext, useState, useEffect } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/api/auth/profile")
      .then((res) => setUser(res.data.user))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    try {
      const { data } = await api.post("/api/auth/login", credentials);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      toast.success("Logged in successfully");
      return data.user;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return null;
    }
  };

  const register = async (data) => {
    try {
      const { data: resData } = await api.post("/api/auth/register", data);
      localStorage.setItem("token", resData.token);
      setUser(resData.user);
      toast.success("Registered successfully");
      return resData.user;
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      return null;
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
