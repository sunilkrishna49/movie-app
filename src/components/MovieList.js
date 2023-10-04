import React from "react";

export const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;
  return (
    <>
      {props.movies.map((movie, index) => (
        <div className="image-container d-flex justify-content-start col-md-2 mb-3">
          <img src={movie.Poster} alt="movie" className="movie-poster"></img>
          <div
            onClick={() => {
              props.handleFavouritesClick(movie);
            }}
            className="overlay d-flex align-items-center justify-content-center"
          >
            <FavouriteComponent />
          </div>
        </div>
      ))}
    </>
  );
};
