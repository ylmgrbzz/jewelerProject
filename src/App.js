import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RoutesApp from "./routes/Routes";

function App() {
  return (
    <Router>
      <div className="App">
        <RoutesApp />
      </div>
    </Router>
  );
}

export default App;
