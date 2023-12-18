import React from "react";
import "./JewelerMain.css";

const JewelerMain = () => {
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
          <div class="card colored-card bg-light">
            <div class="card-body">
              <h1
                style={{ textAlign: "center", margin: "15px" }}
                class="card-title"
              >
                Müşteri Tanımlama
              </h1>
              <p class="card-text"></p>
              {/* <a href="/cari" class="stretched-link"></a> */}
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
              {/* <a href="/subelerVirman" class="stretched-link"></a> */}
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
              {/* <a href="/vade" class="stretched-link"></a> */}
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
              {/* <a href="/takoz" class="stretched-link"></a> */}
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
              {/* <a href="/kagit" class="stretched-link"></a> */}
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
              {/* <a href="/kasa" class="stretched-link"></a> */}
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
              {/* <a href="/" class="stretched-link"></a> */}
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
              {/* <a href="/gider" class="stretched-link"></a> */}
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
              {/* <a href="/rapor" class="stretched-link"></a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JewelerMain;
