import React, { useEffect, useState } from "react";
import "./MusteriTanimlama.css";

const MusteriTanimlama = () => {
  useEffect(() => {
    document.body.classList.add("musteri-page");

    return () => {
      document.body.classList.remove("musteri-page");
    };
  }, []);

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
    // Additional validation logic
    if (validateForm()) {
      // Add your form submission logic here
      console.log("Form is valid. Submitting...");
    } else {
      console.log("Form is invalid. Please check your input.");
    }
  };

  const validateForm = () => {
    // Basic email validation
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
    // <div className="container ">
    //   <a
    //     href="#"
    //     className="btn btn-primary back-button"
    //     onClick={() => window.history.go(-1)}
    //   >
    //     Geri Dön
    //   </a>
    //   <h1 className="form-title">CARİ KAYIT EKRANI</h1>
    //   <Form
    //     style={{
    //       marginTop: "150px",
    //       backgroundColor: "green",
    //       height: "100%",
    //     }}
    //     onSubmit={handleSubmit}
    //   >
    //     <Form.Group controlId="unvan">
    //       <Form.Label>Unvan</Form.Label>
    //       <Form.Control
    //         type="text"
    //         placeholder="Unvan"
    //         onChange={handleChange}
    //         value={formData.unvan}
    //         required
    //       />
    //     </Form.Group>

    //     <Form.Group controlId="isim">
    //       <Form.Label>Ad Soyad</Form.Label>
    //       <Form.Control
    //         type="text"
    //         placeholder="Ad Soyad"
    //         onChange={handleChange}
    //         value={formData.isim}
    //         required
    //       />
    //     </Form.Group>

    //     <Form.Group controlId="tel1">
    //       <Form.Label>GSM 1</Form.Label>
    //       <Form.Control
    //         type="text"
    //         placeholder="Tel1"
    //         onChange={handleChange}
    //         value={formData.tel1}
    //         required
    //       />
    //     </Form.Group>

    //     <Form.Group controlId="tel2">
    //       <Form.Label>GSM 2</Form.Label>
    //       <Form.Control
    //         type="text"
    //         placeholder="Tel2"
    //         onChange={handleChange}
    //         value={formData.tel2}
    //         required
    //       />
    //     </Form.Group>

    //     <Form.Group controlId="email">
    //       <Form.Label>E-Mail</Form.Label>
    //       <Form.Control
    //         type="email"
    //         placeholder="E-Mail"
    //         onChange={handleChange}
    //         value={formData.email}
    //         required
    //       />
    //     </Form.Group>

    //     <Form.Group controlId="adres">
    //       <Form.Label>Adres</Form.Label>
    //       <Form.Control
    //         as="textarea"
    //         rows={4}
    //         placeholder="Adres"
    //         onChange={handleChange}
    //         value={formData.adres}
    //         required
    //       />
    //     </Form.Group>

    //     <Button
    //       style={{
    //         marginTop: "10px",
    //       }}
    //       variant="primary"
    //       type="submit"
    //     >
    //       Gönder
    //     </Button>
    //   </Form>
    // </div>
    <div class="container">
      <a href="#" class="btn btn-primary back-button" onclick="history.go(-1)">
        Geri Dön
      </a>
      <h1 class="form-title">CARİ KAYIT EKRANI</h1>
      <form
        style={{ width: "70%", height: "95%", marginTop: "150px" }}
        action="/cari/olustur"
        method="post"
      >
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
