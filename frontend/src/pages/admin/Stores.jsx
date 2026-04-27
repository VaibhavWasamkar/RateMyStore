import Layout from "../../components/common/AdminLayout";
import { useEffect, useState } from "react";
import { getStores, addStore, getOwners } from "../../services/admin.service";
import RatingTable from "../../components/dashboard/RatingTable";

import "./Users.css";

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [owners, setOwners] = useState([]);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: ""
  });

  const fetch = async () => {
    const [s, o] = await Promise.all([getStores(), getOwners()]);
    setStores(s.data);
    setOwners(o.data);
  };

  useEffect(() => { fetch(); }, []);

  const validate = () => {
    let err = {};

    // NAME
    if (!form.name.trim()) {
      err.name = "Store name is required";
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

    // ADDRESS
    if (!form.address.trim()) {
      err.address = "Address is required";
    } else if (form.address.length > 400) {
      err.address = "Address must be under 400 characters";
    }

    // OWNER
    if (!form.owner_id) {
      err.owner_id = "Please select an owner";
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

    await addStore(form);

    setForm({
      name: "",
      email: "",
      address: "",
      owner_id: ""
    });

    fetch();
    alert("Store added successfully");
  };

  return (
    <Layout>
      <div className="users-page">

        <div className="users-wrapper">

          <div className="users-content">

            {/* ADD STORE FORM */}
            <div className="card form-card">
              <h3>Add New Store</h3>

              <form onSubmit={handleSubmit} className="auth-form">

                <input
                  placeholder="Store Name"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    setErrors({ ...errors, name: "" });
                  }}
                />
                {errors.name && <p className="error">{errors.name}</p>}

                <input
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    setErrors({ ...errors, email: "" });
                  }}
                />
                {errors.email && <p className="error">{errors.email}</p>}

                <input
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
                    value={form.owner_id}
                    onChange={(e) => {
                      setForm({ ...form, owner_id: e.target.value });
                      setErrors({ ...errors, owner_id: "" });
                    }}
                  >
                    <option value="">Select Owner</option>
                    {owners.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.name} ({o.email})
                      </option>
                    ))}
                  </select>
                </div>
                {errors.owner_id && <p className="error">{errors.owner_id}</p>}

                <button type="submit" className="auth-btn">
                  Add Store
                </button>

              </form>
            </div>

            {/* TABLE */}
            <div className="card table-card">
              {/* HEADER */}
              <div className="page-header">
                <h2>Stores Management</h2>
                <p>Manage stores and assign owners</p>
              </div>
              <RatingTable stores={stores} />
            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
};

export default Stores;