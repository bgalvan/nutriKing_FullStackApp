import React from "react";
import { List, Datagrid, TextField } from "react-admin";

function RecipeList(props) {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="body" />
        <TextField source="" />
        <TextField source="" />
      </Datagrid>
    </List>
  );
}

export default RecipeList;
