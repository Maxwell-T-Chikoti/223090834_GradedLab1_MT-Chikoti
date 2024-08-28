
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Navbar = () => {
  const [weather, setWeather] = useState(null);
  const [time, setTime] = useState(null);
  const [location, setLocation] = useState('Johannesburg');

  useEffect(() => {
    // Fetch weather data
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=14f8eedc3dc579af9490863381055690`);
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    // Fetch time data
    const fetchTime = async () => {
      try {
        const response = await axios.get(`http://worldtimeapi.org/api/timezone/Africa/Johannesburg`);
        setTime(response.data);
      } catch (error) {
        console.error('Error fetching time data:', error);
      }
    };

    fetchWeather();
    fetchTime();
  }, [location]);

  return (
    <nav>
      <h1>Harry Potter with weather and time </h1>
      <div>
        <h2>Weather in {location}</h2>
        {weather && (
          <div>
            <p>{weather.weather[0].description}</p>
            <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
          </div>
        )}
        <h2>Time in {location}</h2>
        {time && (
          <div>
            <p>{new Date(time.datetime).toLocaleTimeString()}</p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
