import React, { useState } from "react";
import "./TakozSatis.css";
import { useNavigate } from "react-router-dom";

const TakozSatis = () => {
  const [formData, setFormData] = useState({
    musteriListesi: "",
    satilacakMalinCinsi: "",
    gram: "",
    ayar: "",
    iscilik: "",
    satisKurBedeli: "",
    dovizOlarakTutar: "",
    has: "",
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

    if (
      formData.musteriListesi &&
      formData.satilacakMalinCinsi &&
      formData.gram &&
      formData.ayar &&
      formData.iscilik &&
      formData.satisKurBedeli &&
      formData.dovizOlarakTutar &&
      formData.vade &&
      formData.has
    ) {
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
          height: "155%",
          marginTop: "200px",
        }}
        method="post"
      >
        <h1 class="form-title">TAKOZ SATİS</h1>
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
            for="satilacakMalinCinsi"
          >
            SATİLACAK MALIN CİNSİ
          </label>
          <input
            type="text"
            class="form-control"
            name="satilacakMalinCinsi"
            value={formData.satilacakMalinCinsi}
            onChange={handleChange}
            id="satilacakMalinCinsi"
            placeholder="satilacakMalinCinsi"
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
            for="satisKurBedeli"
          >
            SATIŞ KUR BEDELİ
          </label>
          <input
            required
            type="text"
            class="form-control"
            name="satisKurBedeli"
            value={formData.satisKurBedeli}
            onChange={handleChange}
            id="satisKurBedeli"
            placeholder="satisKurBedeli"
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
            value={formData.vade}
            onChange={handleChange}
            name="vade"
            id="vade"
            placeholder="vade"
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

export default TakozSatis;
