import React from "react";
import "./search.css";

function Search({ placeHolder, onChange }) {
  return (
    <div className="search-container">
      <input
        type="text"
        name="search"
        className="search"
        placeholder={placeHolder}
        onChange={(e) => onChange(e)}
        autoComplete="false"
        size="30"
      />
      <span className="search-img">
        <i className="fas fa-search"></i>
      </span>
    </div>
  );
}

export default Search;
