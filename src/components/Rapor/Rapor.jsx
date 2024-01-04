import "./Rapor.css";

import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const Rapor = () => {
  const [kaydedenKisiFilter, setKaydedenKisiFilter] = useState("");
  const [firmaFilter, setFirmaFilter] = useState("");
  const [altinFilter, setAltinFilter] = useState("");
  const [kagitFilter, setKagitFilter] = useState("");
  const [iscilikFilter, setIscilikFilter] = useState("");
  const [tarihFilter, setTarihFilter] = useState("");
  const [giderFilter, setGiderFilter] = useState("");
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [has, setHasFilter] = useState("");
  const [giderTipFilter, setGiderTipFilter] = useState("");

  const formatInputDate = (inputDate) => {
    const [year, month, day] = inputDate.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleInputChange = (e, setFilter) => {
    const value =
      e.target.type === "date"
        ? formatInputDate(e.target.value)
        : e.target.value;
    setFilter(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          "https://kuyumcu.mmustafa.dev/v1/giderListele"
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
    const filteredTableData = tableData.filter((row) => {
      const kaydedenKisi = row.kaydedenKisi
        ? row.kaydedenKisi.toLowerCase()
        : "";
      const firma = row.firma ? row.firma.toLowerCase() : "";
      const gider_turu = row.gider_turu ? row.gider_turu.toLowerCase() : "";
      const createdAt = row.createdAt ? row.createdAt : "";

      const formattedRowDate = formatInputDate(row.createdAt.split("T")[0]);
      const formattedFilterDate = formatInputDate(tarihFilter);

      return (
        kaydedenKisi.includes(kaydedenKisiFilter.toLowerCase()) &&
        firma.includes(firmaFilter.toLowerCase()) &&
        gider_turu.includes(giderTipFilter.toLowerCase()) &&
        createdAt.includes(tarihFilter) &&
        (tarihFilter === "" || formattedRowDate === formattedFilterDate)
      );
    });

    setFilteredData(filteredTableData);
  }, [
    kaydedenKisiFilter,
    firmaFilter,
    giderTipFilter,
    tarihFilter,
    giderFilter,
    tableData,
  ]);

  return (
    <div>
      <Link to="/jeweler" className="btn btn-primary back-button">
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
                GİDER TÜRÜ
                <input
                  className="filter-input"
                  type="text"
                  value={giderTipFilter}
                  onChange={(e) => setGiderTipFilter(e.target.value)}
                />
              </th>
              <th>GİDER</th>

              <th>
                TARİH
                <input
                  className="filter-input"
                  type="date"
                  value={tarihFilter}
                  onChange={(e) => handleInputChange(e, setTarihFilter)}
                />
              </th>
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
                  <td>{row.gider_turu}</td>
                  <td>{row.tutar + " " + row.kur}</td>
                  <td>{formattedDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rapor;
