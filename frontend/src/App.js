import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import ChatPage from "./pages/ChatPage";
import ReviewPage from "./pages/ReviewPage";
import Navbar from "./components/Navbar";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/reviews" element={<ReviewPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
