// App.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/user-event';
import App from './App';

// Test the next and previous buttons
describe('Pokémon Search App', () => {
  test('Switching to previous and next Pokémon', async () => {
    render(<App />);
    
    const previousButton = screen.getByText('Previous');
    const nextButton = screen.getByText('Next');
    
    // Because the page loads in the first Pokémon, when clicked "next" it should appear "bulbasaur"
    fireEvent.click(nextButton);
    await waitFor(() => {
      expect(screen.getByText('ivysaur')).toBeInTheDocument();
    });
    
    fireEvent.click(previousButton);
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });
  });

  // NOT IMPLEMENTED - The text in the suggestion box isn't being rendered on the test app
  // test('Text-based search feature', async () => {
  //   render(<App />);
    
  //   const inputField = screen.getByPlaceholderText('Enter Pokémon name or id...');
  //   fireEvent.change(inputField, { target: { value: 'charman' } });

  //   await waitFor(() => {
  //     expect(screen.getByText('charmander')).toBeInTheDocument();
  //   });
  // });
});
