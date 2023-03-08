import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'; 
import './App.css';

function App() {
  // Define state for to-do items
  const [items, setItems] = useState([]);
  // Define state for input text
  const [text, setText] = useState('');

  // Function to handle input change
  const handleChange = (event) => {
    setText(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check to see content exists
    if (text !== "") {
      // Add new item to array of to-do items
      setItems([...items, { text, completed: false }]);
    }

    // Clear input field
    setText('');
  };

  // Function to toggle completion status of item
  const handleToggle = (index) => {
    const newItems = [...items];
    newItems[index].completed = !newItems[index].completed;
    setItems(newItems);
  };

  // Function to clear completed items
  const handleClearCompleted = () => {
    const newItems = items.filter(item => !item.completed);
    setItems(newItems);
  };

  // Function to delete item
  const handleDelete = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };
  
  return (
    <div className="container">
      {/* Header */}
      <h1>To-Do List</h1>
      {/* Form to add new item */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Add a new to-do item"
            value={text}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
      {/* List of to-do items */}
      <ul className="list-group">
        {/* Map over items array to display each item */}
        {items.map((item, index) => (
          <li key={index} className="list-group-item">
            {/* Use Flexbox to align elements in each item */}
            <div className="d-flex justify-content-between align-items-center">
              {/* Checkbox to toggle completion status */}
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={item.completed}
                  onChange={() => handleToggle(index)}
                />
                {/* Label to display item text and apply "completed" class if completed */}
                <label className={`form-check-label ${item.completed ? 'completed' : ''}`}>
                  {item.text}
                </label>
              </div>
              {/* Button to delete item */}
              <button type="button" className="btn btn-link" onClick={() => handleDelete(index)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Button to clear completed items */}
      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-danger" onClick={handleClearCompleted}>
          Clear Completed
        </button>
      </div>
    </div>
  )
};

export default App;