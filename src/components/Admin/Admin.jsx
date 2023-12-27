import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  const navigate = useNavigate();

  const backToPage = () => {
    navigate("/jeweler");
  };
  return (
    <div className="container">
      <div>
        <Link to="/jeweler" className="btn btn-primary back-button">
          Geri Dön
        </Link>
      </div>
      <h1 className="menu-title">Admin Paneli</h1>

      <Link to="/kagitAlis" className="btn btn-primary btn-lg menu-button">
        Kağıt
      </Link>
      <Link to="/takozAlis" className="btn btn-success btn-lg menu-button">
        Takoz
      </Link>
      <Link
        to="/subelerVirman"
        className="btn btn-secondary btn-lg menu-button"
      >
        Şubeler Virman
      </Link>
    </div>
  );
};

export default Admin;
