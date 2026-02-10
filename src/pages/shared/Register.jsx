import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";

function Register() {
  const { register } = useContext(AppContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(form);
    if (success) navigate("/user/dashboard");
  };

  return (
    <div className="container py-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="form-control mb-3"
          required
        />
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
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      <p className="mt-3">
        Have account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Register;
