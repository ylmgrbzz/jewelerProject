import "./SubelerVirman.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const SubelerVirman = () => {
  const [kasaList, setKasaList] = useState([]);

  const [formData, setFormData] = useState({
    gonderen_kasa: "",
    transfer_cinsi: "",
    transfer_tutari: "",
    alici_kasa: "",
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
          `Geçersiz giriş ${name} için. Lütfen geçerli bir sayı giriniz.`
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
          "https://kuyumcu.mmustafa.dev/v1/kasaKullaniciListele"
        );
        setKasaList(response.data);
        const userData = JSON.parse(localStorage.getItem("user"));
        setFormData((prevFormData) => ({
          ...prevFormData,
          gonderen_kasa: userData.name,
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
      formData.gonderen_kasa &&
      formData.transfer_cinsi &&
      formData.transfer_tutari &&
      formData.alici_kasa &&
      formData.aciklama
    ) {
      try {
        const { gonderen_kasa, ...formDataWithoutGonderen } = formData;

        const response = await api.post(
          "https://kuyumcu.mmustafa.dev/v1/islemOlustur",
          {
            ...formDataWithoutGonderen,
            customerId: formDataWithoutGonderen.musteriListele,
          }
        );

        console.log("Form submitted:", response.data);
        window.alert("Form başarıyla gönderildi.");
        setFormData({
          transfer_cinsi: "",
          transfer_tutari: "",
          alici_kasa: "",
          aciklama: "",
          type: "virman",
          type2: "transfer",
        });
        window.location.reload();
      } catch (error) {
        console.error("Error submitting form:", error);
        window.alert("Lütfen Tüm Değerleri Doğru Girinizzz");
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
            for="gonderen_kasa"
          >
            Gönderen Kasa/Şube
          </label>
          <input
            type="text"
            value={formData.gonderen_kasa}
            onChange={handleInputChange}
            class="form-control"
            name="gonderen_kasa"
            disabled
            id="gonderen_kasa"
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="transfer_cinsi"
          >
            TRASNFER CİNSİ
          </label>

          <select
            type="text"
            className="form-control"
            name="transfer_cinsi"
            value={formData.transfer_cinsi}
            onChange={handleInputChange}
            id="transfer_cinsi"
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
            for="transfer_tutari"
          >
            TRANSFER TUTARI
          </label>
          <input
            type="text"
            value={formData.transfer_tutari}
            onChange={handleInputChange}
            class="form-control"
            name="transfer_tutari"
            id="transfer_tutari"
            placeholder="TRANSFER TUTARI GİRİNİZ"
          />
        </div>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="alici_kasa"
          >
            ALICI KASA/ŞUBE
          </label>

          <select
            type="text"
            style={{ color: "black" }}
            className="form-control"
            value={formData.alici_kasa}
            onChange={handleInputChange}
            name="alici_kasa"
            id="alici_kasa"
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
