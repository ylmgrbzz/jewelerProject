import "./SubelerVirman.css";

import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import api from "../../services/api";

const SubelerVirman = () => {
  const [kasaList, setKasaList] = useState([]);

  const [formData, setFormData] = useState({
    gonderenKasa: "",
    transfer_cinsi: "",
    transfer: "",
    alici: "",
    aciklama: "",
    type: "virman",
    type2: "transfer",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const isNumeric = /^[0-9]*$/;

    if (name === "transfer") {
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
    const fetchKasa = async () => {
      try {
        const response = await api.get(
          "http://52.29.240.45:3001/v1/kasaKullaniciListele"
        );
        setKasaList(response.data);
        const userData = JSON.parse(localStorage.getItem("user"));
        setFormData((prevFormData) => ({
          ...prevFormData,
          gonderenKasa: userData.name,
        }));
      } catch (error) {
        console.error("Error fetching customer list:", error);
      }
    };

    fetchKasa();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.gonderenKasa &&
      formData.transfer_cinsi &&
      formData.transfer &&
      formData.alici &&
      formData.aciklama
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
          gonderenKasa: "",
          transfer_cinsi: "",
          transfer: "",
          alici: "",
          aciklama: "",
          type: "virman",
          type2: "transfer",
        });
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
      <Link to="/jeweler" className="btn btn-primary back-button">
        Geri Dön
      </Link>
      <form
        style={{ width: "70%", height: "90%", marginTop: "10px" }}
        method="post"
        onSubmit={handleSubmit}
      >
        <h1 class="form-title">ŞUBELER VİRMAN</h1>

        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="gonderenKasa"
          >
            Gönderen Kasa/Şube
          </label>
          <input
            type="text"
            value={formData.gonderenKasa}
            onChange={handleInputChange}
            class="form-control"
            name="gonderenKasa"
            disabled
            id="gonderenKasa"
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="transferCinsi"
          >
            TRASNFER CİNSİ
          </label>

          <select
            type="text"
            className="form-control"
            name="transferCinsi"
            value={formData.transferCinsi}
            onChange={handleInputChange}
            id="transferCinsi"
            placeholder="TRANSFER CİNSİNİ SEÇİNİZ"
          >
            <option style={{ color: "black" }} value="">
              Transfer Cinsi Seçiniz
            </option>
            <option
              style={{
                color: "black",
              }}
              value="Altin"
            >
              Altın
            </option>
            <option
              style={{
                color: "black",
              }}
              value="Gümüş"
            >
              Gümüş
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
            for="transfer"
          >
            TRANSFER TUTARI
          </label>
          <input
            type="text"
            value={formData.transfer}
            onChange={handleInputChange}
            class="form-control"
            name="transfer"
            id="transfer"
            placeholder="TRANSFER TUTARI GİRİNİZ"
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="alici"
          >
            ALICI KASA/ŞUBE
          </label>

          <select
            type="text"
            style={{ color: "black" }}
            className="form-control"
            value={formData.alici}
            onChange={handleInputChange}
            name="alici"
            id="alici"
            placeholder="TRANSFERİ ALACAK KASA/ŞUBE SEÇİNİZ"
          >
            <option
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "x-large",
              }}
              value=""
              disabled
            >
              TRANSFERİ ALACAK KASA/ŞUBE SEÇİNİZ{" "}
            </option>
            {kasaList.map((kasa) => (
              <option
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "x-large",
                }}
                key={kasa.id}
                value={kasa.id}
              >
                {kasa.name}
              </option>
            ))}
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
            value={formData.aciklama}
            onChange={handleInputChange}
            name="aciklama"
            id="aciklama"
            rows="4"
            placeholder="AÇIKLAMA"
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

export default SubelerVirman;
