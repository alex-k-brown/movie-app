import React from "react";
import Video from "./Video";
import "./styles/_movie-highlight.scss";

const MovieHighlight = ({ poster, summary, title, userRating, video }) => {
  const posterPath =
    poster == null
      ? "url(//cdn4.iconfinder.com/data/icons/movie-basics/48/v-36-512.png)"
      : `url(//image.tmdb.org/t/p/w500/${poster})`;
  const movieStyle = {
    backgroundImage: posterPath
  };

  function videoClick() {
    const movieHighlight = document.getElementById("movie-highlight");
    movieHighlight.classList.add("video-play");
  }

  function closeClick() {
    const movieHighlight = document.getElementById("movie-highlight");
    movieHighlight.classList.remove("video-play");
    document
      .getElementById("vid-player")
      .setAttribute(
        "src",
        `//www.youtube.com/embed/${video[0].key}?version=3&enablejsapi=1`
      );
  }

  return (
    <div id="movie-highlight" className="movie-highlight">
      <div className="movie-poster" style={movieStyle}></div>
      <div className="movie-info">
        <div className="title">{title}</div>
        <div className="user-rating">
          <span className="main-rating">{userRating}</span>/10
        </div>
        <div className="summary">{summary}</div>
      </div>
      <Video video={video} videoClick={videoClick} />
      <div id="close" className="close" onClick={closeClick}>
        ^
      </div>
    </div>
  );
};

export default MovieHighlight;
