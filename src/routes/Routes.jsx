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
import { TakozPage } from "../pages/TakozPage";
import KagitPage from "../pages/KagitPage";
import TakozAlisPage from "../pages/TakozAlisPage";
import TakozSatisPage from "../pages/TakozSatisPage";
import TakozTasimaPage from "../pages/TakozTasimaPage";

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/jeweler" element={<JewelerPage />} />
      <Route path="/musteriTanimlama" element={<MusteriTanimlamaPage />} />
      <Route path="/subelerVirman" element={<SubelerVirmanPage />} />
      <Route path="/gider" element={<GiderPage />} />
      <Route path="/takoz" element={<TakozPage />}></Route>
      <Route path="/kagit" element={<KagitPage />} />
      <Route path="/takozAlis" element={<TakozAlisPage />} />
      <Route path="/takozSatis" element={<TakozSatisPage />} />
      <Route path="/takozTasima" element={<TakozTasimaPage />} />

      <Route path="/" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoutesApp;
