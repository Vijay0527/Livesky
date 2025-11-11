export default function Favorites({ favorites, searchCity }) {
  if (favorites.length === 0) return null;

  return (
    <div className="favorites">
      <h3>Favorites</h3>
      <div className="fav-list">
        {favorites.map((city, i) => (
          <button key={i} onClick={() => searchCity(city)}>
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}