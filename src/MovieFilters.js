import React from "react";
import SortFilter from "./SortFilter";
import YearFilter from "./YearFilter";
import "./styles/_movie-filters.scss";

const MovieFilters = ({
  currentYear,
  selectedSort,
  selectedYear,
  sortSelect,
  yearSelect
}) => {
  return (
    <div className="movie-filters">
      <YearFilter
        currentYear={currentYear}
        selectedYear={selectedYear}
        yearSelect={yearSelect}
      />
      <SortFilter selectedSort={selectedSort} sortSelect={sortSelect} />
    </div>
  );
};

export default MovieFilters;
