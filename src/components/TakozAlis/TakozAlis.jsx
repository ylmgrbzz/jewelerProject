import React, { useState } from "react";
import "./TakozAlis.css";
import { useNavigate } from "react-router-dom";

const TakozAlis = () => {
  const [formData, setFormData] = useState({
    musteriListesi: "",
    alinacakMalinCinsi: "",
    gram: "",
    ayar: "",
    iscilik: "",
    alisKurBedeli: "",
    dovizOlarakTutar: "",
    has: "",
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
      formData.alinacakMalinCinsi &&
      formData.gram &&
      formData.ayar &&
      formData.iscilik &&
      formData.alisKurBedeli &&
      formData.dovizOlarakTutar &&
      formData.has
    ) {
      // Submit the form data or perform other actions
      console.log("Form submitted:", formData);
    } else {
      alert("Please fill in all required fields");
    }
  };

  const navigate = useNavigate();
  const backToPage = () => {
    navigate("/takoz");
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
        <h1 class="form-title">TAKOZ ALİS</h1>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="musteriListesi"
          >
            MÜŞTERİ LİSTESİ
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
            for="alinacakMalinCinsi"
          >
            ALINACAK MALIN CİNSİ
          </label>
          <input
            type="text"
            class="form-control"
            name="alinacakMalinCinsi"
            value={formData.alinacakMalinCinsi}
            onChange={handleChange}
            id="alinacakMalinCinsi"
            placeholder="alinacakMalinCinsi"
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="gram"
          >
            GRAM
          </label>
          <input
            type="text"
            class="form-control"
            value={formData.gram}
            onChange={handleChange}
            name="gram"
            id="gram"
            placeholder="gram"
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="ayar"
          >
            AYAR
          </label>
          <input
            type="text"
            class="form-control"
            value={formData.ayar}
            onChange={handleChange}
            name="ayar"
            id="ayar"
            placeholder="ayar"
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
            for="alisKurBedeli"
          >
            ALIŞ KUR BEDELİ
          </label>
          <input
            required
            type="text"
            class="form-control"
            name="alisKurBedeli"
            value={formData.alisKurBedeli}
            onChange={handleChange}
            id="alisKurBedeli"
            placeholder="alisKurBedeli"
          />
        </div>

        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="dövizOlarakTutar"
          >
            DÖVİZ OLARAK TUTAR
          </label>
          <input
            required
            type="text"
            class="form-control"
            name="dövizOlarakTutar"
            value={formData.dövizOlarakTutar}
            onChange={handleChange}
            id="dövizOlarakTutar"
            placeholder="dövizOlarakTutar"
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="has"
          >
            HAS
          </label>
          <input
            required
            type="text"
            class="form-control"
            value={formData.has}
            onChange={handleChange}
            name="has"
            id="has"
            placeholder="has"
          />
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

export default TakozAlis;
