import React from "react";
import "./styles/_filter.scss";

const SortFilter = ({ selectedSort, sortSelect }) => {
  const sortOptions = [
    "popularity",
    "release_date",
    "revenue",
    "original_title",
    "vote_average",
    "vote_count"
  ];

  return (
    <div className="filter sort-filter">
      <label htmlFor="sort-select">Sort</label>
      <select
        id="sort-select"
        value={selectedSort}
        onChange={e => sortSelect(e.currentTarget.value)}
      >
        {sortOptions.map(function(option, n) {
          return (
            <option value={option} key={option}>
              {option.replace("_", " ")}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SortFilter;
