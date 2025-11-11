export default function Header({ darkMode, setDarkMode, unit, setUnit }) {
  return (
    <header className="header">
      <h1>Livesky</h1>
      <div className="controls">
        <button onClick={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}>
          °{unit === 'metric' ? 'C' : 'F'}
        </button>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Light' : 'Dark'}
        </button>
      </div>
    </header>
  );
}