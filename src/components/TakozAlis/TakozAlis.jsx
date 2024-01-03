import "./TakozAlis.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const TakozAlis = () => {
  const [customerList, setCustomerList] = useState([]);

  const [formData, setFormData] = useState({
    musteri: "",
    malin_cinsi: "",
    gram: "",
    ayar: "",
    iscilik: "",
    alis_kuru: "",
    doviz_olarak_tutar: "",
    has: "",
    type: "takoz",
    type2: "alım",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const isNumeric = /^[0-9]*$/;

    if (
      name === "ayar" ||
      name === "iscilik" ||
      name === "alis_kuru" ||
      name === "gram" ||
      name === "doviz_olarak_tutar" ||
      name === "has"
    ) {
      if (!isNumeric.test(value)) {
        console.error(
          `Invalid input for ${name}. Please enter a valid number.`
        );
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get(
          "http://52.29.240.45:3001/v1/musteriListele"
        );
        setCustomerList(response.data);
      } catch (error) {
        console.error("Error fetching customer list:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.musteri &&
      formData.malin_cinsi &&
      formData.gram &&
      formData.ayar &&
      formData.iscilik &&
      formData.alis_kuru &&
      formData.doviz_olarak_tutar &&
      formData.has
    ) {
      try {
        const response = await api.post(
          "http://52.29.240.45:3001/v1/islemOlustur",
          {
            ...formData,
            customerId: formData.musteriListele,
          }
        );

        console.log("Form submitted:", response.data);
        window.alert("Form başarıyla gönderildi.");
        setFormData({
          musteri: "",
          malin_cinsi: "",
          gram: "",
          ayar: "",
          iscilik: "",
          alis_kuru: "",
          doviz_olarak_tutar: "",
          has: "",
          type: "takoz",
          type2: "alım",
        });
      } catch (error) {
        console.error("Error submitting form:", error);
        window.alert("Lütfen Tüm Değerleri Doğru Giriniz");
      }
    } else {
      window.alert("Lütfen Tüm Değerleri Doğru Giriniz  ");
    }
  };

  const handleCalculateHas = (e) => {
    e.preventDefault();
    const { gram, ayar } = formData;
    const result = (parseFloat(gram) * parseFloat(ayar)) / 995;
    setFormData({
      ...formData,
      has: result.toFixed(2),
    });
  };
  const handleCalculateDoviz = (e) => {
    e.preventDefault();
    const { alis_kuru, has } = formData;
    const result = (parseFloat(alis_kuru) * parseFloat(has)) / 1000;
    setFormData({
      ...formData,
      doviz_olarak_tutar: result.toFixed(2),
    });
  };

  return (
    <div>
      <Link to="/takoz" className="btn btn-primary back-button">
        Geri Dön
      </Link>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "70%",
          height: "125%",
          marginTop: "140px",
        }}
        method="post"
      >
        <h1 class="form-title">TAKOZ ALİS</h1>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="musteri"
          >
            MÜŞTERİ LİSTESİ
          </label>
          <select
            style={{ color: "black" }}
            className="form-control"
            name="musteri"
            value={formData.musteri}
            onChange={handleChange}
            id="musteri"
          >
            <option value="" disabled>
              MÜŞTERİ SEÇİNİZ{" "}
            </option>
            {customerList.map((customer) => (
              <option
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "x-large",
                }}
                key={customer.id}
                value={customer.id}
              >
                {customer.unvan}
              </option>
            ))}
          </select>
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="malin_cinsi"
          >
            ALINACAK MALIN CİNSİ
          </label>
          <select
            className="form-control"
            name="malin_cinsi"
            value={formData.malin_cinsi}
            onChange={handleChange}
            id="malin_cinsi"
          >
            <option value="" disabled>
              Seçiniz
            </option>
            <option
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "x-large",
              }}
              value="Altin"
            >
              Altın
            </option>
            <option
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "x-large",
              }}
              value="Gümüş"
            >
              Gümüş
            </option>
          </select>
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
            for="alis_kuru"
          >
            ALIŞ KUR BEDELİ
          </label>
          <input
            required
            type="text"
            class="form-control"
            name="alis_kuru"
            value={formData.alis_kuru}
            onChange={handleChange}
            id="alis_kuru"
            placeholder="alis_kuru"
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
            disabled
            required
            type="text"
            class="form-control"
            name="doviz_olarak_tutar"
            value={formData.doviz_olarak_tutar}
            onChange={handleChange}
            id="doviz_olarak_tutar"
            placeholder="doviz_olarak_tutar"
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="has"
          >
            HAS
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "30px",
            }}
          >
            <div className="col-sm-4">
              <input
                required
                type="text"
                class="form-control"
                value={formData.has}
                onChange={handleChange}
                name="has"
                id="has"
                placeholder="has"
                disabled
              />
            </div>
            <div className="col-sm-3">
              <button
                onClick={handleCalculateHas}
                style={{ marginBottom: "40px", height: "50px" }}
              >
                {" "}
                HAS
              </button>
            </div>
            <div className="col-sm-3">
              <button
                onClick={handleCalculateDoviz}
                style={{ marginBottom: "40px", height: "50px" }}
              >
                {" "}
                TUTAR
              </button>
            </div>
          </div>
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
