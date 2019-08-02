import React from "react";
import ReactDom from "react-dom";
import MovieHighlight from "./MovieHighlight";
import MovieCollection from "./MovieCollection";
import MovieFilters from "./MovieFilters";
import "./styles/_reset.scss";
import "./styles/app.scss";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: false
    };

    this.currentYear = new Date().getFullYear();
    this.sortDefault = "popularity";
    this.url = window.location.href;

    this.movieSelect = this.movieSelect.bind(this);
    this.sortSelect = this.sortSelect.bind(this);
    this.yearSelect = this.yearSelect.bind(this);
  }

  componentDidMount() {
    if (this.url.includes("movie?")) {
      const params = this.url.substring(this.url.indexOf("movie?") + 6);
      const collectionYear = params.substring(
        params.indexOf("year=") + 5,
        params.indexOf("&highlight")
      );
      const highlightId = params.substring(
        params.indexOf("highlight=") + 10,
        params.indexOf("&sort")
      );
      const sortType = params.substring(params.indexOf("sort=") + 5);

      this.fetchMovie(collectionYear, highlightId, sortType);
    } else {
      this.fetchTrailer(this.currentYear, false, this.sortDefault);
    }
  }

  fetchCollection(collectionYear, highlight, sortType, video) {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=aa0ea741dcbdabdf6fd9953b60e629cf&primary_release_year=${collectionYear}&sort_by=${sortType}.desc`
    )
      .then(response => response.json())
      .then(data =>
        this.refreshState(collectionYear, data, highlight, sortType, video)
      )
      .catch(error => this.setState({ error, loading: false }));
  }

  fetchMovie(collectionYear, movieId, sortType) {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=aa0ea741dcbdabdf6fd9953b60e629cf`
    )
      .then(response => response.json())
      .then(data => this.fetchTrailer(collectionYear, data, sortType))
      .catch(error => this.setState({ error, loading: false }));
  }

  fetchTrailer(collectionYear, movieId, sortType) {
    const videoId = typeof movieId === "object" ? movieId.id : 420818;

    fetch(
      `https://api.themoviedb.org/3/movie/${videoId}/videos?api_key=aa0ea741dcbdabdf6fd9953b60e629cf`
    )
      .then(response => response.json())
      .then(data =>
        this.fetchCollection(collectionYear, movieId, sortType, data)
      )
      .catch(error => this.setState({ error, loading: false }));
  }

  movieSelect(movieIndex) {
    this.fetchTrailer(
      this.state.year,
      this.state.data.results[movieIndex],
      this.state.sort
    );
  }

  refreshState(collectionYear, data, highlight, sortType, video) {
    const stateUpdate = {
      data: data,
      highlight: data.results[0],
      sort: sortType,
      video: video,
      year: collectionYear,
      loading: false,
      error: false
    };

    if (highlight) {
      stateUpdate.highlight = highlight;
    }

    this.setState(stateUpdate);
  }

  sortSelect(sort) {
    this.fetchTrailer(this.state.year, this.state.highlight, sort);
  }

  yearSelect(year) {
    this.fetchTrailer(year, this.state.highlight, this.state.sort);
  }

  render() {
    if (this.state.loading) {
      return <div className="loading"></div>;
    }

    if (this.state.error) {
      return <div className="error">Something went wrong</div>;
    }

    const highlight = this.state.highlight;
    const movieData = this.state.data.results;

    window.history.pushState(
      `${this.state.year}-${highlight.title}-${this.state.sort}`,
      "Title",
      `movie?year=${this.state.year}&highlight=${highlight.id}&sort=${this.state.sort}`
    );

    return (
      <React.StrictMode>
        <div className="app">
          <MovieHighlight
            poster={highlight.poster_path}
            summary={highlight.overview}
            title={highlight.title}
            userRating={highlight.vote_average}
            video={this.state.video.results}
          />
          <MovieCollection
            movieData={movieData}
            movieSelect={this.movieSelect}
          />
          <MovieFilters
            currentYear={this.currentYear}
            selectedSort={this.state.sort}
            selectedYear={this.state.year}
            sortSelect={this.sortSelect}
            yearSelect={this.yearSelect}
          />
        </div>
      </React.StrictMode>
    );
  }
}

ReactDom.render(<App />, document.getElementById("root"));
