import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/user/h")
      .then(function (response) {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const listItems = data.map((item) => <li>{item.name}</li>);

  return (
    // <Router>
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
          <li>{listItems}</li>
        </a>
      </header>
    </div>
    // </Router>
  );
}

export default App;
