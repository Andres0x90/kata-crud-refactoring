import React from 'react';
import StoreProvider from "./components/StoreProvider";
import Form from "./components/Form";
import TableItems from "./components/TableItems";

function App() {
  return <StoreProvider>
    <div className="container-fluid">
      <h3>Gestor de tareas - Sofka U</h3>
      <Form />
      <TableItems />
    </div>
  </StoreProvider>
}

export default App;
