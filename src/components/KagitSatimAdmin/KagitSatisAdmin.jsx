import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { type } from "@testing-library/user-event/dist/type";
import { useNavigate } from "react-router-dom";
import "./KagitSatisAdmin.css";
const KagitSatisAdmin = () => {
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
    type2: "satım",
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

        const response = await api.get(
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

    const localStorageData = localStorage.getItem("localstorage_kagitsatim");
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      console.log("parsedData", parsedData);
      setFormData((prevData) => ({
        ...prevData,
        musteri: parsedData.musteri.id,
        para_birimi: parsedData.para_birimi.toString(),
        miktar: parsedData.miktar.toString(),
        iscilik: parsedData.iscilik.toString(),
        toplam: parsedData.toplam.toString(),
        aciklama: parsedData.aciklama,
        vade: parsedData.vade.toString(),
      }));
    }

    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.musteri &&
      formData.para_birimi &&
      formData.miktar &&
      formData.iscilik &&
      formData.toplam &&
      formData.vade &&
      formData.aciklama
    ) {
      try {
        const localStorageData = localStorage.getItem(
          "localstorage_kagitsatim"
        );

        if (localStorageData) {
          const parsedData = JSON.parse(localStorageData);
          const islemId = parsedData._id;

          const response = await api.patch(
            `http://52.29.240.45:3001/v1/admin/islemGuncelle/${islemId}`,
            {
              ...formData,
              customerId: formData.musteriListele,
            }
          );
          window.alert("Form başarıyla gönderildi.");
          localStorage.removeItem("localstorage_kagitalim");
          navigate("/kagitAdmin");

          console.log("Form submitted:", response.data);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        window.alert("Lütfen Tüm Değerleri Doğru Giriniz");
      }
    } else {
      window.alert("Lütfen Tüm Değerleri Doğru Giriniz  ");
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <Link to="/kagit" className="btn btn-primary back-button">
        Geri Dön
      </Link>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "70%",
          height: "120%",
          marginTop: "150px",
        }}
        method="post"
      >
        <h1 class="form-title">KAĞIT SATIŞ</h1>
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
            value={formData.aciklama}
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

export default KagitSatisAdmin;
