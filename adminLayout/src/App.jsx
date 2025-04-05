import React, { useState, useEffect } from "react";
import "./App.css";
import avt from "./assets/Avatar 313.png";
import bell from "./assets/bell.png";
import ques from "./assets/question.png";
import search from "./assets/search.png";
import CardOverview from "./components/CardOverView.jsx";
import squareFour from "./assets/Squares four 1.png"; // Đường dẫn đến hình ảnh
import button1599 from "./assets/Button 1509.png";
import button1530 from "./assets/Button 1529.png";
import button1529 from "./assets/Button 1530.png";
function App() {
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
    <div className="container">
      <div className="left">LEFT</div>
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
      <div className="right3">RIGHT3</div>
    </div>
  );
}
export default App;
