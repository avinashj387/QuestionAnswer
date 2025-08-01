import React, { useEffect, useState } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';

const AdminPage = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('/questions.json')
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  const handleSelect = async (id) => {
    try {
      await set(ref(db, 'config/selectedId'), id);
    } catch (error) {
      alert('Error selecting question: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Panel: Select a Question</h2>
      {questions.map((q) => (
        <div key={q.id} style={{ margin: '1rem 0', padding: '1rem', border: '1px solid #ccc' }}>
          <strong>{q.id}. {q.question}</strong>
          <p>{q.answer}</p>
          <button onClick={() => handleSelect(q.id)}>Select This</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
