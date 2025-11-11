export default function WeatherCard({ weather, unit, isFav, toggleFav }) {
  const icon = weather.weather[0].icon;
  const windUnit = unit === 'metric' ? 'm/s' : 'mph';

  return (
    <div className="weather-card">
      <div className="main-info">
        <div>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <button onClick={toggleFav} className="fav-btn" aria-label={isFav ? "Remove" : "Add"}>
          <span className="heart-icon">
            {isFav ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            )}
          </span>
        </button>
      </div>

      <div className="temp">
        <img src={`https://openweathermap.org/img/wn/${icon}@4x.png`} alt="weather" />
        <h1>{Math.round(weather.main.temp)}°</h1>
      </div>

      <p className="desc">{weather.weather[0].description}</p>

      <div className="details">
        <div><span>Feels like</span> {Math.round(weather.main.feels_like)}°</div>
        <div><span>Humidity</span> {weather.main.humidity}%</div>
        <div><span>Wind</span> {weather.wind.speed} {windUnit}</div>
        <div><span>UV Index</span> N/A</div>
      </div>
    </div>
  );
}