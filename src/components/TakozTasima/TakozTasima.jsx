import "./TakozTasima.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";

const TakozTasima = () => {
  const [customerList, setCustomerList] = useState([]);

  const [formData, setFormData] = useState({
    musteri: "",
    tasinacak_urun: "",
    gram: "",
    para_birimi: "",
    tasima_bedeli: "",
    aciklama: "",
    type: "takoz",
    type2: "taşıma",
  });
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
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (
      formData.musteri &&
      formData.tasinacak_urun &&
      formData.gram &&
      formData.para_birimi &&
      formData.tasima_bedeli &&
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
    navigate("/takoz");
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
          height: "130%",
          marginTop: "150px",
        }}
        method="post"
      >
        <h1 class="form-title">TAKOZ TASİMA</h1>
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
            for="tasinacak_urun"
          >
            TAŞINACAK ÜRÜN
          </label>
          <select
            style={{ color: "black" }}
            className="form-control"
            value={formData.tasinacak_urun}
            onChange={handleChange}
            name="tasinacak_urun"
            id="tasinacak_urun"
          >
            <option style={{ color: "black" }} value="">
              Select an option
            </option>
            <option style={{ color: "black" }} value="14Ayar">
              14 ayar
            </option>{" "}
            <option style={{ color: "black" }} value="18Ayar">
              18 ayar
            </option>
            <option style={{ color: "black" }} value="21Ayar">
              21 ayar
            </option>
            <option style={{ color: "black" }} value="22Ayar">
              22 ayar
            </option>
            <option style={{ color: "black" }} value="Gümüş">
              gümüş
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
            for="para_birimi"
          >
            DÖVİZ CİNSİ
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
            name="tasima_bedeli"
            value={formData.tasima_bedeli}
            onChange={handleChange}
            id="tasima_bedeli"
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
            onChange={handleChange}
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
