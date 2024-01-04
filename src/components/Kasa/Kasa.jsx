import "./Kasa.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

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
      e.target.type === "date" && !isNaN(new Date(e.target.value).getTime())
        ? new Date(e.target.value).toISOString().split("T")[0]
        : e.target.value;
    setFilter(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          "https://kuyumcu.mmustafa.dev/v1/kasaListele"
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
              <th>HAS</th>
              <th>TİP</th>
              <th>DÖVİZ OLARAK TUTAR</th>
              <th>KAĞIT</th>
              <th>İŞÇİLİK / TAŞIMA BEDELİ</th>
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
                  <td>
                    {row.malin_cinsi ? row.malin_cinsi : row?.tasinacak_urun}
                  </td>
                  {/* <td>
                    {row.has ? row.has + " " + "Has" : row.transfer_cinsi}
                  </td> */}
                  <td>
                    {row.has
                      ? (row.type2 === "alım" ? "+" : "-") + row.has + " Has"
                      : row.transfer_cinsi}
                  </td>
                  <td>{row.type + " " + row.type2}</td>
                  <td>
                    {row.doviz_olarak_tutar ? row?.doviz_olarak_tutar : " "}
                  </td>
                  <td>
                    {(row.type2 === "alım"
                      ? " +"
                      : row.type2 === "satım"
                      ? " -"
                      : "") +
                      (row.miktar ? row.miktar : " ") +
                      " " +
                      (row.para_birimi ? row.para_birimi : " ")}
                  </td>

                  <td>
                    {(row.type2 === "alım"
                      ? " -"
                      : row.type2 === "satım"
                      ? " +"
                      : "") +
                      (row.iscilik
                        ? row.iscilik
                        : row.tasima_bedeli
                        ? row.tasima_bedeli
                        : row.transfer_tutari) +
                      " " +
                      (row.para_birimi
                        ? row.para_birimi
                          ? row.para_birimi
                          : " "
                        : row.tasima_bedeli_turu
                        ? row.tasima_bedeli_turu
                        : " ")}
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
