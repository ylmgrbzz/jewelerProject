import React from "react";
import "./Takoz.css";
import { Link, useNavigate } from "react-router-dom";

const Takoz = () => {
  const navigate = useNavigate();

  const backToPage = () => {
    navigate("/jeweler");
  };

  return (
    <div className="container">
      <div>
        <a to="#" className="btn btn-primary back-button" onClick={backToPage}>
          Geri Dön
        </a>
      </div>
      <h1 className="menu-title">TAKOZ EKRANI</h1>

      <Link to="/takozAlis" className="btn btn-primary btn-lg menu-button">
        Takoz Alış
      </Link>
      <Link to="/takozSatis" className="btn btn-success btn-lg menu-button">
        Takoz Satış
      </Link>
      <Link to="/takozTasima" className="btn btn-secondary btn-lg menu-button">
        Takoz Taşıma
      </Link>
    </div>
  );
};

export default Takoz;
