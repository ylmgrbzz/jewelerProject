import React from "react";
import LoginPage from "../pages/LoginPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import JewelerPage from "../pages/JewelerPage";

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/jeweler" element={<JewelerPage />} />

      <Route path="/" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoutesApp;
