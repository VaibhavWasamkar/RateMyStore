import HomeHeader from "../../components/common/HomeHeader";
import { useState, useContext } from "react";
import { loginUser } from "../../services/auth.service";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validate = () => {
    let err = {};

    if (!form.email) {
      err.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        err.email = "Invalid email format";
      }
    }

    if (!form.password) {
      err.password = "Password is required";
    }

    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setApiError("");
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // ❌ stop API call
    }

    setErrors({}); // clear field errors

    try {
      const res = await loginUser(form);
      login(res.data);

      if (res.data.user.role === "admin") navigate("/admin");
      else if (res.data.user.role === "owner") navigate("/owner");
      else if (res.data.user.role === "user") navigate("/user");
      else navigate("/");

    } catch (err) {
      setApiError(err.response?.data?.error || "Login Failed, Try Again");
    }
  };

  return (
    <div className="login-page">

      <HomeHeader />

      <div className="login-container">
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p className="subtitle">Login to continue</p>

          <form onSubmit={handleSubmit}>

            {apiError && <p className="form-error">{apiError}</p>}

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                setErrors({ ...errors, email: "" });
              }}
            />
            {errors.email && <p className="field-error">{errors.email}</p>}

            <div className="password-field">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                  setErrors({ ...errors, password: "" });
                  setApiError("");
                }}
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            {errors.password && <p className="field-error">{errors.password}</p>}

            <button type="submit" className="login-submit">
              Login
            </button>
          </form>

          <p className="bottom-text">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;