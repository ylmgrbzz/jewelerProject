import React from "react";
import "./Kagit.css";
import { useNavigate } from "react-router-dom";

const Kagit = () => {
  const navigate = useNavigate();

  const backToPage = () => {
    navigate("/jeweler");
  };
  return (
    <div class="container">
      <div>
        <a href="#" class="btn btn-primary back-button" onClick={backToPage()}>
          Geri Dön
        </a>
      </div>
      <h1 class="menu-title">KAĞIT EKRANI</h1>

      <a href="/kagit/alis" class="btn btn-primary btn-lg menu-button">
        Kağıt Alış
      </a>
      <a href="/kagit/satis" class="btn btn-success btn-lg menu-button">
        Kağıt Satış
      </a>
      <a href="/kagit/tasima" class="btn btn-secondary btn-lg menu-button">
        Kağıt Taşıma
      </a>
    </div>
  );
};

export default Kagit;
