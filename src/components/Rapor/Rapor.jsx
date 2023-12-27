import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Rapor.css";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://52.29.240.45:3001/v1/giderListele"
        );
        const data = await response.json();
        setTableData(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredTableData = tableData.filter((row) => {
      // Check if the properties exist before accessing them
      const kaydedenKisi = row.kaydedenKisi
        ? row.kaydedenKisi.toLowerCase()
        : "";
      const firma = row.firma ? row.firma.toLowerCase() : "";
      const gider_turu = row.gider_turu ? row.gider_turu.toLowerCase() : "";
      const createdAt = row.createdAt ? row.createdAt : "";
      const aciklama = row.aciklama ? row.aciklama.toLowerCase() : "";

      // Implement your filtering logic here
      return (
        kaydedenKisi.includes(kaydedenKisiFilter.toLowerCase()) &&
        firma.includes(firmaFilter.toLowerCase()) &&
        gider_turu.includes(giderTipFilter.toLowerCase()) &&
        createdAt.includes(tarihFilter) &&
        aciklama.includes(giderFilter.toLowerCase())
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
              <th>
                TARİH
                <input
                  className="filter-input"
                  type="date"
                  value={tarihFilter}
                />
              </th>
              <th>
                GİDER
                <input
                  className="filter-input"
                  type="text"
                  onChange={(e) => setGiderFilter(e.target.value)}
                  value={giderFilter}
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
                  <td>{formattedDate}</td>
                  <td>{row.tutar + " " + row.kur}</td>
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
