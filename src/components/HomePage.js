// src/components/Home/HomePage.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa"; // For Send icon

const HomePage = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  // Fetch saved messages from localStorage
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    const filteredMessages = savedMessages.filter(
      (msg) => new Date() - new Date(msg.timestamp) <= 24 * 60 * 60 * 1000
    );
    setMessages(filteredMessages);
    localStorage.setItem("messages", JSON.stringify(filteredMessages));

    const timer = setInterval(() => {
      const updatedMessages = filteredMessages.filter(
        (msg) => new Date() - new Date(msg.timestamp) <= 24 * 60 * 60 * 1000
      );
      setMessages(updatedMessages);
      localStorage.setItem("messages", JSON.stringify(updatedMessages));
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleMessageChange = (e) => setMessage(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);

  const handleSubmitMessage = () => {
    if (name && message) {
      const newMessage = { name, text: message, isUser: true, timestamp: new Date() };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      localStorage.setItem("messages", JSON.stringify(updatedMessages));
      setMessage("");
    } else {
      alert("Please provide your name and message.");
    }
  };

  const handleQuizStart = () => navigate("/quiz");

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-900 flex flex-col items-center py-10 px-4">
      {/* Header Section */}
      <div className="text-center text-white mb-12">
        <h1 className="text-3xl sm:text-6xl font-extrabold leading-tight mb-2 tracking-wide">SMC Daily Math Quiz</h1>
        <h2 className="text-lg sm:text-2xl font-light mb-4 italic">powered by Mukesh Sir</h2>
        <p className="text-sm sm:text-lg max-w-md mx-auto mb-6">Challenge your skills daily with quizzes crafted for 11th and 12th graders!</p>
      </div>

      {/* Quiz Features and Start Button */}
      <div className="bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-3xl p-8 max-w-xl w-full mb-10 transition duration-500 hover:scale-105 transform">
        <div className="space-y-3 text-gray-700">
          <p className="text-lg sm:text-xl font-semibold mb-4">💡 Quiz Features:</p>
          <ul className="text-gray-600 space-y-2">
            <li>⏱️ Timed 1-minute question sessions</li>
            <li>📘 Curated questions for classes 11 & 12</li>
            <li>✅ Instant feedback on your answers</li>
          </ul>
        </div>
        <button
          onClick={handleQuizStart}
          className="mt-6 w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-lg sm:text-xl rounded-full shadow-md transform transition-all duration-300 hover:scale-105"
        >
          Start Quiz
        </button>
      </div>

      {/* Community Chat Section */}
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-3xl p-6 space-y-6">
        <div className="text-indigo-800 font-semibold text-2xl mb-2">Community Chat</div>

        {/* Display Messages */}
        <div className="h-72 overflow-y-auto bg-gray-100 p-4 rounded-xl shadow-inner space-y-4">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.isUser ? "justify-end" : "justify-start"} space-x-3`}>
                <div
                  className={`p-4 max-w-sm rounded-xl shadow-md ${msg.isUser ? "bg-indigo-500 text-white" : "bg-gray-300 text-gray-800"}`}
                >
                  <p className="font-semibold">{msg.name}</p>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No messages yet.</p>
          )}
        </div>

        {/* Send Message */}
        <div className="bg-gray-100 p-5 rounded-xl shadow-lg">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={handleNameChange}
            className="w-full mb-3 p-3 rounded-xl border border-gray-300 shadow-inner focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-3">
            <textarea
              placeholder="Type your message here..."
              value={message}
              onChange={handleMessageChange}
              className="w-full p-3 rounded-lg border-none resize-none shadow-inner focus:ring-2 focus:ring-indigo-500"
              rows="2"
            />
            <button
              onClick={handleSubmitMessage}
              className="bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-all"
            >
              <FaPaperPlane className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
