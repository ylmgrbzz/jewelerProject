import React from "react";
import "./JewelerMain.css";
import { Link } from "react-router-dom";

const JewelerMain = () => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("editedData");
    localStorage.removeItem("localstorage_kagitsatim");
    localStorage.removeItem("localstorage_kagittaşıma");
    localStorage.removeItem("localstorage_kagitalim");
    localStorage.removeItem("localstorage_takozalim");
    localStorage.removeItem("localstorage_takozsatim");
    localStorage.removeItem("localstorage_takoztaşıma");
    localStorage.removeItem("localstorage_virman");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  console.log(user);

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
          <Link
            to={"/login"}
            onClick={handleLogout}
            className="btn btn-primary back-musteriButton"
          >
            ÇIKIŞ YAP
          </Link>
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
        {user && user.role === "admin" && (
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
        )}
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
        {user && user.role === "admin" && (
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
        )}
      </div>
    </div>
  );
};

export default JewelerMain;
