import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import "./AppHeader.css";

const AppHeader = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    // close on outside click
    useEffect(() => {
        const handleClick = (e) => {
            if (!dropdownRef.current?.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    return (
        <div className="app-header">
            <Link to="/" className="logo">RateMyStore</Link>

            <div className="nav">
                {user?.role === "user" && (
                    <Link to="/user" className="nav-btn">Dashboard</Link>
                )}

                {user?.role === "owner" && (
                    <Link to="/owner" className="nav-btn">Dashboard</Link>
                )}

                {user?.role === "admin" && (
                    <>
                        <Link to="/admin" className="nav-btn">Dashboard</Link>
                        <Link to="/admin/users" className="nav-btn">Users</Link>
                        <Link to="/admin/stores" className="nav-btn">Stores</Link>
                    </>
                )}

                {/* USER DROPDOWN */}
                <div className="user-menu" ref={dropdownRef}>
                    <div
                        className={`avatar ${open ? "open" : ""}`}
                        onClick={() => setOpen(!open)}
                    >
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>

                    {open && (
                        <div className="dropdown">
                            <div className="dropdown-row name">
                                {user?.name}
                            </div>
                            <div className="dropdown-row nav-btn" onClick={() => navigate("/edit-profile")}>
                                Edit Profile
                            </div>
                            <div className="dropdown-row nav-btn" onClick={() => navigate("/change-password")}>
                                Change Password
                            </div>

                            <div className="dropdown-row nav-btn" onClick={logout}>
                                Logout
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default AppHeader;