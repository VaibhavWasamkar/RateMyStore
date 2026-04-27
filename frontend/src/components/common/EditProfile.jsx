import { useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import { getProfile, updateProfile } from "../../services/user.service";

import "./EditProfile.css";

const EditProfile = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await getProfile();

        setForm({
          name: res.data?.name || "",
          email: res.data?.email || "",
          address: res.data?.address || ""
        });

      } catch (err) {
        console.error("PROFILE ERROR ❌", err);
      }
    };

    loadProfile();
  }, []);

  const validate = () => {
    let err = {};

    if (!form.name.trim()) {
      err.name = "Name is required";
    } else if (form.name.length < 20 || form.name.length > 60) {
      err.name = "Name must be 20–60 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email)) {
      err.email = "Invalid email";
    }

    if (!form.address || form.address.length > 400) {
      err.address = "Address must be under 400 characters";
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

    await updateProfile(form);

    setSuccess("Profile updated successfully 🎉");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <div className="home">

      <AppHeader />

      {/* HERO */}
      <div className="hero">
        <h1>Edit Profile</h1>
        <p>Update your personal information</p>
      </div>

      {/* FORM */}
      <div className="features">

        <div className="feature-card large">

          {success && <p className="success-msg">{success}</p>}

          <form onSubmit={handleSubmit} className="auth-form">

            <input
              id="name"
              name="name"
              autoComplete="name"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value });
                setErrors({ ...errors, name: "" });
              }}
            />
            {errors.name && <p className="error">{errors.name}</p>}

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
            {errors.email && <p className="error">{errors.email}</p>}

            <input
              id="address"
              name="address"
              autoComplete="street-address"
              placeholder="Address"
              value={form.address}
              onChange={(e) => {
                setForm({ ...form, address: e.target.value });
                setErrors({ ...errors, address: "" });
              }}
            />
            {errors.address && <p className="error">{errors.address}</p>}

            <button type="submit" className="auth-btn">
              Update Profile
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default EditProfile;