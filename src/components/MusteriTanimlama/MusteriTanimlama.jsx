import "./MusteriTanimlama.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const MusteriTanimlama = () => {
  const [formData, setFormData] = useState({
    unvan: "",
    ad_soyad: "",
    gsm1: "",
    gsm2: "",
    email: "",
    adres: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const submitForm = async (event) => {
    try {
      event.preventDefault();
      if (!validateForm()) {
        window.alert("Lütfen formu eksiksiz doldurunuz.");
        return;
      }
      const accessToken = localStorage.getItem("accessToken");

      const apiUrl = "http://52.29.240.45:3001/v1/musteriOlustur";

      const response = await api.post(apiUrl, formData);

      console.log("Server response:", response.data);
      window.alert("Form başarıyla gönderildi.");
      event.target.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("error");
    }
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    return (
      formData.email.match(emailRegex) &&
      formData.unvan.trim() !== "" &&
      formData.ad_soyad.trim() !== "" &&
      formData.gsm1.match(phoneRegex) &&
      formData.gsm2.match(phoneRegex) &&
      formData.adres.trim() !== ""
    );
  };

  return (
    <div>
      <div>
        <Link to="/jeweler" className="btn btn-primary back-button">
          Geri Dön
        </Link>
      </div>
      <form
        style={{ width: "70%", height: "100%", marginTop: "10px" }}
        onSubmit={submitForm}
      >
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
            className="form-control"
            id="unvan"
            placeholder="Unvan"
            onChange={handleChange}
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
            className="form-control"
            id="ad_soyad"
            placeholder="Ad Soyad"
            onChange={handleChange}
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
            className="form-control"
            id="gsm1"
            placeholder="GSM 1"
            onChange={handleChange}
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
            className="form-control"
            id="gsm2"
            placeholder="GSM 2"
            onChange={handleChange}
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
            className="form-control"
            id="email"
            placeholder="E-Mail"
            onChange={handleChange}
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
            className="form-control"
            id="adres"
            rows="4"
            placeholder="Adres"
            onChange={handleChange}
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
