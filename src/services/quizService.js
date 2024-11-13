// src/services/quizService.js

import { db } from './firebase'; // Firebase import, jo aapke Firebase configuration ko use karega
import { collection, addDoc } from 'firebase/firestore';

export const startBot = (difficulty, setQuestion) => {
  // Aapka existing code
};

export const storeQuestionInFirebase = async (question) => {
  try {
    await addDoc(collection(db, 'questions'), question); // Firestore mein question store karna
  } catch (error) {
    console.error('Error storing question in Firebase: ', error);
  }
};

export const addCustomQuestion = async (customQuestion) => {
  try {
    await addDoc(collection(db, 'customQuestions'), customQuestion); // Firebase mein custom question store karna
  } catch (error) {
    console.error('Error adding custom question: ', error);
  }
};
