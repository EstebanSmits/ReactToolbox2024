import React, { useState } from 'react';
import { addItem, getItems } from '../utils/db';
import './AddMenuItem.css';

const AddMenuItem = ({ setMenuItems }) => {
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [newWindow, setNewWindow] = useState(false);

  const handleAddItem = async () => {
    const newItem = { text, url, newWindow };
    await addItem(newItem);
    setMenuItems(await getItems());
    setText('');
    setUrl('');
    setNewWindow(false);
    alert('Menu item added!');
  };

  return (
    <div className="add-menu-item">
      <h2>Add New Menu Item</h2>
      <div className="menu-form">
        <input
          type="text"
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="url"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={newWindow}
            onChange={(e) => setNewWindow(e.target.checked)}
          />
          Open in new window
        </label>
        <button onClick={handleAddItem}>Add Item</button>
      </div>
    </div>
  );
};

export default AddMenuItem;
