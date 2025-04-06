import React, { useState, useEffect } from "react";
import "./DataTable.css";
import edit from "../assets/create.png";

const DataTable = ({ refreshTrigger, onDataChange }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const itemsPerPage = 6;

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://67f095ff2a80b06b88982583.mockapi.io/data"
      );
      const jsonData = await response.json();
      setData(jsonData);
      setTotalPages(Math.ceil(jsonData.length / itemsPerPage));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Xử lý chọn từng hàng
  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Xử lý chọn tất cả
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  // Bắt đầu chỉnh sửa
  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  // Lưu thay đổi
  const handleSave = async (id) => {
    try {
      const response = await fetch(
        `https://67f095ff2a80b06b88982583.mockapi.io/data/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editForm),
        }
      );

      if (response.ok) {
        // Gọi callback thông báo thay đổi dữ liệu
        if (onDataChange) onDataChange();

        setEditingId(null);
        alert("Cập nhật thành công!");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Cập nhật thất bại!");
    }
  };

  // Hủy chỉnh sửa
  const handleCancel = () => {
    setEditingId(null);
  };

  // Cập nhật form chỉnh sửa
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Generate page numbers with ellipsis
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 4;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= maxVisiblePages) {
        for (let i = 1; i <= maxVisiblePages; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages - 1);
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - maxVisiblePages + 1) {
        pageNumbers.push(1);
        pageNumbers.push(2);
        pageNumbers.push("...");
        for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers.map((number, index) => {
      if (number === "...") {
        return (
          <span key={index} className="ellipsis">
            ...
          </span>
        );
      }
      return (
        <button
          key={index}
          onClick={() => paginate(number)}
          className={currentPage === number ? "active" : ""}
        >
          {number}
        </button>
      );
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>CUSTOMER NAME</th>
            <th>COMPANY</th>
            <th>ORDER VALUE</th>
            <th>ORDER DATE</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(item.id)}
                  onChange={() => handleRowSelect(item.id)}
                  disabled={editingId === item.id}
                />
              </td>

              {editingId === item.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name || ""}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="companyName"
                      value={editForm.companyName || ""}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="orderValue"
                      value={editForm.orderValue || ""}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      name="orderDate"
                      value={
                        editForm.orderDate
                          ? new Date(editForm.orderDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <select
                      name="status"
                      value={editForm.status || ""}
                      onChange={handleChange}
                    >
                      <option value="New">New</option>
                      <option value="In-progress">In-progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="save"
                      onClick={() => handleSave(item.id)}
                    >
                      Save
                    </button>
                    <button className="cancel" onClick={handleCancel}>
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="user">
                    <img
                      src={item.avatar || "https://i.pravatar.cc/150?img=3"}
                      alt=""
                      className="img-user"
                    />{" "}
                    {item.name || "N/A"}
                  </td>
                  <td>{item.companyName || "N/A"}</td>
                  <td>${item.orderValue || "0"}</td>
                  <td>
                    {item.orderDate
                      ? new Date(item.orderDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        item.status?.toLowerCase().replace(" ", "-") || "new"
                      }`}
                    >
                      {item.status || "New"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="image-button"
                      onClick={() => handleEdit(item)}
                    >
                      <img src={edit} className="button-image" alt="Edit" />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="botTable">
        <div className="results-count">{data.length} results</div>

        <div className="pagination">
          {renderPageNumbers()}
          <button
            onClick={() =>
              currentPage < totalPages && paginate(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
