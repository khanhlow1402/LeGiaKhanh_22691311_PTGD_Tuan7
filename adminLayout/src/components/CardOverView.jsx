import React from "react";
import "./CardOverView.css";

const CardOverview = ({ title, value, per, color, imageLogo }) => {
  return (
    <div className="card" style={{ backgroundColor: color }}>
      <div className="card-content">
        <div className="card-header">
          <h3>{title}</h3>
          <img src={imageLogo} alt={title} />
        </div>
        <div className="card-body">
          <p className="card-value">{value}</p>
          <p
            className="card-percentage"
            // style={{ color: per >= 0 ? "#28a745" : "#dc3545" }}
          >
            <span style={{ color: per >= 0 ? "#28a745" : "#dc3545" }}>
              {per >= 0 ? "+" : ""}
              {per}%
            </span>
            <span style={{ color: "#565E6CFF" }}> period of change</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardOverview;
