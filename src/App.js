import logo from './logo.svg';
import './App.css';

import { getById } from './api/todos';

function App() {

  const handleClick = async () => {
    const data = await getById(1);
    console.log(data);
  }
  const handleClick2 = async () => {
    const data = await getById(999);
    console.log(data);
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
      </header>
      <button onClick={handleClick}>
        Do Sthing
      </button>
      <button onClick={handleClick2}>
        Do Sthing2
      </button>
    </div>
  );
}

export default App;
