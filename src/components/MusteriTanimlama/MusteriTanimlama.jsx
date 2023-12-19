import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MusteriTanimlama.css";

const MusteriTanimlama = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    unvan: "",
    isim: "",
    tel1: "",
    tel2: "",
    email: "",
    adres: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Form is valid. Submitting...");
    } else {
      console.log("Form is invalid. Please check your input.");
    }
  };

  const backToPage = () => {
    navigate("/jeweler");
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      formData.email.match(emailRegex) &&
      formData.unvan &&
      formData.isim &&
      formData.tel1 &&
      formData.tel2 &&
      formData.adres
    );
  };
  return (
    <div>
      <form
        style={{ width: "70%", height: "100%", marginTop: "10px" }}
        method="post"
      >
        <a href="#" class="btn btn-primary back-button" onClick={backToPage()}>
          Geri Dön
        </a>
        <h1 class="form-title">CARİ KAYIT EKRANI</h1>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="unvan"
          >
            Unvan
          </label>
          <input
            type="text"
            class="form-control"
            name="unvan"
            id="unvan"
            placeholder="Unvan"
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="ad"
          >
            Ad Soyad
          </label>
          <input
            type="text"
            class="form-control"
            name="isim"
            id="ad"
            placeholder="Ad Soyad"
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="tel1"
          >
            GSM 1
          </label>
          <input
            type="text"
            class="form-control"
            name="tel1"
            id="tel1"
            placeholder="Tel1"
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="tel2"
          >
            GSM 2
          </label>
          <input
            type="text"
            class="form-control"
            name="tel2"
            id="tel2"
            placeholder="Tel2"
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="email"
          >
            E-Mail
          </label>
          <input
            required
            type="email"
            class="form-control"
            name="email"
            id="email"
            placeholder="E-Mail"
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="adres"
          >
            Adres
          </label>
          <textarea
            class="form-control"
            name="adres"
            id="adres"
            rows="4"
            placeholder="Adres"
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

export default MusteriTanimlama;
