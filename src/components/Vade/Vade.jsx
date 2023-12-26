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
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://52.29.240.45:3001/v1/vadeListele");
        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e, setFilter) => {
    setFilter(e.target.value);
  };

  // const filterData = (data) => {
  //   return data.filter((row) => {
  //     return (
  //       row.kaydedenKisi
  //         ?.toLowerCase()
  //         .includes(kaydedenKisiFilter.toLowerCase()) &&
  //       row?.user?.name.toLowerCase().includes(firmaFilter?.toLowerCase()) &&
  //       row.altin.toLowerCase().includes(altinFilter?.toLowerCase()) &&
  //       row.kagit.toLowerCase().includes(kagitFilter?.toLowerCase()) &&
  //       row.iscilik.toLowerCase().includes(iscilikFilter?.toLowerCase()) &&
  //       row.vade.toLowerCase().includes(vadeFilter?.toLowerCase())
  //     );
  //   });
  // };

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
                ALTIN / GÜMÜŞ
                <input
                  className="filter-input"
                  type="text"
                  value={altinFilter}
                  onChange={(e) => handleInputChange(e, setAltinFilter)}
                />
              </th>
              <th>
                TİP
                <input
                  className="filter-input"
                  type="text"
                  value={kagitFilter}
                  onChange={(e) => handleInputChange(e, setKagitFilter)}
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
            {tableData?.map((row, index) => (
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
