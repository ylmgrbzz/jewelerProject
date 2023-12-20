import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./KagitTasima.css";

const KagitTasima = () => {
  const [formData, setFormData] = useState({
    musteriListesi: "",
    tasimaMiktari: "",
    tasinacakKagit: "",
    tasimaBedeli: "",
    tasimaBedeliTuru: "",
    aciklama: "",
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
      formData.tasimaMiktari &&
      formData.tasinacakKagit &&
      formData.tasimaBedeli &&
      formData.tasimaBedeliTuru
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
        <h1 class="form-title">KAĞIT TAŞIMA</h1>
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
            for="tasimaMiktari"
          >
            TAŞIMA MİKTARİ
          </label>
          <input
            type="text"
            class="form-control"
            name="tasimaMiktari"
            value={formData.tasimaMiktari}
            onChange={handleChange}
            id="tasimaMiktari"
            placeholder="tasimaMiktari"
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="tasinacakKagit"
          >
            TAŞINACAK KAĞIT
          </label>
          <input
            type="text"
            class="form-control"
            value={formData.tasinacakKagit}
            onChange={handleChange}
            name="tasinacakKagit"
            id="tasinacakKagit"
            placeholder="tasinacakKagit"
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="tasimaBedeli"
          >
            TAŞIMA BEDELİ
          </label>
          <input
            required
            type="text"
            class="form-control"
            value={formData.tasimaBedeli}
            onChange={handleChange}
            name="tasimaBedeli"
            id="tasimaBedeli"
            placeholder="tasimaBedeli"
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="tasimaBedeliTuru"
          >
            TAŞIMA BEDELİ TÜRÜ
          </label>
          <input
            required
            type="text"
            class="form-control"
            name="tasimaBedeliTuru"
            value={formData.tasimaBedeliTuru}
            onChange={handleChange}
            id="tasimaBedeliTuru"
            placeholder="tasimaBedeliTuru"
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

export default KagitTasima;
