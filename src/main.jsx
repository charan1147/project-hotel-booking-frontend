import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { RoomProvider } from "./context/RoomContext.jsx";
import { BookingProvider } from "./context/BookingContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Bootstrap import

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <AuthProvider>
      <RoomProvider>
        <BookingProvider>
          <App />
          <ToastContainer position="top-right" autoClose={3000} />
        </BookingProvider>
      </RoomProvider>
    </AuthProvider>
  </StrictMode>
);
