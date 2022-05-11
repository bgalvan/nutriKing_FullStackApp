import "../App.css";
import { useState } from "react";
import axios from "axios";

export default function Form() {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`The name you entered was: ${name}`);
    axios
      // .post("http://localhost:3001/recipes", {
      //   firstName: name,
      // })
      .post("http://localhost:3001/recipes", { name: "food", amount: "five" })
      .then(function (response) {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
  );
}

// handleSubmit(event) {
//   console.log("A name was submitted: " + this.state.value);
//   event.preventDefault();
//   axios
//     .post("http://localhost:3001/recipes", this.state.value)
//     .then(function (response) {
//       console.log(response.data);
//     })
//     .catch((error) => console.log(error));
// }
