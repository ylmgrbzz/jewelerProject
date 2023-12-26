import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Vade.css";
import { Link } from "react-router-dom";

const Vade = () => {
  const [kaydedenKisiFilter, setKaydedenKisiFilter] = useState("");
  const [firmaFilter, setFirmaFilter] = useState("");
  const [altinFilter, setAltinFilter] = useState("");
  const [kagitFilter, setKagitFilter] = useState("");
  const [iscilikFilter, setIscilikFilter] = useState("");
  const [vadeFilter, setVadeFilter] = useState("");
  const [tipFilter, setTipFilter] = useState("");
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://52.29.240.45:3001/v1/vadeListele");
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
    const fetchData = async () => {
      try {
        const response = await fetch("http://52.29.240.45:3001/v1/vadeListele");
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
      const vade = (row?.vade || "").trim();

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
          miktar.toLowerCase().includes(kagitFilter.toLowerCase()) ||
          paraBirimi.toLowerCase().includes(kagitFilter.toLowerCase())) &&
        (iscilikFilter === "" ||
          iscilik.toLowerCase().includes(iscilikFilter.toLowerCase()) ||
          paraBirimi.toLowerCase().includes(iscilikFilter.toLowerCase())) &&
        (vadeFilter === "" ||
          vade.toLowerCase().includes(vadeFilter.toLowerCase()))
      );
    });

    setFilteredData(filtered);
  }, [
    kaydedenKisiFilter,
    firmaFilter,
    altinFilter,
    kagitFilter,
    iscilikFilter,
    vadeFilter,
    tipFilter,
    tableData,
  ]);

  return (
    <div>
      <div>
        <Link to="/jeweler" className="btn btn-primary back-button">
          Geri Dön
        </Link>
      </div>
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
                VADE
                <input
                  className="filter-input"
                  type="text"
                  value={vadeFilter}
                  onChange={(e) => setVadeFilter(e.target.value)}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((row, index) => (
              <tr key={index}>
                <td>{row?.user?.name}</td>
                <td>{row?.musteri?.unvan}</td>
                <td>
                  {(row.malin_cinsi ? row.malin_cinsi : " ") +
                    " " +
                    (row.has ? row.has + " " + "Has" : " ")}
                </td>
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
                <td>{row.vade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vade;
