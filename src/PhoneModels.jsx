import React, { useState, useEffect } from 'react';

const PhoneModels = () => {
  const [phones, setPhones] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    brand: '',
    priceRange: '',
    keyFeatures: '',
  });

  useEffect(() => {
    fetch(
      'https://www.postman.com/blue-flare-7250/workspace/kyaw-s/documentation/1106401-e8233ba8-69ee-4820-9590-4b8ac9d0f477'
    )
      .then((response) => response.json())
      .then((data) => {
        setPhones(data);
      })
      .catch((error) => {
        console.error('There was an error fetching the phone data!', error);
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

  const filteredPhones = phones.filter((phone) => {
    return (
      phone.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.brand === '' || phone.brand === filters.brand) &&
      (filters.priceRange === '' || phone.priceRange === filters.priceRange) &&
      (filters.keyFeatures === '' ||
        phone.keyFeatures.includes(filters.keyFeatures))
    );
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search by brand"
        value={searchTerm}
        onChange={handleSearch}
      />
      <select name="brand" value={filters.brand} onChange={handleFilterChange}>
        <option value="">All Brands</option>
        <option value="Apple">Apple</option>
        <option value="Samsung">Samsung</option>
        <option value="Nokia">Nokia</option>
        <option value="Huawei">Huawei</option>
        <option value="Hisense">Hisense</option>
      </select>
      <select
        name="priceRange"
        value={filters.priceRange}
        onChange={handleFilterChange}
      >
        <option value="">All Price Ranges</option>
        <option value="low">Low</option>
        <option value="mid">Mid</option>
        <option value="high">High</option>
      </select>
      <select
        name="keyFeatures"
        value={filters.keyFeatures}
        onChange={handleFilterChange}
      >
        <option value="">All Features</option>
        <option value="5G">5G</option>
        <option value="Waterproof">Waterproof</option>
        <option value="Dust REsistant">Dust resistant</option>
        <option value="4G">4G</option>
      </select>
      <ul>
        {filteredPhones.map((phone) => (
          <li key={phone.name}>
            {phone.name} - {phone.brand} - ${phone.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhoneModels;
