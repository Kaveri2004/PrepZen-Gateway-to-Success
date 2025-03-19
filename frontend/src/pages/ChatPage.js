import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChatPage.css";

const ChatPage = () => {
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState("sent");

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/messages?filter=${filter}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat Page</h2>
      <input
        type="text"
        placeholder="🔍 Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="filter-buttons">
        <button onClick={() => setFilter("sent")}>Sent</button>
        <button onClick={() => setFilter("received")}>Received</button>
        <button onClick={() => setFilter("requests")}>Requests</button>
      </div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <span className="username">{msg.username}</span>
            <p>{msg.text}</p>
            <div className="message-options">
              <span>{msg.time}</span>
              <button>Mute</button>
              <button>Block</button>
              <button>Pin</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatPage;
