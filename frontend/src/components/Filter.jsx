import React from "react";

const Filter = ({ handleFilterText }) => {
  return (
    <div className="mb-4">
      <select
        className="form-select"
        aria-label="Note Filter"
        style={{ height: "50px", maxWidth: "500px", margin: "0 auto" }}
        onChange={(e) => handleFilterText(e.target.value)}
      >
        <option value="">All Notes</option>
        <option value="BUSINESS">Business</option>
        <option value="PERSONAL">Personal</option>
        <option value="IMPORTANT">Important</option>
      </select>
    </div>
  );
};

export default Filter;
