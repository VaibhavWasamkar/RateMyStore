import { useState } from "react";
import AppHeader from "./AppHeader";
import { changePassword } from "../../services/user.service";

import "./EditProfile.css";

const ChangePassword = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    let err = {};

    if (!form.oldPassword) {
      err.oldPassword = "Current password is required";
    }

    const passRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;

    if (!form.newPassword) {
      err.newPassword = "New password is required";
    } else if (!passRegex.test(form.newPassword)) {
      err.newPassword =
        "Password must be 8–16 chars, include 1 uppercase & 1 special character";
    }

    if (form.newPassword !== form.confirmPassword) {
      err.confirmPassword = "Passwords do not match";
    }

    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      await changePassword(form);

      setSuccess("Password changed successfully 🔐");

      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

      setTimeout(() => setSuccess(""), 3000);

    } catch (err) {
      setErrors({
        api: err.response?.data?.error || "Failed to change password"
      });
    }
  };

  return (
    <div className="home">

      <AppHeader />

      {/* HERO */}
      <div className="hero">
        <h1>Change Password</h1>
        <p>Keep your account secure</p>
      </div>

      {/* FORM */}
      <div className="features">
        <div className="feature-card large">

          {success && <p className="success-msg">{success}</p>}
          {errors.api && <p className="error">{errors.api}</p>}

          <form onSubmit={handleSubmit} className="auth-form">

            <input
              type="password"
              placeholder="Current Password"
              value={form.oldPassword}
              onChange={(e) => {
                setForm({ ...form, oldPassword: e.target.value });
                setErrors({ ...errors, oldPassword: "" });
              }}
            />
            {errors.oldPassword && <p className="error">{errors.oldPassword}</p>}

            <input
              type="password"
              placeholder="New Password"
              value={form.newPassword}
              onChange={(e) => {
                setForm({ ...form, newPassword: e.target.value });
                setErrors({ ...errors, newPassword: "" });
              }}
            />
            {errors.newPassword && <p className="error">{errors.newPassword}</p>}

            <input
              type="password"
              placeholder="Confirm New Password"
              value={form.confirmPassword}
              onChange={(e) => {
                setForm({ ...form, confirmPassword: e.target.value });
                setErrors({ ...errors, confirmPassword: "" });
              }}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}

            <button type="submit" className="auth-btn">
              Update Password
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;