import React, { useState, useEffect } from "react";
import avt from "../assets/Avatar 313.png";
import bell from "../assets/bell.png";
import ques from "../assets/question.png";
import search from "../assets/search.png";
import CardOverview from "./CardOverView.jsx";
import DataTable from "./DataTable.jsx";
import squareFour from "../assets/Squares four 1.png";
import button1599 from "../assets/Button 1509.png";
import button1530 from "../assets/Button 1529.png";
import button1529 from "../assets/Button 1530.png";
import text from "../assets/File text 1.png";
import up from "../assets/Move up.png";
import down from "../assets/Download.png";
import add from "../assets/add.png";
import AddCustomerModal from "./AddCustomerModal.jsx";
export default function DashBoard() {
  const [loading, setLoading] = useState(true);
  const [totalOrderValue, setTotalOrderValue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [refreshCount, setRefreshCount] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, [refreshCount]);

  const fetchData = () => {
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
  };

  // const handleDataUpdated = () => {
  //   setRefreshCount((prev) => prev + 1);
  // };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleAddCustomer = async (newCustomer) => {
    try {
      const response = await fetch(
        "https://67f095ff2a80b06b88982583.mockapi.io/data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newCustomer["CUSTOMER NAME"],
            companyName: newCustomer["COMPANY"],
            orderValue: newCustomer["ORDER VALUE"],
            orderDate: newCustomer["ORDER DATE"],
            status: newCustomer["STATUS"],
            avatar:
              "https://i.pinimg.com/736x/25/8b/d3/258bd35c4067d20b745c577f5d79564b.jpg",
            profit: "0",
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to add customer");

      setRefreshCount((prev) => prev + 1); // Trigger reload
      setShowAddModal(false);
      alert("Thêm khách hàng thành công!");
    } catch (error) {
      console.error("Error:", error);
      alert("Lỗi khi thêm khách hàng!");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleExportCSV = () => {
    fetch("https://67f095ff2a80b06b88982583.mockapi.io/data")
      .then((res) => res.json())
      .then((data) => {
        const headers = [
          "Customer Name",
          "Company",
          "Order Value",
          "Order Date",
          "Status",
        ];

        const csvContent = [
          headers.join(","),
          ...data.map((item) =>
            [
              `"${item.name || "N/A"}"`,
              `"${item.companyName || "N/A"}"`,
              `"$${item.orderValue || "0"}"`,
              `"${
                item.orderDate
                  ? new Date(item.orderDate).toLocaleDateString()
                  : "N/A"
              }"`,
              `"${item.status || "NEW"}"`,
            ].join(",")
          ),
        ].join("\n");

        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "customers_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

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
            <div className="section" onClick={handleAddClick}>
              <img src={add} />
              <span>Add</span>
            </div>
            <div className="section">
              <img src={down} />
              <span>Import</span>
            </div>
            <div className="section">
              <img src={up} onClick={handleExportCSV} />
              <span>Export</span>
            </div>
          </div>
        </div>

        <DataTable
          refreshTrigger={refreshCount} // Thay vì onDataUpdated
          onDataChange={() => setRefreshCount((prev) => prev + 1)}
        />
        {showAddModal && (
          <AddCustomerModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddCustomer}
          />
        )}
      </div>
    </>
  );
}
