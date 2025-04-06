import React, { useState } from "react";
import "./AddCustomerModal.css";

const AddCustomerModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    company: "",
    orderValue: "",
    orderDate: "", // Bỏ giá trị mặc định
    status: "NEW",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data
    if (
      !formData.customerName ||
      !formData.company ||
      !formData.orderValue ||
      !formData.orderDate
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Format the data to match API structure
    const newCustomer = {
      "CUSTOMER NAME": formData.customerName,
      COMPANY: formData.company,
      "ORDER VALUE": formData.orderValue,
      "ORDER DATE": formData.orderDate,
      STATUS: formData.status,
    };

    onAdd(newCustomer);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add New Customer</h3>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Customer Name:</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Company:</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Order Value ($):</label>
            <input
              type="number"
              name="orderValue"
              value={formData.orderValue}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Order Date:</label>
            <input
              type="date" // Thay đổi từ text sang date
              name="orderDate"
              value={formData.orderDate}
              onChange={handleChange}
              required // Thêm required
            />
          </div>
          <div className="form-group">
            <label>Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="NEW">NEW</option>
              <option value="IN-PROGRESS">IN-PROGRESS</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Add Customer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModal;
