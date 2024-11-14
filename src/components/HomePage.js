// src/components/Home/HomePage.js

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa"; // For Send icon

const HomePage = () => {
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [reviews, setReviews] = useState([]); // Store all submitted reviews
  const navigate = useNavigate();

  // Fetch saved reviews from localStorage when component mounts
  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const filteredReviews = savedReviews.filter((review) => {
      return new Date() - new Date(review.timestamp) <= 24 * 60 * 60 * 1000; // 24 hours
    });
    setReviews(filteredReviews);
    localStorage.setItem("reviews", JSON.stringify(filteredReviews));

    const timer = setInterval(() => {
      const updatedReviews = filteredReviews.filter((review) => {
        return new Date() - new Date(review.timestamp) <= 24 * 60 * 60 * 1000; // 24 hours
      });

      setReviews(updatedReviews);
      localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    }, 60000); // Cleanup every minute

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, []);

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmitReview = () => {
    if (name && review) {
      const newReview = {
        name,
        text: review,
        isUser: true,
        timestamp: new Date(),
      };

      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);
      localStorage.setItem("reviews", JSON.stringify(updatedReviews));
      setReview("");
    } else {
      alert("Please provide your name and review.");
    }
  };

  const handleQuizStart = () => {
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 flex flex-col justify-center items-center">
      <div className="text-center text-white mb-8">
        <h1 className="text-5xl font-extrabold leading-tight mb-4">Welcome to the Daily SMC Math Quiz</h1>
        <h2 className="text-2xl font-medium mb-4">by Mukesh Sir</h2>
        <p className="text-lg mb-6">Test your math skills and challenge yourself with daily quizzes!</p>
      </div>

      {/* Scrolling Images Section */}
      <div className="overflow-x-auto py-4 mb-8">
        <div className="flex space-x-6">
          {/* 10 Images */}
          {[...Array(10)].map((_, index) => (
            <img
              key={index}
              src={`https://via.placeholder.com/150?text=Image+${index + 1}`}
              alt={`Image ${index + 1}`}
              className="w-40 h-40 object-cover rounded-xl shadow-lg"
            />
          ))}
        </div>
      </div>

      <div className="space-y-6 text-white mb-8 text-center">
        <ul className="space-y-2 text-lg">
          <li>⏱️ 1-minute timer for each question</li>
          <li>📚 Questions for classes 11th and 12th</li>
          <li>✅ Instant feedback on correct/incorrect answers</li>
        </ul>
      </div>

      <div className="flex space-x-6 mb-8">
        <button
          onClick={handleQuizStart}
          className="px-8 py-4 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-green-600 transition-all"
        >
          Start Quiz
        </button>
        <Link to="/admin-dashboard">
         
        </Link>
      </div>

      {/* Review Section */}
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-6 space-y-6">
        {/* Submitted Reviews Section with Scroll */}
        <div className="h-[300px] overflow-y-auto bg-gray-50 p-4 rounded-2xl shadow-inner space-y-4">
          <h4 className="text-lg font-semibold text-indigo-700">SMC_GK_GS_CHAT:</h4>
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`flex ${review.isUser ? "justify-end" : "justify-start"} space-x-3`}
            >
              <div
                className={`p-3 rounded-2xl max-w-xs break-words shadow-md ${
                  review.isUser ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"
                }`}
              >
                <p className="font-semibold">{review.name}</p>
                <p>{review.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Leave a Review Section */}
        <div className="bg-gray-100 p-4 rounded-2xl shadow-md">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={handleNameChange}
              className="w-full p-4 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center space-x-3">
            <textarea
              placeholder="Type your message..."
              value={review}
              onChange={handleReviewChange}
              className="w-full p-4 border-none rounded-lg resize-none bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="3"
            />
            <button
              onClick={handleSubmitReview}
              className="bg-green-500 text-white rounded-full p-3 hover:bg-green-600 transition-all"
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
