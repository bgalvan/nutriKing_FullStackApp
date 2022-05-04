const { useState, useEffect } = React;

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(function (response) {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const listItems = data.map((item) => <li>{item.address.city}</li>);

  return (
    <div>
      <div>React & Axios api</div>
      <ul>{listItems}</ul>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
