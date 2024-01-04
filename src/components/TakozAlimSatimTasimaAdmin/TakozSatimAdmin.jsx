import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./TakozAlimSatimTasimaAdmin.css";

const TakozSatimAdmin = () => {
  const [customerList, setCustomerList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // New state for the selected date

  const [formData, setFormData] = useState({
    musteri: "",
    malin_cinsi: "",
    gram: "",
    ayar: "",
    iscilik: "",
    satis_kuru: "",
    doviz_olarak_tutar: "",
    has: "",
    type: "takoz",
    type2: "satım",
    vade: "",
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
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          console.error("Access token is missing");
          return;
        }

        const response = await api.get(
          "https://kuyumcu.mmustafa.dev/v1/musteriListele",
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

    const localStorageData = localStorage.getItem("localstorage_takozsatim");
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      console.log("parsedData", parsedData);
      setFormData((prevData) => ({
        ...prevData,
        musteri: parsedData.musteri.id,
        ayar: parsedData.ayar.toString(),
        doviz_olarak_tutar: parsedData.doviz_olarak_tutar.toString(),
        gram: parsedData.gram.toString(),
        has: parsedData.has.toString(),
        iscilik: parsedData.iscilik.toString(),
        satis_kuru: parsedData.satis_kuru.toString(),
        malin_cinsi: parsedData.malin_cinsi,
        vade: parsedData.vade.toString(),
      }));
    }

    fetchCustomers();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.musteri &&
      formData.malin_cinsi &&
      formData.gram &&
      formData.ayar &&
      formData.iscilik &&
      formData.satis_kuru &&
      formData.doviz_olarak_tutar &&
      formData.vade &&
      formData.has
    ) {
      try {
        const localStorageData = localStorage.getItem(
          "localstorage_takozsatim"
        );

        if (localStorageData) {
          const parsedData = JSON.parse(localStorageData);
          const islemId = parsedData._id;

          const response = await api.patch(
            `https://kuyumcu.mmustafa.dev/v1/admin/islemGuncelle/${islemId}`,
            {
              ...formData,
              customerId: formData.musteriListele,
            }
          );

          console.log("Form submitted:", response.data);
          window.alert("Form başarıyla gönderildi.");
          localStorage.removeItem("localstorage_takozsatim");
          navigate("/takozAdmin");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      window.alert("Lütfen Tüm Değerleri Doğru Giriniz  ");
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date); // Update the selected date state
    setFormData({
      ...formData,
      vade: date,
    });
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
    const { satis_kuru, has } = formData;
    const result = (parseFloat(satis_kuru) * parseFloat(has)) / 1000;
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
          height: "160%",
          marginTop: "280px",
        }}
        method="post"
      >
        <h1 class="form-title">TAKOZ SATİS</h1>
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="musteriListesi"
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
            for="satilacakMalinCinsi"
          >
            SATİLACAK MALIN CİNSİ
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
            for="satis_kuru"
          >
            SATIŞ KUR BEDELİ
          </label>
          <input
            required
            type="text"
            class="form-control"
            name="satis_kuru"
            value={formData.satis_kuru}
            onChange={handleChange}
            id="satis_kuru"
            placeholder="satis_kuru"
          />
        </div>

        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="doviz_olarak_tutar"
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
        <div class="form-group">
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
            for="vade"
          >
            VADE
          </label>
          {/* <input
            required
            type="text"
            class="form-control"
            value={formData.vade}
            onChange={handleChange}
            name="vade"
            id="vade"
            placeholder="vade"
          /> */}
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            className="form-control"
            dateFormat="dd/MM/yyyy"
          />
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

export default TakozSatimAdmin;
