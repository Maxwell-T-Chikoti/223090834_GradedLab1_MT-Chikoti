import React from 'react';

const CharacterDetails = ({ character, onBack }) => {
  if (!character) return null;

  return (
    <div>
      <button onClick={onBack}>Back</button>
      <h2>{character.name}</h2>
      <p>Gender: {character.gender}</p>
      <p>Species: {character.species}</p>
      <p>House: {character.house}</p>
      <p>Date of Birth: {character.dateOfBirth}</p>
      <p>Alive: {character.alive ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default CharacterDetails;
