import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(form);
    if (user) {
      navigate(user.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
    }
  };

  return (
    <div className="container py-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="form-control mb-3"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="form-control mb-3"
          required
        />
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
      <p className="mt-3 text-center">
        No account? <a href="/register">Register</a>
      </p>
    </div>
  );
}
