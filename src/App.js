import React, { useState, useEffect, useRef } from 'react';             // Extracts useState and useEffect from the 'react' module. 
import './App.css';
import pokeballImage from './pokeball.svg'; // Import your image

function App() {
  const [inputValue, setInputValue] = useState('');             // State to store the input value, and function to modify it
  const [pokemonData, setPokemonData] = useState(null);         // State to store the pokémon data
  const [errorMessage, setErrorMessage] = useState('');         // State to store error message
  const [currentPokemonId, setCurrentPokemonId] = useState(1);  // State to store the pokémon ID
  const [myFavorite, setMyFavorite] = useState("");             // State to store "My favorite text"
  const [allPokemonNames, setAllPokemonNames] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchAllPokemonNames = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1118');
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon names');
        }
        const data = await response.json();
        const names = data.results.map((pokemon) => pokemon.name);
        setAllPokemonNames(names);
      } catch (error) {
        console.error(error);
        setErrorMessage('Failed to fetch Pokémon names');
      }
    };

    fetchAllPokemonNames();
  }, []);

  useEffect(() => { // Function as first argument. This function will run when the component mounts, and whenever any of the dependencies listed in the second argument change.
    const fetchPokemonData = async (id) => {  // Declares an async function that takes a Pokémon (id) as its parameter. Responsible for fetching Pokémon data from the PokeAPI.
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);  // Send GET request
        if (!response.ok) {
          throw new Error('Pokemon not found');
        }
        const data = await response.json();             // Stores the pokemon data
        setPokemonData(data);                           // Updates pokemonData
        setCurrentPokemonId(data.id);                   // Updates current ID
        if (data.name.toLowerCase() === 'hydreigon') {
          setMyFavorite("My favorite");
        } else {
          setMyFavorite(null)
        }
        setErrorMessage('');                            // Clears any previous error message in the errorMessage state variable
      } catch (error) {
        console.error(error);
        setPokemonData(null);                           // Resets the pokemonData state variable to null in case of an error.
        setErrorMessage('Pokemon not found');
      }
    };

    fetchPokemonData(currentPokemonId);
  }, [currentPokemonId, inputValue]);     // The useEffect hook will run whenever currentPokemonId or inputValue changes.

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value.length >= 3) {
      setSuggestions(
        allPokemonNames.filter((name) => name.toLowerCase().startsWith(value.toLowerCase()))
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = async (name) => {
    if (name && allPokemonNames && allPokemonNames.length > 0) {
      const selectedPokemon = allPokemonNames.find(pokemon => pokemon.toLowerCase() === name.toLowerCase());
      if (selectedPokemon) {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`);
          if (!response.ok) {
            throw new Error('Pokemon not found');
          }
          const data = await response.json();
          setPokemonData(data);
          setCurrentPokemonId(data.id);
          setInputValue('');
          setSuggestions([]);
          setErrorMessage('');
        } catch (error) {
          console.error(error);
          setPokemonData(null);
          setCurrentPokemonId(null); // Reset current ID
          setInputValue('');
          setErrorMessage('Pokemon not found');
          setSuggestions([]);
        }
      }
    }
  };

  const handleSubmit = (event) => {       // This function is called when the form is submitted, typically by pressing the enter key or clicking a submit button.
    if (event) {
      event.preventDefault();
    }
    if (inputValue.trim() !== '') {
      setCurrentPokemonId(inputValue.toLowerCase());
      setInputValue(''); // Clear input field after submission
      setSuggestions([]);
    } else {
      // Show an error message or handle the case where no input is provided
      setErrorMessage('Please enter a Pokémon name or id.');
    }
  };

  const handlePreviousClick = () => {
    setCurrentPokemonId((prevId) => Math.max(prevId - 1, 1)); // Ensure id doesn't go below 1
  };

  const handleNextClick = () => {
    setCurrentPokemonId((prevId) => {
      const nextId = parseInt(prevId, 10) + 1;
      return nextId <= 10092 ? nextId.toString() : prevId;
    });
  };

  return (
    <div className="App">
      <header className="App-header">
      <div className="image-container">
          <img src={pokeballImage} alt="Pokeball" className="rotate-image" />
      </div>
        <h1>Pokémon Search</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter Pokémon name or id..."
            ref={inputRef}
          />
          <button type="submit">Search</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
        {inputRef.current && suggestions.length > 0 && inputValue.length >= 3 && (
          <div className="suggestions" data-testid="suggestion-container" style={{ top: inputRef.current.offsetTop + inputRef.current.offsetHeight, left: inputRef.current.offsetLeft }}>
            {suggestions.map((name) => (
              <div key={name} onClick={() => handleSuggestionClick(name)}>
                {name}
              </div>
            ))}
          </div>
        )}
        {pokemonData && (
          <div>
            <h2>{myFavorite}</h2>
            <h2>{pokemonData.name}</h2>
            <p>Number: {pokemonData.id}</p>
            <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          </div>
        )}
        <div>
          <button onClick={handlePreviousClick}>Previous</button>
          <button onClick={handleNextClick}>Next</button>
        </div>
        <div>
        <p>Do you know my favorite Pokémon?</p>
        </div>
      </header>
    </div>
  );
}

export default App;