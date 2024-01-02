import React, { useEffect, useState } from "react";
import "./KagıtAdmin.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import KagitAlis from "../KagitAlis/KagitAlis";

const KagıtAdmin = () => {
  const navigate = useNavigate();
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
          "http://52.29.240.45:3001/v1/admin/kagitListele"
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

  const handleEdit = (rowData) => {
    console.log("Edit:", rowData);

    if (rowData.type2 === "alım") {
      // navigate("/kagitAlis");

      setFormData({
        musteri: rowData.musteri.id,
        para_birimi: rowData.para_birimi,
        miktar: rowData.miktar,
        iscilik: rowData.iscilik,
        toplam: rowData.toplam,
        aciklama: rowData.aciklama,
        vade: rowData.vade,
        type: rowData.type,
        type2: rowData.type2,
      });
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
      <Link to="/admin" className="btn btn-primary back-button">
        Geri Dön
      </Link>
      <div className="container">
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
              <th>KAĞIT MİKTAR / TAŞINACAK KAĞIT</th>
              <th>İŞÇİLİK / PARA BİRİMİ </th>
              <th>TOPLAM</th>
              <th>VADE</th>
              <th>TAŞIMA BEDELİ / TAŞIMA BEDELİ TÜRÜ</th>
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
                  <td>
                    {(row.miktar ? row.miktar : " ") +
                      " " +
                      (row.tasinacak_kagit
                        ? row?.tasinacak_kagit
                        : row?.para_birimi)}
                  </td>
                  <td>
                    {(row.iscilik ? row.iscilik : " ") +
                      " " +
                      (row.para_birimi ? row.para_birimi : " ")}
                  </td>
                  <td>{row.toplam ? row.toplam : " "}</td>
                  <td>{row.vade ? row.vade : " "}</td>
                  <td>
                    {(row.tasima_bedeli ? row.tasima_bedeli : " ") +
                      " " +
                      (row.tasima_bedeli_turu ? row.tasima_bedeli_turu : " ")}
                  </td>
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

export default KagıtAdmin;
