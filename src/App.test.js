// App.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('Pokémon Search App', () => {
  test('Switching to previous and next Pokémon', async () => {
    render(<App />);
    
    const previousButton = screen.getByText('Previous');
    const nextButton = screen.getByText('Next');
    
    fireEvent.click(nextButton);
    await waitFor(() => {
      expect(screen.getByText('ivysaur')).toBeInTheDocument();
    });
    
    fireEvent.click(previousButton);
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });
  });

  // test('Text-based search feature', async () => {
  //   render(<App />);
    
  //   const inputField = screen.getByPlaceholderText('Enter Pokémon name or id...');
  //   fireEvent.change(inputField, { target: { value: 'charman' } });

  //   await waitFor(() => {
  //     expect(screen.getByText('charmander')).toBeInTheDocument();
  //   });
  // });
});
