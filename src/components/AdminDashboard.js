// src/components/AdminDashboard.js

import React, { useState } from 'react';
import { addCustomQuestion } from '../services/quizService'; // Importing the function

function AdminDashboard() {
  const [customQuestion, setCustomQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: ''
  });

  const handleAddQuestion = () => {
    addCustomQuestion(customQuestion) // Custom question ko Firebase mein add karna
      .then(() => {
        alert('Question added successfully!');
        setCustomQuestion({ question: '', options: ['', '', '', ''], correctAnswer: '' });
      })
      .catch((error) => {
        alert('Error adding question: ', error);
      });
  };

  return (
    <div className="admin-dashboard">
      {/* Question input fields */}
      <input
        type="text"
        value={customQuestion.question}
        onChange={(e) => setCustomQuestion({ ...customQuestion, question: e.target.value })}
        placeholder="Enter custom question"
      />
      {customQuestion.options.map((option, index) => (
        <input
          key={index}
          type="text"
          value={option}
          onChange={(e) => {
            const newOptions = [...customQuestion.options];
            newOptions[index] = e.target.value;
            setCustomQuestion({ ...customQuestion, options: newOptions });
          }}
          placeholder={`Option ${index + 1}`}
        />
      ))}
      <input
        type="text"
        value={customQuestion.correctAnswer}
        onChange={(e) => setCustomQuestion({ ...customQuestion, correctAnswer: e.target.value })}
        placeholder="Correct answer"
      />
      <button onClick={handleAddQuestion}>Add Custom Question</button>
    </div>
  );
}

export default AdminDashboard;
