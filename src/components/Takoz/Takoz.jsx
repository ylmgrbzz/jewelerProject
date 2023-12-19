import React from "react";
import "./Takoz.css";
import { useNavigate } from "react-router-dom";

const Takoz = () => {
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
      <h1 class="menu-title">TAKOZ EKRANI</h1>

      <a href="/takoz/alis" class="btn btn-primary btn-lg menu-button">
        Takoz Alış
      </a>
      <a href="/takoz/satis" class="btn btn-success btn-lg menu-button">
        Takoz Satış
      </a>
      <a href="/takoz/tasima" class="btn btn-secondary btn-lg menu-button">
        Takoz Taşıma
      </a>
    </div>
  );
};

export default Takoz;
