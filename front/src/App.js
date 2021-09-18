import React from 'react';
import StoreProvider from "./components/StoreProvider";
import Form from "./components/Form";
import TableItems from "./components/TableItems";

function App() {
  return <StoreProvider>
    <h3>To-Do List</h3>
    <Form />
    <TableItems />
  </StoreProvider>
}

export default App;
