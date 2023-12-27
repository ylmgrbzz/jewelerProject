import "./Kasa.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Kasa = () => {
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
        ? formatInputDate(e.target.value)
        : e.target.value;
    setFilter(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://52.29.240.45:3001/v1/kasaListele");
        const data = await response.json();
        setTableData(data);
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
      const has = typeof row?.has === "string" ? row.has.trim() : "";
      const type = (row?.type || "").trim();
      const miktar = typeof row?.miktar === "string" ? row.miktar.trim() : "";
      const paraBirimi = (row?.para_birimi || "").trim();
      const iscilik =
        typeof row?.iscilik === "string" ? row.iscilik.trim() : "";
      const formattedRowDate = formatInputDate(row.createdAt.split("T")[0]);
      const formattedFilterDate = formatInputDate(tarihFilter);

      const isNumeric = (value) => /^\d+$/.test(value);
      const hasValue = typeof row?.has === "string" ? row.has.trim() : "";
      const isNumericHas = (value) => typeof value === "number";
      return (
        (kaydedenKisiFilter === "" ||
          userName.toLowerCase().includes(kaydedenKisiFilter.toLowerCase())) &&
        (firmaFilter === "" ||
          unvan.toLowerCase().includes(firmaFilter.toLowerCase())) &&
        (altinFilter === "" ||
          malinCinsi.toLowerCase().includes(altinFilter.toLowerCase()) ||
          has.toLowerCase().includes(altinFilter.toLowerCase())) &&
        (tipFilter === "" ||
          type.toLowerCase().includes(tipFilter.toLowerCase())) &&
        (kagitFilter === "" ||
          (isNumeric(kagitFilter) && miktar.includes(kagitFilter)) ||
          (!isNumeric(kagitFilter) &&
            paraBirimi.toLowerCase().includes(kagitFilter.toLowerCase()))) &&
        (iscilikFilter === "" ||
          (isNumeric(iscilikFilter) && iscilik.includes(iscilikFilter)) ||
          (!isNumeric(iscilikFilter) &&
            paraBirimi.toLowerCase().includes(iscilikFilter.toLowerCase()))) &&
        (has === "" || (isNumericHas(has) && parseInt(hasValue) === has)) &&
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
                FİRMA(ÜNVAN)
                <input
                  className="filter-input"
                  type="text"
                  value={firmaFilter}
                  onChange={(e) => setFirmaFilter(e.target.value)}
                />
              </th>
              <th>
                ALTIN / GÜMÜŞ
                <input
                  className="filter-input"
                  type="text"
                  value={altinFilter}
                  onChange={(e) => setAltinFilter(e.target.value)}
                />
              </th>{" "}
              <th>
                HAS
                <input
                  className="filter-input"
                  type="text"
                  value={has}
                  onChange={(e) => setHasFilter(e.target.value)}
                />
              </th>
              <th>
                TİP
                <input
                  className="filter-input"
                  type="text"
                  value={tipFilter}
                  onChange={(e) => setTipFilter(e.target.value)}
                />
              </th>
              <th>
                KAĞIT
                <input
                  className="filter-input"
                  type="text"
                  value={kagitFilter}
                  onChange={(e) => setKagitFilter(e.target.value)}
                />
              </th>
              <th>
                İŞÇİLİK
                <input
                  className="filter-input"
                  type="text"
                  value={iscilikFilter}
                  onChange={(e) => setIscilikFilter(e.target.value)}
                />
              </th>
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
                  <td>{row?.musteri?.unvan}</td>
                  <td>{row.malin_cinsi ? row.malin_cinsi : " "}</td>
                  <td>{row.has ? row.has + " " + "Has" : " "}</td>
                  <td>{row.type}</td>
                  <td>
                    {(row.miktar ? row.miktar : " ") +
                      " " +
                      (row.para_birimi ? row.para_birimi : " ")}
                  </td>
                  <td>
                    {(row.iscilik ? row.iscilik : " ") +
                      " " +
                      (row.para_birimi ? row.para_birimi : " ")}
                  </td>
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

export default Kasa;
