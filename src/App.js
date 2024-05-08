import React, { useState, useEffect, useRef } from 'react'; 
import './App.css';
import pokeballImage from './pokeball.svg';

function App() {
  // States storing variables declaration
  const [inputValue, setInputValue] = useState('');             
  const [pokemonData, setPokemonData] = useState(null);         
  const [errorMessage, setErrorMessage] = useState('');         
  const [currentPokemonId, setCurrentPokemonId] = useState(1);  
  const [myFavorite, setMyFavorite] = useState("");             
  const [allPokemonNames, setAllPokemonNames] = useState([]);   
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  // Fetch all Pokémon names on the API to be presented as possible suggestions
  useEffect(() => {
    const fetchAllPokemonNames = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1118');
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon names');
        }
        const data = await response.json();
        const names = data.results.map((pokemon) => pokemon.name);
        setAllPokemonNames(names);  // Vector with all pokemon names
      } catch (error) {
        console.error(error);
        setErrorMessage('Failed to fetch Pokémon names');
      }
    };

    fetchAllPokemonNames();
  }, []);

  // Fetch Pokémon data from the PokeAPI
  useEffect(() => {
    const fetchPokemonData = async (id) => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);  // Send GET request
        if (!response.ok) {
          throw new Error('Pokemon not found');
        }
        const data = await response.json();             
        setPokemonData(data); // save the Pokémon data retrieved from the API                     
        setCurrentPokemonId(data.id); // save the ID of the Pokémon queried, to be able to click next or previous because they relly on the ID and not the name      
        // Check if the Pokémon is my favorite         
        if (data.name.toLowerCase() === 'hydreigon') {
          setMyFavorite("My favorite");
        } else {
          setMyFavorite(null)
        }
        setErrorMessage('');  // When a Pokémon is found, make sure there are no appearing error messages
      } catch (error) {
        console.error(error);
        setPokemonData(null);
        setErrorMessage('Pokemon not found');
      }
    };

    fetchPokemonData(currentPokemonId);
  }, [currentPokemonId, inputValue]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    // Only present suggestions when at least 3 characters are inputted
    if (value.length >= 3) {
      setSuggestions(
        allPokemonNames.filter((name) => name.toLowerCase().startsWith(value.toLowerCase()))
      );
    } else {
      setSuggestions([]);
    }
  };

  // Do the query when a suggestion is clicked
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
          setInputValue('');  // remove inputed value when query is performed
          setSuggestions([]);
          setErrorMessage('');
        } catch (error) {
          console.error(error);
          setPokemonData(null);
          setCurrentPokemonId(null);
          setInputValue('');
          setErrorMessage('Pokemon not found');
          setSuggestions([]);
        }
      }
    }
  };

  const handleSubmit = (event) => { 
    if (event) {
      event.preventDefault();
    }
    if (inputValue.trim() !== '') {
      setCurrentPokemonId(inputValue.toLowerCase());
      setInputValue(''); 
      setSuggestions([]);
    } else {
      // Show an error message or handle the case where no input is provided
      setErrorMessage('Please enter a Pokémon name or id.');
    }
  };

  // Search for previous Pokémon ID
  const handlePreviousClick = () => {
    setCurrentPokemonId((prevId) => Math.max(prevId - 1, 1)); // Ensure ID doesn't go below 1
  };

  // Search for next Pokémon ID
  const handleNextClick = () => {
    setCurrentPokemonId((prevId) => {
      const nextId = parseInt(prevId, 10) + 1;
      return nextId <= 10092 ? nextId.toString() : prevId;  // Ensure ID doesn't go above 10092
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