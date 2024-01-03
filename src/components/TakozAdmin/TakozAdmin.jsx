import React, { useEffect, useState } from "react";
import "./TakozAdmin.css";
import { FaEdit, FaTrash } from "react-icons/fa";

import { Link } from "react-router-dom";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const TakozAdmin = () => {
  const [kaydedenKisiFilter, setKaydedenKisiFilter] = useState("");
  const [firmaFilter, setFirmaFilter] = useState("");
  const [altinFilter, setAltinFilter] = useState("");
  const [kagitFilter, setKagitFilter] = useState("");
  const [iscilikFilter, setIscilikFilter] = useState("");
  const [tarihFilter, setTarihFilter] = useState("");
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [tipFilter, setTipFilter] = useState("");
  const [has, setHasFilter] = useState("");

  const formatInputDate = (inputDate) => {
    const [year, month, day] = inputDate.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleInputChange = (e, setFilter) => {
    const value =
      e.target.type === "date"
        ? new Date(e.target.value).toISOString().split("T")[0]
        : e.target.value;
    setFilter(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          "http://52.29.240.45:3001/v1/admin/takozListele"
        );
        setTableData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = tableData.filter((row) => {
      const userName = (row?.user?.name || "").trim();
      const unvan = (row?.musteri?.unvan || "").trim();
      const malinCinsi = (row?.malin_cinsi || "").trim();

      const formattedRowDate = row.createdAt
        ? formatInputDate(row.createdAt.split("T")[0])
        : "";
      const formattedFilterDate = tarihFilter
        ? formatInputDate(tarihFilter)
        : "";

      return (
        (kaydedenKisiFilter === "" ||
          userName.toLowerCase().includes(kaydedenKisiFilter.toLowerCase())) &&
        (firmaFilter === "" ||
          unvan.toLowerCase().includes(firmaFilter.toLowerCase())) &&
        (altinFilter === "" ||
          malinCinsi.toLowerCase().includes(altinFilter.toLowerCase()) ||
          has.toLowerCase().includes(altinFilter.toLowerCase())) &&
        (tarihFilter === "" || formattedRowDate === formattedFilterDate)
      );
    });

    setFilteredData(filtered);
  }, [
    kaydedenKisiFilter,
    firmaFilter,
    altinFilter,
    kagitFilter,
    iscilikFilter,
    tipFilter,
    tarihFilter,
    tableData,
    has,
  ]);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    musteri: "",
    alis_kuru: "",
    ayar: "",
    doviz_olarak_tutar: "",
    gram: "",
    has: "",
    iscilik: "",
    malin_cinsi: "",
    para_birimi: "",
    tasima_bedeli: "",
    tasinacak_urun: "",

    type: "takoz",
    type2: "",
  });

  const handleEdit = (rowData) => {
    console.log("Edit:", rowData);

    if (rowData.type2 === "alım") {
      setFormData({
        musteri: rowData.musteri.id,
        ayar: rowData.ayar,
        doviz_olarak_tutar: rowData.doviz_olarak_tutar,
        gram: rowData.gram,
        has: rowData.has,
        iscilik: rowData.iscilik,
        malin_cinsi: rowData.malin_cinsi,
        alis_kuru: rowData.alis_kuru,
        vade: rowData.vade,
        type: rowData.type,
        type2: rowData.type2,
      });
      localStorage.setItem("editedData", JSON.stringify(rowData));

      if (rowData.type2 === "alım") {
        // Eğer type2 "alım" ise, ayrıca "localstorage_kagitalim" anahtarına kaydet
        localStorage.setItem("localstorage_takozalim", JSON.stringify(rowData));
      }
      navigate("/takozAlisAdmin");
    }

    if (rowData.type2 === "satım") {
      setFormData({
        musteri: rowData.musteri.id,
        ayar: rowData.ayar,
        doviz_olarak_tutar: rowData.doviz_olarak_tutar,
        gram: rowData.gram,
        has: rowData.has,
        iscilik: rowData.iscilik,
        malin_cinsi: rowData.malin_cinsi,
        satis_kuru: rowData.satis_kuru,
        vade: rowData.vade,
        type: rowData.type,
        type2: rowData.type2,
      });
      localStorage.setItem("editedData", JSON.stringify(rowData));

      if (rowData.type2 === "satım") {
        // Eğer type2 "satım" ise, ayrıca "localstorage_kagitsatim" anahtarına kaydet
        localStorage.setItem(
          "localstorage_takozsatim",
          JSON.stringify(rowData)
        );
      }
      navigate("/takozSatisAdmin");
    }

    if (rowData.type2 === "taşıma") {
      setFormData({
        musteri: rowData.musteri.id,
        para_birimi: rowData.para_birimi,
        tasima_bedeli: rowData.tasima_bedeli,
        tasinacak_urun: rowData.tasinacak_urun,
        type: rowData.type,
        type2: rowData.type2,
      });
      localStorage.setItem("editedData", JSON.stringify(rowData));

      if (rowData.type2 === "taşıma") {
        // Eğer type2 "taşıma" ise, ayrıca "localstorage_kagittaşıma" anahtarına kaydet
        localStorage.setItem(
          "localstorage_takoztaşıma",
          JSON.stringify(rowData)
        );
      }
      navigate("/takozTasimaAdmin");
    }
  };

  const handleDelete = async (islemId) => {
    const isConfirmed = window.confirm("Bu kaydı silmek istiyor musunuz?");

    if (isConfirmed) {
      try {
        // Send a delete request to the backend
        await api.delete(
          `http://52.29.240.45:3001/v1/admin/islemSil/${islemId}`
        );

        // Update the state to reflect the deletion
        setTableData((prevData) =>
          prevData.filter((row) => row._id !== islemId)
        );
        setFilteredData((prevData) =>
          prevData.filter((row) => row._id !== islemId)
        );
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  return (
    <div>
      <div>
        <Link to="/admin" className="btn btn-primary back-button">
          Geri Dön
        </Link>
      </div>
      <div className="container   ">
        <table className="report-table table table-bordered">
          <thead>
            <tr>
              <th>
                KAYDEDEN KİŞİ
                <input
                  className="filter-input"
                  type="text"
                  value={kaydedenKisiFilter}
                  onChange={(e) => setKaydedenKisiFilter(e.target.value)}
                />
              </th>
              <th>
                FİRMA(ÜNVAN)
                <input
                  className="filter-input"
                  type="text"
                  value={firmaFilter}
                  onChange={(e) => setFirmaFilter(e.target.value)}
                />
              </th>

              <th>TİP</th>
              <th>MALIN CİNSİ</th>
              <th>ALIŞ / SATIŞ KURU</th>
              <th>AYAR</th>
              <th>DÖVİZ OLARAK TUTAR </th>
              <th>GRAM</th>
              <th>HAS</th>
              <th>İŞÇİLİK</th>
              <th>MALIN CİNSİ</th>
              <th>VADE</th>
              <th>TAŞIMA BEDELİ / PARA BİRİMİ </th>
              <th>TAŞINACAK ÜRÜN </th>
              <th>AÇIKLAMA</th>
              <th>
                TARİH
                <input
                  className="filter-input"
                  type="date"
                  value={tarihFilter}
                  onChange={(e) => handleInputChange(e, setTarihFilter)}
                />
              </th>
              <th>AKSİYONLAR</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((row, index) => {
              const createdAtDate = new Date(row.createdAt);

              const formattedDate = `${createdAtDate.getDate()}/${
                createdAtDate.getMonth() + 1
              }/${createdAtDate.getFullYear()}`;

              return (
                <tr key={index}>
                  <td>{row?.user?.name}</td>
                  <td>{row?.musteri?.unvan}</td>
                  <td>{row.type2}</td>
                  <td>{row.malin_cinsi}</td>
                  <td>
                    {(row.alis_kuru ? row.alis_kuru : " ") +
                      " " +
                      (row.satis_kuru ? row?.satis_kuru : " ")}
                  </td>
                  <td>{row.ayar ? row.ayar : " "}</td>
                  <td>
                    {row.doviz_olarak_tutar ? row.doviz_olarak_tutar : " "}
                  </td>
                  <td>{row.gram ? row.gram : " "}</td>
                  <td>{row.has ? row.has : " "}</td>
                  <td>{row.iscilik ? row.iscilik : " "}</td>
                  <td>{row.malin_cinsi ? row.malin_cinsi : " "}</td>
                  <td>{row.vade ? row.vade : " "}</td>

                  <td>
                    {(row.tasima_bedeli ? row.tasima_bedeli : " ") +
                      " " +
                      (row.para_birimi ? row.para_birimi : " ")}
                  </td>
                  <td>{row.tasinacak_urun ? row.tasinacak_urun : " "}</td>

                  <td>{row?.aciklama}</td>
                  <td>{formattedDate}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-button"
                        onClick={() => handleEdit(row)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="action-button"
                        onClick={() => handleDelete(row._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TakozAdmin;
