import React, { useState, useEffect } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Load history from localStorage on component mount
    const storedHistory = localStorage.getItem('calculatorHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        const result = eval(input).toString();
        setInput(result);
        updateHistory(input, result);
      } catch {
        setInput('Error');
      }
      return;
    }
    if (value === 'C') {
      setInput('');
      return;
    }
    setInput(input + value);
  };

  const handleKeyPress = (event) => {
    const { key } = event;

    if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '.', '(', ')'].includes(key)) {
      setInput(input + key);
    } else if (key === 'Enter') {
      handleButtonClick('=');
    } else if (key === 'Backspace') {
      setInput(input.slice(0, -1));
    } else if (key === 'Escape') {
      handleButtonClick('C');
    }
  };

  const updateHistory = (expression, result) => {
    const newEntry = {
      id: history.length < 5 ? history.length + 1 : 1,
      expression: `${expression} = ${result}`,
    };
    const newHistory = [newEntry, ...history.slice(0, 4)].map((item, index) => ({
      ...item,
      id: index + 1,
    }));
    setHistory(newHistory);
    localStorage.setItem('calculatorHistory', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('calculatorHistory');
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [input]);

  return (
    <div className="calculator">
      <div className="calculator-display">{input}</div>
      <div className="calculator-buttons">
        {['7', '8', '9', '/'].map((value) => (
          <button key={value} onClick={() => handleButtonClick(value)}>{value}</button>
        ))}
        {['4', '5', '6', '*'].map((value) => (
          <button key={value} onClick={() => handleButtonClick(value)}>{value}</button>
        ))}
        {['1', '2', '3', '-'].map((value) => (
          <button key={value} onClick={() => handleButtonClick(value)}>{value}</button>
        ))}
        {['0', '.', '=', '+'].map((value) => (
          <button key={value} onClick={() => handleButtonClick(value)}>{value}</button>
        ))}
        <button onClick={() => handleButtonClick('C')}>C</button>
      </div>
      <div className="calculator-history">
        <h3>History</h3>
        <ul>
          {history.map((item) => (
            <li key={item.id} role="listitem">
              <strong>ID:</strong> {item.id} <br />
              <strong>Calculation:</strong> {item.expression}
            </li>
          ))}
        </ul>
        <button className="clear-history" onClick={clearHistory}>Clear History</button>
      </div>
    </div>
  );
};

export default Calculator;
