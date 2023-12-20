import "./TakozTasima.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TakozTasima = () => {
  const [formData, setFormData] = useState({
    müsteri: "",
    tasinacakUrun: "",
    gram: "",
    dövizCinsi: "",
    tasimaBedeli: "",
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

    if (
      formData.müsteri &&
      formData.tasinacakUrun &&
      formData.gram &&
      formData.dövizCinsi &&
      formData.tasimaBedeli
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
          height: "130%",
          marginTop: "150px",
        }}
        method="post"
      >
        <h1 class="form-title">TAKOZ TASİMA</h1>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="müsteri"
          >
            MÜŞTERİ
          </label>
          <input
            type="text"
            value={formData.müsteri}
            onChange={handleChange}
            class="form-control"
            name="müsteri"
            id="müsteri"
            placeholder="müsteri"
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="tasinacakUrun"
          >
            TAŞINACAK ÜRÜN
          </label>
          <input
            type="text"
            class="form-control"
            value={formData.gram}
            onChange={handleChange}
            name="tasinacakUrun"
            id="tasinacakUrun"
            placeholder="tasinacakUrun"
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
            for="dövizCinsi"
          >
            DÖVİZ CİNSİ
          </label>
          <input
            required
            type="text"
            class="form-control"
            name="dövizCinsi"
            value={formData.dövizCinsi}
            onChange={handleChange}
            id="dövizCinsi"
            placeholder="dövizCinsi"
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
            name="tasimaBedeli"
            value={formData.tasimaBedeli}
            onChange={handleChange}
            id="tasimaBedeli"
            placeholder="tasimaBedeli"
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

export default TakozTasima;
