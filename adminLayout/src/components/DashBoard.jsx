import React, { useState, useEffect } from "react";
import avt from "../assets/Avatar 313.png";
import bell from "../assets/bell.png";
import ques from "../assets/question.png";
import search from "../assets/search.png";
import CardOverview from "./CardOverView.jsx";
import DataTable from "./DataTable.jsx";
import squareFour from "../assets/Squares four 1.png"; // Đường dẫn đến hình ảnh
import button1599 from "../assets/Button 1509.png";
import button1530 from "../assets/Button 1529.png";
import button1529 from "../assets/Button 1530.png";
import text from "../assets/File text 1.png";
import up from "../assets/Move up.png";
import down from "../assets/Download.png";

export default function DashBoard() {
  // Fetch OverView API
  const [loading, setLoading] = useState(true);
  const [totalOrderValue, setTotalOrderValue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalCustomer, setTotalCustomer] = useState(0);

  useEffect(() => {
    fetch("https://67f095ff2a80b06b88982583.mockapi.io/data")
      .then((res) => res.json())
      .then((data) => {
        const orderValue = data.reduce(
          (sum, item) => sum + parseFloat(item.orderValue),
          0
        );
        const profit = data.reduce(
          (sum, item) => sum + parseFloat(item.profit),
          0
        );

        setTotalOrderValue(orderValue);
        setTotalProfit(profit);
        setTotalCustomer(data.length);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Fetch OverView API
  return (
    <>
      <div className="right1">
        <h2>Dashboard</h2>
        <div className="search-box">
          <img src={search} />
          <input type="text" className="search-input" placeholder="Search..." />
        </div>
        <div className="headUser">
          <img src={bell} />
          <img src={ques} />

          <img src={avt} alt="User" className="avatar" />
        </div>
      </div>
      <div className="right2">
        <div className="ovr_gr">
          <img src={squareFour} alt="Square four" />
          <span>Overview</span>
        </div>
        <div className="ovr_card">
          <CardOverview
            title="Turnover"
            value={`$${totalOrderValue.toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}`}
            per="5.39"
            color="#FEF0F5FF"
            imageLogo={button1599}
          />
          <CardOverview
            title="Profit"
            value={`$${totalProfit.toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}`}
            per="5.39"
            color="#F0F6FFFF"
            imageLogo={button1530}
          />
          <CardOverview
            title="New customer"
            value={totalCustomer.toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
            per="5.84"
            color="#F1F8FDFF"
            imageLogo={button1529}
          />
        </div>
      </div>
      <div className="right3">
        <div className="right3-head">
          <div className="ovr_gr2">
            <img src={text} />
            <span>Detailed report</span>
          </div>
          <div className="import-export-container">
            <div className="section">
              <img src={up} />
              <span>Import</span>
            </div>
            <div className="section">
              <img src={down} />
              <span>Export</span>
            </div>
          </div>
        </div>

        <DataTable />
      </div>
    </>
  );
}
