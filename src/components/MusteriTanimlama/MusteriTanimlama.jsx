import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MusteriTanimlama.css";

const MusteriTanimlama = () => {
  useEffect(() => {
    document.body.classList.add("musteri-page");

    return () => {
      document.body.classList.remove("musteri-page");
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
  };

  return (
    <div className="container ">
      <a href="#" class="btn btn-primary back-button" onclick="history.go(-1)">
        Geri Dön
      </a>
      <h1 class="form-title">CARİ KAYIT EKRANI</h1>
      <Form
        style={{
          marginTop: "150px",
          backgroundColor: "green",
          height: "100%",
        }}
        onSubmit={handleSubmit}
      >
        <Form.Group controlId="formUnvan">
          <Form.Label>Unvan</Form.Label>
          <Form.Control type="text" placeholder="Unvan" />
        </Form.Group>

        <Form.Group controlId="formIsim">
          <Form.Label>Ad Soyad</Form.Label>
          <Form.Control type="text" placeholder="Ad Soyad" />
        </Form.Group>

        <Form.Group controlId="formTel1">
          <Form.Label>GSM 1</Form.Label>
          <Form.Control type="text" placeholder="Tel1" />
        </Form.Group>

        <Form.Group controlId="formTel2">
          <Form.Label>GSM 2</Form.Label>
          <Form.Control type="text" placeholder="Tel2" />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>E-Mail</Form.Label>
          <Form.Control type="email" placeholder="E-Mail" required />
        </Form.Group>

        <Form.Group controlId="formAdres">
          <Form.Label>Adres</Form.Label>
          <Form.Control as="textarea" rows={4} placeholder="Adres" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Gönder
        </Button>
      </Form>
    </div>
  );
};

export default MusteriTanimlama;
