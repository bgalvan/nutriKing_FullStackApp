import React from "react";
import { Admin, Resource } from "react-admin";
import restProvider from "ra-data-simple-rest";
import RecipeList from "./components/RecipeList";

function App() {
  return (
    <Admin dataProvider={restProvider("http://localhost:3001")}>
      <Resource name="recipes" list={RecipeList} />
    </Admin>
  );
}

export default App;
