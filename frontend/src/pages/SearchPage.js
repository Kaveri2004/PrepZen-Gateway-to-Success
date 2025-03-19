import React, { useState, useEffect } from "react";
import "./SearchPage.css";
import axios from "axios";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("top_ratings");

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/search?query=${searchQuery}&filter=${filter}`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  return (
    <div className="search-page">
      <input
        type="text"
        className="search-bar"
        placeholder="Search aspirants by username"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="search-btn" onClick={fetchUsers}>Search</button>

      <div className="filters">
        <button className={filter === "top_ratings" ? "active" : ""} onClick={() => setFilter("top_ratings")}>Top Ratings</button>
        <button className={filter === "exams" ? "active" : ""} onClick={() => setFilter("exams")}>Exams</button>
        <button className={filter === "most_followed" ? "active" : ""} onClick={() => setFilter("most_followed")}>Most Followed</button>
      </div>

      <div className="user-list">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <p className="username"><strong>{user.username}</strong></p>
            <p className="rating">Rating: {user.rating}</p>
            <p className="exams-linked">Exams Linked: {user.exams.join(", ")}</p>
            <button className="follow-btn">+ Follow</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
