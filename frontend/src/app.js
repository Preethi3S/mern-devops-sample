import React, { useState, useEffect } from 'react';
import './app.css';

function App() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    fetch('/api/items')
      .then(res => res.json())
      .then(setItems);
  }, []);

  const addItem = async () => {
    if (!text.trim()) return;
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: text })
    });
    const newItem = await res.json();
    setItems([...items, newItem]);
    setText('');
  };

  const deleteItem = async (id) => {
    await fetch(`/api/items/${id}`, { method: 'DELETE' });
    setItems(items.filter(item => item._id !== id));
  };

  return (
    <div className={darkMode ? 'app dark' : 'app light'}>
      <div className="container">
        <div className="header">
          <h1>🧠 MERN DevOps Sample</h1>
          <button className="toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <div className="input-group">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter an item..."
          />
          <button onClick={addItem}>➕ Add</button>
        </div>

        <ul className="item-list">
          {items.map(i => (
            <li key={i._id} className="item-card">
              <span>{i.name}</span>
              <button onClick={() => deleteItem(i._id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
