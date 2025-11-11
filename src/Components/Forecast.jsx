export default function Forecast({ forecast, unit }) {
  const daily = forecast.list.filter((_, i) => i % 8 === 0).slice(0, 5);

  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {daily.map((day, i) => (
          <div key={i} className="day">
            <p>{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="icon" />
            <p>{Math.round(day.main.temp)}°</p>
            <small>{day.weather[0].description}</small>
          </div>
        ))}
      </div>
    </div>
  );
}