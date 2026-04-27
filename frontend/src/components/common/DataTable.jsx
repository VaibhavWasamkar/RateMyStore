import { useState, useEffect, useRef } from "react";
import "./DataTable.css";

const DataTable = ({ data, columns }) => {
  const [search, setSearch] = useState("");

  const [selectedFields, setSelectedFields] = useState(columns.map(c => c.key));
  const [tempFields, setTempFields] = useState(selectedFields);

  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef();

  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // 🔍 FILTER + SEARCH
  const filteredData = data.filter((item) =>
    selectedFields.some((field) =>
      String(item[field] || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  );

  // 🔃 SORT
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;

    if (sortOrder === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  // 🔃 SORT CLICK
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // 🎯 APPLY FILTER
  const applyFilter = () => {
    setSelectedFields(tempFields);
    setShowFilter(false);
  };

  // ❌ CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="data-table">

      {/* SEARCH + FILTER */}
      <div className="table-controls">
        <input
          className="table-search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="filter-btn" onClick={() => setShowFilter(!showFilter)}>
          ⚙️
        </button>
      </div>

      {/* 🎯 FILTER POPUP */}
      {showFilter && (
        <div ref={filterRef} className="filter-popup">
          <h4>Select Fields</h4>

          {columns.map((col) => (
            <label key={col.key}>
              <input
                type="checkbox"
                checked={tempFields.includes(col.key)}
                onChange={() => {
                  setTempFields((prev) =>
                    prev.includes(col.key)
                      ? prev.filter((f) => f !== col.key)
                      : [...prev, col.key]
                  );
                }}
              />
              {col.label}
            </label>
          ))}

          <button className="apply-btn" onClick={applyFilter}>
            Apply
          </button>
        </div>
      )}


      <p>Click on Header to Sort in Asc/Desc order.</p>

      {/* 📊 TABLE */}
      <div className="table-wrapper">
        <table className="modern-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} onClick={() => handleSort(col.key)}>
                  {col.label}
                  {sortField === col.key && (sortOrder === "asc" ? " ↑" : " ↓")}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((row, idx) => (
                <tr key={idx}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="no-data">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;