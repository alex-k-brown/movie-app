import React from "react";
import "./styles/_movie-thumbnail.scss";

const MovieThumbnail = ({ index, movieSelect, poster, title }) => {
  const test = false;
  const posterPath =
    poster == null
      ? "url(//cdn4.iconfinder.com/data/icons/movie-basics/48/v-36-512.png)"
      : `url(//image.tmdb.org/t/p/w185/${poster})`;
  const movieStyle = {
    backgroundImage: posterPath
  };

  return (
    <div
      className={`movie-thumbnail movie-thumbnail-${index + 1}`}
      style={movieStyle}
      onClick={e => movieSelect(index)}
    >
      <div className="overlay">
        <div className="title">{title}</div>
      </div>
    </div>
  );
};

export default MovieThumbnail;
