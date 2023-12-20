import React, { useState } from "react";
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

  const navigate = useNavigate();

  const formatInputDate = (inputDate) => {
    const [year, month, day] = inputDate.split("-");
    return `${day}.${month}.${year}`;
  };
  const handleInputChange = (e, setFilter) => {
    const value =
      e.target.type === "date"
        ? formatInputDate(e.target.value)
        : e.target.value;
    setFilter(value);
  };

  const filterData = (data) => {
    return data.filter((row) => {
      return (
        row.kaydedenKisi
          .toLowerCase()
          .includes(kaydedenKisiFilter.toLowerCase()) &&
        row.firma.toLowerCase().includes(firmaFilter.toLowerCase()) &&
        row.altin.toLowerCase().includes(altinFilter.toLowerCase()) &&
        row.kagit.toLowerCase().includes(kagitFilter.toLowerCase()) &&
        row.iscilik.toLowerCase().includes(iscilikFilter.toLowerCase()) &&
        row.gider.toLowerCase().includes(giderFilter.toLowerCase()) &&
        row.tarih.includes(tarihFilter)
      );
    });
  };
  const backToPage = () => {
    navigate("/jeweler");
  };

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
                  onChange={(e) => handleInputChange(e, setKaydedenKisiFilter)}
                />
              </th>
              <th>
                FİRMA(ÜNVAN)
                <input
                  className="filter-input"
                  type="text"
                  value={firmaFilter}
                  onChange={(e) => handleInputChange(e, setFirmaFilter)}
                />
              </th>
              <th>
                ALTIN
                <input
                  className="filter-input"
                  type="text"
                  value={altinFilter}
                  onChange={(e) => handleInputChange(e, setAltinFilter)}
                />
              </th>
              <th>
                KAĞIT
                <input
                  className="filter-input"
                  type="text"
                  value={kagitFilter}
                  onChange={(e) => handleInputChange(e, setKagitFilter)}
                />
              </th>
              <th>
                İŞÇİLİK
                <input
                  className="filter-input"
                  type="text"
                  value={iscilikFilter}
                  onChange={(e) => handleInputChange(e, setIscilikFilter)}
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
              <th>
                GİDER
                <input
                  className="filter-input"
                  type="text"
                  value={giderFilter}
                  onChange={(e) => handleInputChange(e, setGiderFilter)}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {filterData(tableData).map((row, index) => (
              <tr key={index}>
                <td>{row.kaydedenKisi}</td>
                <td>{row.firma}</td>
                <td>{row.altin}</td>
                <td>{row.kagit}</td>
                <td>{row.iscilik}</td>
                <td>{row.tarih}</td>
                <td>{row.gider}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const tableData = [
  {
    kaydedenKisi: "John Doe",
    firma: "ABC Company",
    altin: "10 gram",
    kagit: "A4",
    iscilik: "50 TL",
    tarih: "01.01.2021",
    gider: "50 TL",
  },
  {
    kaydedenKisi: "Jane Doe",
    firma: "XYZ Corporation",
    altin: "5 gram",
    kagit: "Letter",
    iscilik: "40 TL",
    tarih: "02.01.2021",
    gider: "40 TL",
  },
  {
    kaydedenKisi: "Alice Johnson",
    firma: "123 Industries",
    altin: "8 gram",
    kagit: "A3",
    iscilik: "60 TL",
    tarih: "03.01.2021",
    gider: "60 TL",
  },
  {
    kaydedenKisi: "Bob Smith",
    firma: "456 Enterprises",
    altin: "15 gram",
    kagit: "Legal",
    iscilik: "75 TL",
    tarih: "03.01.2021",
    gider: "150 TL",
  },
  {
    kaydedenKisi: "Charlie Brown",
    firma: "789 Ltd.",
    altin: "12 gram",
    kagit: "B5",
    iscilik: "55 TL",
    tarih: "04.01.2021",
    gider: "33 TL",
  },
];

export default Rapor;
