// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./Navbar.css";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const [userRole, setUserRole] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (!token) return;

    const fetchUserRole = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserRole(res.data.role);
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
      }
    };

    fetchUserRole();
  }, [token]);

  if (location.pathname === "/") return null;

  return (
    <nav className="navbar">
      <div>
        <Link to="/" className="navbar-logo">
          MediBridge
        </Link>
      </div>
      <ul className="navbar-menu">
        {/* Home link always visible */}
        <li>
          <Link to="/" className="navbar-link">Home</Link>
        </li>

        {/* Authenticated links */}
        {token && (
          <>
            <li>
              <Link to="/book" className="navbar-link">Book Appointment</Link>
            </li>
            {userRole === "patient" && (
              <li>
                <Link to="/appointments" className="navbar-link">My Appointments</Link>
              </li>
            )}
          </>
        )}

        {/* Login link */}
        {!token && location.pathname.toLowerCase() !== "/login" && (
          <li>
            <Link to="/login" className="navbar-link">Login</Link>
          </li>
        )}

        {/* Register link */}
        {!token && location.pathname.toLowerCase() !== "/register" && (
          <li>
            <Link to="/register" className="navbar-link">Register</Link>
          </li>
        )}

        {/* Logout button */}
        {token && (
          <li>
            <button onClick={logout} className="navbar-button">Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
