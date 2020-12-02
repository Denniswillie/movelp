import logo from './logo.svg';
import './App.css';

function App() {

  function handleClick() {
    fetch("/testRoute")
      .then(res => res.text())
      .then(console.log);
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={handleClick}>Press this button to fetch from server and log to console.</button>
      </header>
    </div>
  );
}

export default App;
