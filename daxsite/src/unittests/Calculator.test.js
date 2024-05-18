import React from 'react';
import { render, fireEvent, screen,within } from '@testing-library/react';
import Calculator from '../components/Calculator';

describe('Calculator', () => {
  test('performs basic calculations', () => {
    render(<Calculator />);

    // Simulate button clicks for 7 + 3 = 10
    fireEvent.click(screen.getByText('7'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));

    // Check if the result is displayed
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  test('adds calculations to history', () => {
    render(<Calculator />);

    // Perform a calculation
    fireEvent.click(screen.getByText('7'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));

    const historyList = screen.getByRole('list');
    const listItems = within(historyList).getAllByRole('listitem');
    // Check if the history contains the calculation
      expect(within(listItems[0]).getByText(/7\s*\+\s*3\s*=\s*10/)).toBeInTheDocument();

  });

  test('clears the calculator history', () => {
    render(<Calculator />);

    // Perform a calculation
    fireEvent.click(screen.getByText('7'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));

    // Clear history
    fireEvent.click(screen.getByText('Clear History'));

    // Check if the history is cleared
    expect(screen.queryByText('1: 7 + 3 = 10')).not.toBeInTheDocument();
  });
});
