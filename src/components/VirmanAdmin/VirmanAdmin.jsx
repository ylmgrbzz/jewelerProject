import React, { useEffect, useState } from "react";
import "./VirmanAdmin.css";
import { FaEdit, FaTrash } from "react-icons/fa";

import { Link } from "react-router-dom";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const VirmanAdmin = () => {
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
          "https://kuyumcu.mmustafa.dev/v1/admin/virmanListele"
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
    alici_kasa: "",
    transfer_cinsi: "",
    transfer_tutari: "",
    aciklama: "",
    type: "",
    type2: "",
  });

  const handleEdit = (rowData) => {
    console.log("Edit:", rowData);

    console.log("Tıklanan Satır Verileri:", rowData);

    if (rowData.type === "virman") {
      setFormData({
        alici_kasa: rowData.alici_kasa.name,
        transfer_cinsi: rowData.transfer_cinsi,
        transfer_tutari: rowData.transfer_tutari,
        gonderen_kasa: rowData.gonderen_kasa.name,
        aciklama: rowData.aciklama,
        type: rowData.type,
        type2: rowData.type2,
      });
      localStorage.setItem("editedData", JSON.stringify(rowData));

      if (rowData.type === "virman") {
        localStorage.setItem("localstorage_virman", JSON.stringify(rowData));
      }
      navigate("/virmanGuncellemeAdmin");
    }
  };

  const handleDelete = async (islemId) => {
    const isConfirmed = window.confirm("Bu kaydı silmek istiyor musunuz?");

    if (isConfirmed) {
      try {
        // Send a delete request to the backend
        await api.delete(
          `https://kuyumcu.mmustafa.dev/v1/admin/islemSil/${islemId}`
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
                GÖNDEREN KASA
                <input
                  className="filter-input"
                  type="text"
                  value={kaydedenKisiFilter}
                  onChange={(e) => setKaydedenKisiFilter(e.target.value)}
                />
              </th>
              <th>
                ALICI KASA
                <input
                  className="filter-input"
                  type="text"
                  value={firmaFilter}
                  onChange={(e) => setFirmaFilter(e.target.value)}
                />
              </th>
              <th>TRANSFER CİNSİ</th> <th>TRANSFER TUTARI</th>
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
                  <td>{row?.gonderen_kasa?.name}</td>
                  <td>{row?.alici_kasa?.name}</td>
                  <td>{row.transfer_cinsi ? row.transfer_cinsi : " "}</td>
                  <td>{row.transfer_tutari ? row.transfer_tutari : " "}</td>
                  <td>{row.aciklama ? row.aciklama : " "}</td>
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

export default VirmanAdmin;
