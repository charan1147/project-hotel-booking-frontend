import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const { loginUser, authLoading, authError, clearAuthError } =
    useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (authError) {
      clearAuthError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser({ email, password });
    if (success) {
      navigate("/", { replace: true });
    } else {
      toast.error(authError || "Login failed");
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Login</h1>

      {authError && (
        <div className="alert alert-danger" role="alert">
          {authError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="row g-3">
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
            autoComplete="email"
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
            autoComplete="current-password"
          />
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={authLoading}
          >
            {authLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>

      <p className="mt-3">
        Don't have an account?{" "}
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={() => navigate("/register", { replace: true })}
        >
          Register
        </button>
      </p>
    </div>
  );
}

export default Login;
