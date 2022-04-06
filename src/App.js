import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Homecomponent from "./Homecomponent";

function App() {
  return (
    <div className="App">
      <h1>Welcome to the Quiz section </h1>
      <div className="Quiz-container">
        <div className="Quiz-section">
          <h3>Section A </h3>

          <Homecomponent />
        </div>
        <div className="Quiz-section">
          <h3>Section B </h3>

          <Homecomponent />
        </div>
      </div>
    </div>
  );
}

export default App;
