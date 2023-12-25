import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MusteriTanimlama.css";
import axios from "axios";

const MusteriTanimlama = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    unvan: "",
    ad_soyad: "",
    gsm1: "",
    gsm2: "",
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

  const submitForm = async (event) => {
    try {
      event.preventDefault();

      // Get the access token from local storage
      const accessToken = localStorage.getItem("accessToken");

      // Set up an Axios instance with the access token in the headers
      const axiosInstance = axios.create({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Your API endpoint for submitting the form
      const apiUrl = "http://52.29.240.45:3001/v1/musteriOlustur";

      // Send a POST request with the form data using the Axios instance
      const response = await axiosInstance.post(apiUrl, formData);

      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
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
      formData.ad_soyad &&
      formData.gsm1 &&
      formData.gsm2 &&
      formData.adres
    );
  };

  return (
    <div>
      {/* <a
        href="#"
        class="btn btn-primary back-musteriButton"
        onClick={backToPage()}
      >
        Geri Dön
      </a> */}
      <form
        style={{ width: "70%", height: "130%", marginTop: "180px" }}
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
