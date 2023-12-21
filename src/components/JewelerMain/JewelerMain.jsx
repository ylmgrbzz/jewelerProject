import React from "react";
import "./JewelerMain.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const JewelerMain = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "30px",
        color: "green",
      }}
      class="container mt-5"
    >
      <div class="row">
        <div class="col-md-4">
          <a
            onClick={handleLogout}
            className="btn btn-primary back-musteriButton"
          >
            ÇIKIŞ YAP
          </a>
          <div class="card colored-card bg-light">
            <div class="card-body">
              <h1
                style={{ textAlign: "center", margin: "15px" }}
                class="card-title"
              >
                Müşteri Tanımlama
              </h1>
              <p class="card-text"></p>
              <Link to="/musteriTanimlama" className="stretched-link"></Link>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card colored-card bg-light">
            <div class="card-body">
              <h1
                style={{ textAlign: "center", margin: "15px" }}
                class="card-title"
              >
                Şubeler Virman
              </h1>
              <p class="card-text"></p>
              <Link to="/subelerVirman" className="stretched-link"></Link>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card colored-card bg-light">
            <div class="card-body">
              <h1
                style={{ textAlign: "center", margin: "15px" }}
                class="card-title"
              >
                Vade
              </h1>
              <p class="card-text"></p>
              <Link to="/vade" className="stretched-link"></Link>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card colored-card bg-light">
            <div class="card-body">
              <h1
                style={{ textAlign: "center", margin: "15px" }}
                class="card-title"
              >
                Takoz
              </h1>
              <p class="card-text"></p>
              <Link to="/takoz" className="stretched-link"></Link>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card colored-card bg-light">
            <div class="card-body">
              <h1
                style={{ textAlign: "center", margin: "15px" }}
                class="card-title"
              >
                Kağıt
              </h1>
              <p class="card-text"></p>
              <Link to="/kagit" className="stretched-link"></Link>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card colored-card bg-light">
            <div class="card-body">
              <h1
                style={{ textAlign: "center", margin: "15px" }}
                class="card-title"
              >
                Kasa
              </h1>
              <p class="card-text"></p>
              <Link to="/kasa" className="stretched-link"></Link>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card colored-card bg-light">
            <div class="card-body">
              <h1
                style={{ textAlign: "center", margin: "15px" }}
                class="card-title"
              >
                Admin Paneli
              </h1>
              <p class="card-text"></p>
              <Link to="/admin" className="stretched-link"></Link>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card colored-card bg-light">
            <div class="card-body">
              <h1
                style={{ textAlign: "center", margin: "15px" }}
                class="card-title"
              >
                Gider
              </h1>
              <p class="card-text"></p>
              <Link to="/gider" className="stretched-link"></Link>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card colored-card bg-light">
            <div class="card-body">
              <h1
                style={{ textAlign: "center", margin: "15px" }}
                class="card-title"
              >
                Rapor
              </h1>
              <p class="card-text"></p>
              <Link to="/rapor" className="stretched-link"></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JewelerMain;
