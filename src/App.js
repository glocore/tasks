import React from "react";
import { Todos } from "./features/todos/Todos";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Todos />
      </header>
    </div>
  );
}

export default App;
