import React, { useState, useEffect } from 'react';

const CharactersComponent = ({ onSelectCharacter }) => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    gender: '',
    alive: '',
    species: '',
  });

  useEffect(() => {
    fetch('https://hp-api.herokuapp.com/api/characters')
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredCharacters = characters.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.gender === '' || character.gender === filters.gender) &&
      (filters.alive === '' ||
        character.alive === (filters.alive === 'true')) &&
      (filters.species === '' || character.species === filters.species)
    );
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <select
        name="gender"
        value={filters.gender}
        onChange={handleFilterChange}
      >
        <option value="">All Genders</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <select name="alive" value={filters.alive} onChange={handleFilterChange}>
        <option value="">All Statuses</option>
        <option value="true">Alive</option>
        <option value="false">Deceased</option>
      </select>
      <select
        name="species"
        value={filters.species}
        onChange={handleFilterChange}
      >
        <option value="">All Species</option>
        <option value="human">Human</option>
        <option value="house-elf">House Elf</option>
        <option value="ghost">Ghost</option>
      </select>
      <ul>
        {filteredCharacters.map((character) => (
          <li key={character.name} onClick={() => onSelectCharacter(character)}>
            {character.name} - {character.species}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharactersComponent;
