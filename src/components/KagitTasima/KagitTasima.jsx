import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./KagitTasima.css";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";

const KagitTasima = () => {
  const [customerList, setCustomerList] = useState([]);

  const [formData, setFormData] = useState({
    musteri: "",
    miktar: "",
    tasinacak_kagit: "",
    tasima_bedeli: "",
    tasima_bedeli_turu: "",
    aciklama: "",
    type: "kağıt",
    type2: "taşıma",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
    e.preventDefault();
    console.log(formData);

    if (
      formData.musteri &&
      formData.miktar &&
      formData.tasinacak_kagit &&
      formData.tasima_bedeli &&
      formData.tasima_bedeli_turu &&
      formData.aciklama
    ) {
      try {
        const response = await axios.post(
          "http://52.29.240.45:3001/v1/islemOlustur",
          {
            ...formData,
            customerId: formData.musteriListele,
          }
        );

        console.log("Form submitted:", response.data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
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
      {/* <a
        href="#"
        class="btn btn-primary back-musteriButton"
        onClick={backToPage()}
      >
        Geri Dön
      </a> */}
      <form
        onSubmit={handleSubmit}
        style={{
          width: "70%",
          height: "150%",
          marginTop: "350px",
        }}
        method="post"
      >
        <h1 class="form-title">KAĞIT TAŞIMA</h1>
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
            for="miktar"
          >
            TAŞIMA MİKTARİ
          </label>
          <input
            type="text"
            class="form-control"
            name="miktar"
            value={formData.miktar}
            onChange={handleChange}
            id="miktar"
            placeholder="miktar"
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="tasinacak_kagit"
          >
            TAŞINACAK KAĞIT
          </label>
          <select
            type="text"
            class="form-control"
            value={formData.tasinacak_kagit}
            onChange={handleChange}
            name="tasinacak_kagit"
            id="tasinacak_kagit"
            placeholder="tasinacak_kagit"
          >
            {" "}
            <option style={{ color: "black" }} value="">
              Döviz Cinsi Seçiniz
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
            for="tasima_bedeli"
          >
            TAŞIMA BEDELİ
          </label>
          <input
            required
            type="text"
            class="form-control"
            value={formData.tasima_bedeli}
            onChange={handleChange}
            name="tasima_bedeli"
            id="tasima_bedeli"
            placeholder="tasima_bedeli"
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="tasima_bedeli_turu"
          >
            TAŞIMA BEDELİ TÜRÜ
          </label>
          <select
            required
            className="form-control"
            name="tasima_bedeli_turu"
            value={formData.tasima_bedeli_turu}
            onChange={handleChange}
            id="tasima_bedeli_turu"
          >
            <option style={{ color: "black" }} value="">
              Döviz Cinsi Seçiniz
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
            for="aciklama"
          >
            AÇIKLAMA
          </label>
          <textarea
            class="form-control"
            name="aciklama"
            id="aciklama"
            onChange={handleChange}
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
