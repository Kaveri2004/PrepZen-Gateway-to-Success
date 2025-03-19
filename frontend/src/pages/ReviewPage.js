import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReviewPage.css";
import { FaStar, FaUserCircle } from "react-icons/fa";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/reviews")
      .then(response => setReviews(response.data))
      .catch(error => console.error("Error fetching reviews:", error));
  }, []);

  return (
    <div className="review-container">
      <div className="user-info">
        <FaUserCircle size={40} />
        <div>
          <h2>Username</h2>
          <p>4.8/5</p>
        </div>
      </div>

      <div className="rating-stars">
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} />
        ))}
      </div>

      <div className="buttons">
        <button className="like-btn">Like</button>
        <button className="comment-btn">Comment</button>
      </div>

      <h3>Total Reviews: {reviews.length}</h3>

      <div className="review-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="user-info">
              <FaUserCircle size={30} />
              <h4>{review.username}</h4>
            </div>
            <div className="rating-stars">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-400"} />
              ))}
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>

      <div className="bottom-nav">
        <span>🏠 Home</span>
        <span>💬 Chat</span>
        <span>🔔 Notifications</span>
        <span>👤 Profile</span>
      </div>
    </div>
  );
};

export default ReviewPage;
