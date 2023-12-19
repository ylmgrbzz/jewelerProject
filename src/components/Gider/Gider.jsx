import "./Gider.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Gider = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    giderTuru: "",
    harcamaKuru: "",
    harcamaTutari: "",
    aciklama: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "harcamaTutari" && !/^\d+$/.test(value)) {
      return;
    }

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
      <form
        style={{ width: "70%", height: "100%", marginTop: "10px" }}
        method="post"
        onSubmit={handleSubmit}
      >
        <a href="#" class="btn btn-primary back-giderButton">
          Geri Dön
        </a>
        <h1 class="form-title">GİDER KAYIT EKRANI</h1>

        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="giderTuru"
          >
            GİDER TÜRÜ
          </label>
          <input
            type="text"
            value={formData.giderTuru}
            onChange={handleInputChange}
            class="form-control"
            name="giderTuru"
            id="giderTuru"
            placeholder="TRANSFERİ GÖNDEREN KASA/ŞUBE SEÇİNİZ "
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="harcamaKuru"
          >
            HARCAMA KURU
          </label>
          <input
            type="text"
            class="form-control"
            value={formData.harcamaKuru}
            onChange={handleInputChange}
            name="harcamaKuru"
            id="harcamaKuru"
            placeholder="DOLAR $"
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="harcamaTutari"
          >
            HARCAMA TUTARI
          </label>
          <input
            type="text"
            value={formData.harcamaTutari}
            onChange={handleInputChange}
            class="form-control"
            name="harcamaTutari"
            id="harcamaTutari"
            placeholder="HARCAMA TUTARI GİRİNİZ"
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

export default Gider;
