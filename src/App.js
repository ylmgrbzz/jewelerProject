import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RoutesApp from "./routes/Routes";
import InitialRedirect from "./pages/InitialRedirect";
// import "./App.css";

function App() {
  return (
    <Router>
      <div>
        {/* <InitialRedirect /> */}

        <RoutesApp />
      </div>
    </Router>
  );
}

export default App;
