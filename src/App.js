import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { MovieList } from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import { SearchBox } from "./components/SearchBox";
import AddFavourites from "./components/AddFavourites";
import { RemoveFavourites } from "./components/RemoveFavourites";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=975087d7`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favouriteMovies")
    );
    setFavouriteMovies(movieFavourites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem(
      "react-movie-app-favouriteMovies",
      JSON.stringify(items)
    );
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favouriteMovies, movie];
    setFavouriteMovies(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favouriteMovies.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavouriteMovies(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading={"Movies"} />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourites" />
      </div>
      <div className="row">
        <MovieList
          movies={favouriteMovies}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
};

export default App;
