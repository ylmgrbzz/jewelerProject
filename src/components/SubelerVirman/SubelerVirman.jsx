import "./SubelerVirman.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SubelerVirman = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gonderenKasa: "",
    transferCinsi: "",
    transfer: "",
    alici: "",
    aciklama: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const backToPage = () => {
    navigate("/jeweler");
  };

  return (
    <div>
      <a
        onClick={backToPage()}
        href="#"
        class="btn btn-primary back-subelerButton"
      >
        Geri Dön
      </a>
      <form
        style={{ width: "70%", height: "90%", marginTop: "10px" }}
        method="post"
        onSubmit={handleSubmit}
      >
        <h1 class="form-title">ŞUBELER VİRMAN</h1>

        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="gonderenKasa"
          >
            Gönderen Kasa/Şube
          </label>
          <input
            type="text"
            value={formData.gonderenKasa}
            onChange={handleInputChange}
            class="form-control"
            name="gonderenKasa"
            id="gonderenKasa"
            placeholder="TRANSFERİ GÖNDEREN KASA/ŞUBE SEÇİNİZ "
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="transferCinsi"
          >
            TRASNFER CİNSİ
          </label>
          <input
            type="text"
            class="form-control"
            value={formData.transferCinsi}
            onChange={handleInputChange}
            name="transferCinsi"
            id="transferCinsi"
            placeholder="TRANSFER CİNSİNİ SEÇİNİZ"
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="transfer"
          >
            TRANSFER TUTARI
          </label>
          <input
            type="text"
            value={formData.transfer}
            onChange={handleInputChange}
            class="form-control"
            name="transfer"
            id="transfer"
            placeholder="TRANSFER TUTARI GİRİNİZ"
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="alici"
          >
            ALICI KASA/ŞUBE
          </label>
          <input
            type="text"
            class="form-control"
            value={formData.alici}
            onChange={handleInputChange}
            name="alici"
            id="alici"
            placeholder="TRANSFERİ ALACAK KASA/ŞUBE SEÇİNİZ"
          />
        </div>

        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="aciklama"
          >
            AÇIKLAMA
          </label>
          <textarea
            class="form-control"
            value={formData.aciklama}
            onChange={handleInputChange}
            name="aciklama"
            id="aciklama"
            rows="4"
            placeholder="AÇIKLAMA"
          ></textarea>
        </div>
        <button
          style={{
            marginBottom: "10px",
            fontWeight: "bold",
            fontSize: "x-large",
          }}
          type="submit"
          class="btn btn-submit"
        >
          Gönder
        </button>
      </form>
    </div>
  );
};

export default SubelerVirman;
