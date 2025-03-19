import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Optional for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">PrepGen</h2>
      <ul className="nav-links">
        <li><Link to="/">Search</Link></li>
        <li><Link to="/chat">Chat</Link></li>
        <li><Link to="/review">Review</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
