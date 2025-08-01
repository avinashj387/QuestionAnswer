import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

const UserPage = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Load questions.json once
  useEffect(() => {
    fetch('/questions.json')
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  // Listen for selectedId in Realtime DB
  useEffect(() => {
    const selectedRef = ref(db, 'config/selectedId');
    const unsubscribe = onValue(selectedRef, (snapshot) => {
      if (snapshot.exists()) {
        setSelectedId(snapshot.val());
      } else {
        console.warn("No selectedId in DB");
        setSelectedId(null);
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  // Update selected question when selectedId or questions change
  useEffect(() => {
    const found = questions.find(q => q.id === selectedId);
    setSelectedQuestion(found);
  }, [selectedId, questions]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>User View</h2>
      {selectedQuestion ? (
        <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
          <h3>{selectedQuestion.question}</h3>
          <p>{selectedQuestion.answer}</p>
        </div>
      ) : (
        <p>Waiting for selection...</p>
      )}
    </div>
  );
};

export default UserPage;
