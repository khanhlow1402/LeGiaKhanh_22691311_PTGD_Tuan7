import React, { useState, useEffect } from "react";
import "./DataTable.css";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const itemsPerPage = 6;

  useEffect(() => {
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

    fetchData();
  }, []);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate page numbers with ellipsis
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 4; // Number of pages to show before ellipsis

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= maxVisiblePages) {
        // Show first 4 pages, ellipsis, then last 2 pages
        for (let i = 1; i <= maxVisiblePages; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages - 1);
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - maxVisiblePages + 1) {
        // Show first 2 pages, ellipsis, then last 4 pages
        pageNumbers.push(1);
        pageNumbers.push(2);
        pageNumbers.push("...");
        for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Show first page, ellipsis, current page ±1, ellipsis, last page
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
                />
              </td>
              <td className="user">
                <img src={item.avatar} alt="" className="img-user" />{" "}
                {item.name || "N/A"}
              </td>
              <td>{item.companyName || "N/A"}</td>
              <td>${item.orderValue || "0"}</td>
              <td>{new Date(item.orderDate).toLocaleDateString() || "N/A"}</td>
              <td>
                <span
                  className={`status-badge ${
                    item.status?.toLowerCase().replace(" ", "-") || "new"
                  }`}
                >
                  {item.status || "New"}
                </span>
              </td>
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
