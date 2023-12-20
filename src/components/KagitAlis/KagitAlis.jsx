import React, { useState } from "react";
import "./KagitAlis.css";
import { useNavigate } from "react-router-dom";

const KagitAlis = () => {
  const [formData, setFormData] = useState({
    musteriListesi: "",
    paraBirimi: "",
    miktar: "",
    iscilik: "",
    toplam: "",
    aciklama: "",
    vade: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation, you can add more specific validations as needed
    if (
      formData.musteriListesi &&
      formData.paraBirimi &&
      formData.miktar &&
      formData.iscilik &&
      formData.toplam &&
      formData.vade
    ) {
      // Submit the form data or perform other actions
      console.log("Form submitted:", formData);
    } else {
      alert("Please fill in all required fields");
    }
  };

  const navigate = useNavigate();
  const backToPage = () => {
    navigate("/kagit");
  };
  return (
    <div>
      <a
        href="#"
        class="btn btn-primary back-musteriButton"
        onClick={backToPage()}
      >
        Geri Dön
      </a>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "70%",
          height: "150%",
          marginTop: "200px",
        }}
        method="post"
      >
        <h1 class="form-title">KAĞIT ALİS</h1>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="musteriListesi"
          >
            MÜŞTERİ
          </label>
          <input
            type="text"
            value={formData.musteriListesi}
            onChange={handleChange}
            class="form-control"
            name="musteriListesi"
            id="musteriListesi"
            placeholder="musteriListesi"
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="paraBirimi"
          >
            PARA BİRİMİ
          </label>
          <input
            type="text"
            class="form-control"
            name="paraBirimi"
            value={formData.paraBirimi}
            onChange={handleChange}
            id="paraBirimi"
            placeholder="paraBirimi"
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="miktar"
          >
            MİKTAR
          </label>
          <input
            type="text"
            class="form-control"
            value={formData.miktar}
            onChange={handleChange}
            name="miktar"
            id="miktar"
            placeholder="miktar"
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="iscilik"
          >
            İŞÇİLİK
          </label>
          <input
            required
            type="text"
            class="form-control"
            value={formData.iscilik}
            onChange={handleChange}
            name="iscilik"
            id="iscilik"
            placeholder="iscilik"
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="toplam"
          >
            TOPLAM
          </label>
          <input
            required
            type="text"
            class="form-control"
            name="toplam"
            value={formData.toplam}
            onChange={handleChange}
            id="toplam"
            placeholder="toplam"
          />
        </div>

        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="vade"
          >
            VADE
          </label>
          <input
            required
            type="text"
            class="form-control"
            name="vade"
            value={formData.vade}
            onChange={handleChange}
            id="vade"
            placeholder="vade"
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
            name="aciklama"
            id="aciklama"
            rows="4"
            placeholder="aciklama"
          ></textarea>
        </div>
        <button
          style={{
            fontWeight: "bold",
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

export default KagitAlis;
