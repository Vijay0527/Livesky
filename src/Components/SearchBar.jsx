export default function SearchBar({ searchCity, city, setCity }) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && searchCity(city)}
      />
      <button onClick={() => searchCity(city)}>Search</button>
    </div>
  );
}