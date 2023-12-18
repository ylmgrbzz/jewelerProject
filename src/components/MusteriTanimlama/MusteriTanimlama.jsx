import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Form, Button } from "react-bootstrap";

// import "./MusteriTanimlama.css";

const MusteriTanimlama = () => {
  // const goBack = () => {
  //   history.go(-1);
  // };
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    gsm1: "",
    gsm2: "",
    email: "",
    address: "",
  });
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Ad ve soyad kontrolü
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Ad boş bırakılamaz";
      valid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Soyad boş bırakılamaz";
      valid = false;
    }

    // Diğer alanlar için isteğe bağlı doğrulama ekleyebilirsiniz

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Formu gönderme işlemleri burada yapılabilir
      console.log("Form Gönderildi", formData);
    } else {
      console.error("Form Gönderilemedi - Doğrulama Hatası");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Her input değiştiğinde hatayı temizle
    setErrors({ ...errors, [name]: "" });
  };

  const [errors, setErrors] = useState({});
  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>{" "}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default MusteriTanimlama;
