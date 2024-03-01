import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Addtask from "./components/Addtask";
import Login from "./components/Login";

function App() {
  const [allTodos, setTodos] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todo" element={<Addtask />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
