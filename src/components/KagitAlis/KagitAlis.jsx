import React, { useEffect, useState } from "react";
import "./KagitAlis.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const KagitAlis = () => {
  const [customerList, setCustomerList] = useState([]);

  const [formData, setFormData] = useState({
    musteri: "",
    para_birimi: "",
    miktar: "",
    iscilik: "",
    toplam: "",
    aciklama: "",
    vade: "",
    type: "kağıt",
    type2: "alım",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const isNumeric = /^[0-9]*$/;

    if (
      name === "ayar" ||
      name === "iscilik" ||
      name === "alis_kuru" ||
      name === "miktar" ||
      name === "vade" ||
      name === "toplam" ||
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
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          console.error("Access token is missing");
          return;
        }

        const response = await axios.get(
          "http://52.29.240.45:3001/v1/musteriListele",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setCustomerList(response.data);
      } catch (error) {
        console.error("Error fetching customer list:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();

    // Basic validation, you can add more specific validations as needed
    if (
      formData.musteri &&
      formData.para_birimi &&
      formData.miktar &&
      formData.iscilik &&
      formData.toplam &&
      formData.aciklama &&
      formData.vade
    ) {
      try {
        const response = await axios.post(
          "http://52.29.240.45:3001/v1/islemOlustur",
          {
            ...formData,
            customerId: formData.musteriListele,
          }
        );
        window.alert("Form başarıyla gönderildi.");
        setFormData({
          musteri: "",
          para_birimi: "",
          miktar: "",
          iscilik: "",
          toplam: "",
          aciklama: "",
          vade: "",
          type: "kağıt",
          type2: "alım",
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

  return (
    <div>
      <Link to="/kagit" className="btn btn-primary back-button">
        Geri Dön
      </Link>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "70%",
          height: "150%",
          marginTop: "350px",
        }}
        method="post"
      >
        <h1 class="form-title">KAĞIT ALİS</h1>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="musteri"
          >
            MÜŞTERİ
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
            for="para_birimi"
          >
            PARA BİRİMİ
          </label>
          <select
            required
            className="form-control"
            name="para_birimi"
            value={formData.para_birimi}
            onChange={handleChange}
            id="para_birimi"
          >
            <option style={{ color: "black" }} value="">
              Para Birimi Seçiniz
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
            onChange={handleChange}
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
