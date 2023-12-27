import "./Gider.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";
import { Link } from "react-router-dom";

const Gider = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gider_turu: "",
    kur: "",
    tutar: "",
    aciklama: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "tutar" && !/^\d+$/.test(value)) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (
      formData.gider_turu &&
      formData.kur &&
      formData.tutar &&
      formData.aciklama
    ) {
      try {
        const response = await axios.post(
          "http://52.29.240.45:3001/v1/giderOlustur",
          {
            ...formData,
          }
        );
        window.alert("Form başarıyla gönderildi.");

        setFormData({
          gider_turu: "",
          kur: "",
          tutar: "",
          aciklama: "",
        });

        console.log("Form submitted:", response.data);
      } catch (error) {
        console.error("Error submitting form:", error);
        window.alert("Lütfen Tüm Değerleri Doğru Giriniz");
      }
    } else {
      window.alert("Lütfen Tüm Değerleri Doğru Giriniz  ");
    }
  };

  const backToPage = () => {
    navigate("/jeweler");
  };

  return (
    <div>
      <Link to="/jeweler" className="btn btn-primary back-button">
        Geri Dön
      </Link>
      <form
        style={{ width: "70%", height: "70%", marginTop: "20px" }}
        method="post"
        onSubmit={handleSubmit}
      >
        <h1 class="form-title">GİDER KAYIT EKRANI</h1>

        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="gider_turu"
          >
            GİDER TÜRÜ
          </label>
          <select
            type="text"
            value={formData.gider_turu}
            onChange={handleInputChange}
            class="form-control"
            name="gider_turu"
            id="gider_turu"
            placeholder="TRANSFERİ GÖNDEREN KASA/ŞUBE SEÇİNİZ "
          >
            <option style={{ color: "black" }} value="">
              GİDER TÜRÜ SEÇİNİZ{" "}
            </option>
            <option style={{ color: "black" }} value="Kara Lojistik">
              Kara Lojistik
            </option>
            <option style={{ color: "black" }} value="Genel Gider">
              Genel Gider
            </option>
            <option style={{ color: "black" }} value="Maaş">
              Maaş
            </option>
            <option style={{ color: "black" }} value="Personel">
              Personel
            </option>
            <option style={{ color: "black" }} value="Kira">
              Kira
            </option>
            <option style={{ color: "black" }} value="Demirbaş">
              Demirbaş
            </option>
          </select>
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="kur"
          >
            HARCAMA KURU
          </label>
          <select
            type="text"
            class="form-control"
            value={formData.kur}
            onChange={handleInputChange}
            name="kur"
            id="kur"
            placeholder="DOLAR $"
          >
            <option style={{ color: "black" }} value="">
              Döviz Cinsi Seçiniz
            </option>
            <option style={{ color: "black" }} value="TRY">
              TRY - Turkish Lira
            </option>
            <option style={{ color: "black" }} value="USD">
              USD - US Dollar
            </option>
            <option style={{ color: "black" }} value="EUR">
              EUR - Euro
            </option>
            <option style={{ color: "black" }} value="GBP">
              GBP - British Pound
            </option>
            <option style={{ color: "black" }} value="CHF">
              CHF - Swiss Franc
            </option>
          </select>
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="tutar"
          >
            HARCAMA TUTARI
          </label>
          <input
            type="text"
            value={formData.tutar}
            onChange={handleInputChange}
            class="form-control"
            name="tutar"
            id="tutar"
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
