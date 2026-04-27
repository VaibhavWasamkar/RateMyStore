import HomeHeader from "../../components/common/HomeHeader";
import { useState } from "react";
import { registerUser } from "../../services/auth.service";
import { useNavigate, Link } from "react-router-dom";

import "./Register.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // 🔍 VALIDATION FUNCTION
  const validate = () => {
    let err = {};

    // Name
    if (form.name.length < 20 || form.name.length > 60) {
      err.name = "Name must be 20–60 characters";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      err.email = "Invalid email format";
    }

    // Password
    const passRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
    if (!passRegex.test(form.password)) {
      err.password =
        "Password must be 8–16 chars, include 1 uppercase & 1 special character";
    }

    // Confirm Password
    if (form.password !== form.confirmPassword) {
      err.confirmPassword = "Passwords do not match";
    }

    // Address
    if (form.address.length > 400) {
      err.address = "Address must be under 400 characters";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await registerUser(form);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="register-page">

      <HomeHeader />

      <div className="register-container">
        <div className="register-card">

          <h2>Create Normal User Account</h2>
          <p className="subtitle">Join and start rating stores</p>

          <form onSubmit={handleSubmit} noValidate>

            {/* NAME */}
            <input
              id="name"
              name="name"
              autoComplete="name"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <p className="error">{errors.name}</p>}

            {/* EMAIL */}
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <p className="error">{errors.email}</p>}

            {/* PASSWORD */}
            <div className="password-field">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            {errors.password && <p className="error">{errors.password}</p>}

            {/* CONFIRM PASSWORD */}
            <div className="password-field">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
              />

              <span
                className="eye-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </span>
            </div>

            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}

            {/* ADDRESS */}
            <input
              id="address"
              name="address"
              autoComplete="street-address"
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            {errors.address && <p className="error">{errors.address}</p>}

            <button type="submit" className="register-submit">
              Register
            </button>

          </form>

          <p className="bottom-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;