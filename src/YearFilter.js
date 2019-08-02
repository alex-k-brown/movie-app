import React from "react";
import "./styles/_filter.scss";

const YearFilter = ({ currentYear, selectedYear, yearSelect }) => {
  let years = [];

  for (let i = 2000; i < currentYear + 1; i++) {
    years.push(i);
  }

  return (
    <div className="filter year-filter">
      <label htmlFor="year-select">Year</label>
      <select
        id="year-select"
        value={selectedYear}
        onChange={e => yearSelect(e.currentTarget.value)}
      >
        {years.map(function(year, n) {
          return (
            <option value={year} key={year}>
              {year}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default YearFilter;
