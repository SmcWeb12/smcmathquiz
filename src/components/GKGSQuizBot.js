import React, { useState, useEffect } from 'react';
import competitionQuestions from '../data/competition_questions.json';

function GKGSQuizBot() {
  const [question, setQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1); // Track the current question number
  const [timer, setTimer] = useState(90);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  useEffect(() => {
    loadNewQuestion();
  }, []);

  useEffect(() => {
    if (question) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            revealAnswer();
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [question]);

  const loadNewQuestion = () => {
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
    setTimer(90);

    const randomQuestion = competitionQuestions[Math.floor(Math.random() * competitionQuestions.length)];
    setQuestion(randomQuestion);
    setQuestionNumber((prevNumber) => prevNumber + 1); // Increment the question number
  };

  const revealAnswer = () => {
    setShowCorrectAnswer(true);
    setTimeout(() => {
      setAnsweredQuestions((prev) => [
        { ...question, questionNumber }, // Save question with its number
        ...prev,
      ]); // Add new expired question at the top
      loadNewQuestion();
    }, 2000);
  };

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    setShowCorrectAnswer(true);
    setTimeout(() => {
      setAnsweredQuestions((prev) => [
        { ...question, questionNumber }, // Save question with its number
        ...prev,
      ]); // Add new expired question at the top
      loadNewQuestion();
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#141E30] to-[#243B55] p-6 relative overflow-hidden">
      {/* Animated Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bg-pink-300 opacity-30 w-96 h-96 rounded-full blur-3xl animate-float top-1/4 left-1/3"></div>
        <div className="absolute bg-purple-400 opacity-20 w-72 h-72 rounded-full blur-3xl animate-float top-3/4 right-1/4"></div>
        <div className="absolute bg-blue-300 opacity-20 w-80 h-80 rounded-full blur-3xl animate-float top-1/4 right-1/4"></div>
      </div>

      <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-lg w-full z-10">
        <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">
          प्रश्न {questionNumber}
        </h2>

        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {question ? question.question : 'Loading question...'}
        </h1>

        {question && question.options && question.options.length > 0 ? (
          <div className="space-y-4">
            {question.options.map((option, index) => {
              let optionClass = "relative flex items-center p-5 rounded-lg shadow-lg cursor-pointer transition duration-300 text-lg font-semibold tracking-wide transform hover:scale-105";
              if (selectedAnswer) {
                if (option === question.correctAnswer) {
                  optionClass += " bg-gradient-to-r from-green-400 to-green-600 text-white ring ring-green-300";
                } else if (option === selectedAnswer && option !== question.correctAnswer) {
                  optionClass += " bg-gradient-to-r from-red-400 to-red-600 text-white ring ring-red-300";
                } else {
                  optionClass += " bg-gray-200 text-gray-800";
                }
              } else {
                optionClass += " bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg";
              }

              return (
                <label key={index} className={`${optionClass} option-card`}>
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    className="hidden"
                    onChange={() => handleAnswer(option)}
                    checked={selectedAnswer === option}
                    disabled={selectedAnswer !== null}
                  />
                  <span className="absolute left-3 h-5 w-5 border border-white rounded-full flex items-center justify-center">
                    {selectedAnswer === option && (
                      <span className="h-3 w-3 bg-white rounded-full"></span>
                    )}
                  </span>
                  <span className="pl-8">{option}</span>
                </label>
              );
            })}
          </div>
        ) : (
          <p className="text-red-500 text-center">Options are missing for this question. Please try again later.</p>
        )}

        <div className="flex justify-between items-center mt-6 text-gray-700 font-semibold">
          <p>⏳ शेष समय: <span className="text-blue-700 font-bold">{timer} सेकंड</span></p>
        </div>

        {showCorrectAnswer && question && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">सही उत्तर:</h2>
            <p className="text-green-600 font-bold text-2xl">{question.correctAnswer}</p>
          </div>
        )}
      </div>

      {/* Expired Questions Section */}
      {answeredQuestions.length > 0 && (
        <div className="mt-8 w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">उत्तरित प्रश्न</h2>
          {answeredQuestions.map((answeredQuestion, index) => (
            <div key={index} className="p-4 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg mb-4">
              <h3 className="font-semibold text-gray-800">
                प्रश्न {answeredQuestion.questionNumber}: {answeredQuestion.question}
              </h3>
              <p className="text-green-600 font-bold">सही उत्तर: {answeredQuestion.correctAnswer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GKGSQuizBot;
