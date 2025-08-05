import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { OPEN_WEATHER_API_KEY, GOOGLE_MAPS_API_KEY } from '../apiKeys';

function WeatherDetails() {
  const { city } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!weatherData) return <div className="text-center mt-10">City not found.</div>;

  const { main, weather, coord } = weatherData;

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Weather in {city}</h2>
      <p>Temperature: {main.temp}°C</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Condition: {weather[0].description}</p>

      {/* Bonus: Google Maps Embed */}
      <div className="mt-6">
        <iframe
          width="100%"
          height="400"
          frameBorder="0"
          style={{ border: 0 }}
          src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${coord.lat},${coord.lon}`}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default WeatherDetails;
