import React, { useState } from 'react';
import CharactersComponent from './CharactersComponent.jsx';
import CharacterDetails from './CharacterDetails.jsx';
import PhoneModels from './PhoneModels.jsx';
import './App.css';


const App = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
  };

  const handleCloseCharacterDetails = () => {
    setSelectedCharacter(null);
  };

  return (
    <div>
      <h1>Harry Potter Characters</h1>
      <CharactersComponent onSelectCharacter={handleSelectCharacter} />
      {selectedCharacter && (
        <div>
          <CharacterDetails character={selectedCharacter} onBack={handleCloseCharacterDetails} />
          <button onClick={handleCloseCharacterDetails}>Close</button>
        </div>
      )}
      <h1>Phone Models Component</h1>
      <PhoneModels />
    </div>
  );
};

export default App;
