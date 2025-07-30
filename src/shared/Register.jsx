import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();

  const { registerUser, authLoading, authError, clearAuthError } =
    useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (authError) {
      clearAuthError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await registerUser({ name, email, password });
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Register</h1>

      {authError && (
        <div className="alert alert-danger" role="alert">
          {authError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            value={password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={authLoading}
          >
            {authLoading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>

      <p className="mt-3">
        Already have an account?{" "}
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </p>
    </div>
  );
}

export default Register;
