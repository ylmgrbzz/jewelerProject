import React, { useEffect } from "react";
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
import { KagitAlisPage } from "../pages/KagitAlisPage";
import { KagitSatisPage } from "../pages/KagitSatisPage";
import { KagitTasimaPage } from "../pages/KagitTasimaPage";
import RaporPage from "../pages/RaporPage";
import KasaPage from "../pages/KasaPage";
import VadePage from "../pages/VadePage";
import Admin from "../components/Admin/Admin";
import { useNavigate } from "react-router-dom";

const RoutesApp = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("useEffect triggered"); // Add this line
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
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
      <Route path="/kagitAlis" element={<KagitAlisPage />} />
      <Route path="/kagitSatis" element={<KagitSatisPage />} />
      <Route path="/kagitTasima" element={<KagitTasimaPage />} />
      <Route path="/rapor" element={<RaporPage />}></Route>
      <Route path="/kasa" element={<KasaPage />}></Route>
      <Route path="/vade" element={<VadePage />}></Route>
      <Route path="/admin" element={<Admin />}></Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default RoutesApp;
