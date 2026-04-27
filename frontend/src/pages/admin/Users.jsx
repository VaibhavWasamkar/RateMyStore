import Layout from "../../components/common/AdminLayout";
import { useEffect, useState } from "react";
import { getUsers, addUser } from "../../services/admin.service";
import UserTable from "../../components/dashboard/UserTable";

import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    role: ""
  });

  const [errors, setErrors] = useState({});

  const fetch = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => { fetch(); }, []);

  const validate = () => {
    let err = {};

    // NAME
    if (!form.name.trim()) {
      err.name = "Name is required";
    } else if (form.name.length < 20 || form.name.length > 60) {
      err.name = "Name must be 20–60 characters";
    }

    // EMAIL
    if (!form.email.trim()) {
      err.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        err.email = "Invalid email format";
      }
    }

    // PASSWORD
    if (!form.password) {
      err.password = "Password is required";
    } else {
      const passRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
      if (!passRegex.test(form.password)) {
        err.password =
          "Password must be 8–16 chars, include 1 uppercase & 1 special character";
      }
    }

    // CONFIRM PASSWORD
    if (!form.confirmPassword) {
      err.confirmPassword = "Confirm password is required";
    } else if (form.password !== form.confirmPassword) {
      err.confirmPassword = "Passwords do not match";
    }

    // ADDRESS
    if (!form.address.trim()) {
      err.address = "Address is required";
    } else if (form.address.length > 400) {
      err.address = "Address must be under 400 characters";
    }

    // ROLE
    if (!form.role) {
      err.role = "Please select a role";
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

    await addUser(form);

    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      role: ""
    });

    fetch();
    alert("User added successfully");
  };

  return (
    <Layout>
      <div className="users-page">

        <div className="users-wrapper">

          <div className="users-content">

            {/* ADD USER FORM */}
            <div className="card form-card">
              <h3>Add New User</h3>

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

                <div className="password-field">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => {
                      setForm({ ...form, password: e.target.value });
                      setErrors({ ...errors, password: "" });
                    }}
                  />

                  <span
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </div>
                {errors.password && <p className="error">{errors.password}</p>}

                {/* ✅ CONFIRM PASSWORD */}
                <div className="password-field">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={(e) => {
                      setForm({ ...form, confirmPassword: e.target.value });
                      setErrors({ ...errors, confirmPassword: "" });
                    }}
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

                <div className="select-wrapper">
                  <select
                    value={form.role}
                    onChange={(e) => {
                      setForm({ ...form, role: e.target.value });
                      setErrors({ ...errors, role: "" });
                    }}
                  >
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="owner">Owner</option>
                  </select>
                </div>
                {errors.role && <p className="error">{errors.role}</p>}

                <button type="submit" className="auth-btn">
                  Add User
                </button>

              </form>
            </div>

            {/* TABLE */}
            <div className="card table-card">


              {/* HEADER */}
              <div className="page-header">
                <h2>Users Management</h2>
                <p>Control users, roles & permissions seamlessly</p>
              </div>
              <UserTable users={users} />
            </div>

          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Users;