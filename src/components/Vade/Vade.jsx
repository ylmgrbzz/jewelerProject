import React, { useState } from "react";
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

  const navigate = useNavigate();

  const handleInputChange = (e, setFilter) => {
    setFilter(e.target.value);
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
        row.vade.toLowerCase().includes(vadeFilter.toLowerCase())
      );
    });
  };
  const backToPage = () => {
    navigate("/jeweler");
  };

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
                VADE
                <input
                  className="filter-input"
                  type="text"
                  value={vadeFilter}
                  onChange={(e) => handleInputChange(e, setVadeFilter)}
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
                <td>{row.vade}</td>
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
    vade: "30 gün",
  },
  {
    kaydedenKisi: "Jane Doe",
    firma: "XYZ Corporation",
    altin: "5 gram",
    kagit: "Letter",
    iscilik: "40 TL",
    vade: "15 gün",
  },
  {
    kaydedenKisi: "Alice Johnson",
    firma: "123 Industries",
    altin: "8 gram",
    kagit: "A3",
    iscilik: "60 TL",
    vade: "45 gün",
  },
  {
    kaydedenKisi: "Bob Smith",
    firma: "456 Enterprises",
    altin: "15 gram",
    kagit: "Legal",
    iscilik: "75 TL",
    vade: "60 gün",
  },
  {
    kaydedenKisi: "Charlie Brown",
    firma: "789 Ltd.",
    altin: "12 gram",
    kagit: "B5",
    iscilik: "55 TL",
    vade: "20 gün",
  },
];

export default Vade;
