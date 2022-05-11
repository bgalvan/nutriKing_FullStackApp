import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Form from "./components/form";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/1")
      .then(function (response) {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const listItems = data.map((item) => <li>{item.title}</li>);

  return (
    // <Router>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Form />
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

        <br></br>
      </header>
    </div>
    // </Router>
  );
}

export default App;
