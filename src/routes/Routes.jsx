import React from "react";
import LoginPage from "../pages/LoginPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import JewelerPage from "../pages/JewelerPage";
import MusteriTanimlamaPage from "../pages/MusteriTanimlamaPage";
import SubelerVirmanPage from "../pages/SubelerVirmanPage";
import GiderPage from "../pages/GiderPage";

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/jeweler" element={<JewelerPage />} />
      <Route path="/musteriTanimlama" element={<MusteriTanimlamaPage />} />
      <Route path="/subelerVirman" element={<SubelerVirmanPage />} />
      <Route path="/gider" element={<GiderPage />} />

      <Route path="/" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoutesApp;
