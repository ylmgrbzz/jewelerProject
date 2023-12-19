import React from "react";
import "./Kagit.css";
import { Link, useNavigate } from "react-router-dom";

const Kagit = () => {
  const navigate = useNavigate();

  const backToPage = () => {
    navigate("/jeweler");
  };
  return (
    <div className="container">
      <div>
        <Link
          to="/jeweler"
          className="btn btn-primary back-button"
          onClick={backToPage()}
        >
          Geri Dön
        </Link>
      </div>
      <h1 className="menu-title">KAĞIT EKRANI</h1>

      <Link to="/kagit/alis" className="btn btn-primary btn-lg menu-button">
        Kağıt Alış
      </Link>
      <Link to="/kagit/satis" className="btn btn-success btn-lg menu-button">
        Kağıt Satış
      </Link>
      <Link to="/kagit/tasima" className="btn btn-secondary btn-lg menu-button">
        Kağıt Taşıma
      </Link>
    </div>
  );
};

export default Kagit;
