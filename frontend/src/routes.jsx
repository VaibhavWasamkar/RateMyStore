import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import EditProfile from "./components/common/EditProfile";
import ChangePassword from "./components/common/ChangePassword";

import Home from "./pages/Home";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminStores from "./pages/admin/Stores";
import UserHome from "./pages/user/Home";
import OwnerDashboard from "./pages/owner/Dashboard";

import ProtectedRoute from "./components/common/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminUsers /></ProtectedRoute>} />
      <Route path="/admin/stores" element={<ProtectedRoute role="admin"><AdminStores /></ProtectedRoute>} />

      <Route path="/user" element={<ProtectedRoute role="user"><UserHome /></ProtectedRoute>}/>

      <Route path="/owner" element={<ProtectedRoute role="owner"><OwnerDashboard /></ProtectedRoute>}/>

      <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>}/>
      <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>}/>
    </Routes>
  );
};

export default AppRoutes;