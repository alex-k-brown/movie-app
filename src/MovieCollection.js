import React from "react";
import MovieThumbnail from "./MovieThumbnail";
import "./styles/_movie-collection.scss";

const MovieCollection = ({ movieData, movieSelect }) => {
  const movieList = movieData.slice(0, 10);
  return (
    <div className="movie-collection">
      {movieList.map(function(movie, n) {
        return (
          <MovieThumbnail
            index={n}
            key={n}
            movieSelect={movieSelect}
            poster={movie.poster_path}
            title={movie.title}
          />
        );
      })}
    </div>
  );
};

export default MovieCollection;
