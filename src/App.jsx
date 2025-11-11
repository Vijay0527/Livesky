import { useState, useEffect } from 'react';
import Header from './Components/Header';
import SearchBar from './Components/SearchBar';
import WeatherCard from './Components/WeatherCard';
import Forecast from './Components/Forecast';
import Favorites from './Components/Favorites';
import LoadingSkeleton from './Components/LoadingSkeleton';
import './index.css';

const API_KEY = '54b69ab17e44723fe4a145f6e7f039af';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('fav') || '[]'));
  const [unit, setUnit] = useState('metric');
  const [darkMode, setDarkMode] = useState(true);

  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    setError('');
    try {
      const [wRes, fRes] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`)
      ]);

      if (!wRes.ok || !fRes.ok) throw new Error();

      const weatherData = await wRes.json();
      const forecastData = await fRes.json();

      setWeather(weatherData);
      setForecast(forecastData);
      setCity(weatherData.name);
    } catch {
      setError('Failed to load. Using Delhi...');
      searchCity('Delhi');
    } finally {
      setLoading(false);
    }
  };

  const searchCity = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    try {
      const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=1&appid=${API_KEY}`);
      const geoData = await geoRes.json();
      if (!geoData.length) throw new Error();
      await fetchWeather(geoData[0].lat, geoData[0].lon);
    } catch {
      setError(`"${query}" not found. Try "Mumbai", "Delhi"`);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => searchCity('Delhi')
      );
    } else {
      searchCity('Delhi');
    }
  }, [unit]);

  useEffect(() => {
    localStorage.setItem('fav', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFav = () => {
    if (!weather) return;
    const name = weather.name;
    setFavorites(prev => 
      prev.includes(name) 
        ? prev.filter(x => x !== name) 
        : [...prev, name]
    );
  };

  const getBgClass = () => {
    if (!weather) return 'default';
    const main = weather.weather[0].main.toLowerCase();
    if (main.includes('clear')) return 'sunny';
    if (main.includes('cloud')) return 'cloudy';
    if (main.includes('rain') || main.includes('drizzle')) return 'rainy';
    if (main.includes('snow')) return 'snowy';
    return 'default';
  };

  const bg = getBgClass();

  return (
    <div className={`app ${bg} ${darkMode ? 'dark' : 'light'}`}>
      <div className="overlay"></div>
      <div className="container">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} unit={unit} setUnit={setUnit} />
        <SearchBar searchCity={searchCity} city={city} setCity={setCity} />

        {loading && <LoadingSkeleton />}
        {error && <div className="error">{error}</div>}

        {weather && (
          <>
            <WeatherCard weather={weather} unit={unit} isFav={favorites.includes(weather.name)} toggleFav={toggleFav} />
            <Forecast forecast={forecast} unit={unit} />
          </>
        )}

        <Favorites favorites={favorites} searchCity={searchCity} />
      </div>

      {weather && (weather.weather[0].main.toLowerCase().includes('rain') || weather.weather[0].main.toLowerCase().includes('drizzle')) && (
        <div className="animations">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="rain" style={{ 
              left: `${Math.random() * 100}%`, 
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`
            }} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;