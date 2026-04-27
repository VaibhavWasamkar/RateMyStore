import { Link } from "react-router-dom";
import "./HomeHeader.css";

const HomeHeader = () => {
  return (
    <div className="home-header">
      <Link className="logo" to="/">RateMyStore</Link>

      <div className="nav">
        <Link to="/register" className="login-btn">
          Register User
        </Link>
        <Link to="/login" className="login-btn">
          Login
        </Link>
      </div>
    </div>
  );
};

export default HomeHeader;