import React, { useReducer, useEffect } from "react";
import { getUpcomingMovies } from "../api/tmdb-api";

const reducer = (state, action) => {
  switch (action.type) {
    case "add-favorite":
      return {
        movies: state.movies.map((m) =>
          m.id === action.payload.movie.id ? { ...m, favorite: true } : m
        ),
      };
    case "remove-favorite":
      return {
        movies: state.movies.map((m) =>
          m.id === action.payload.movie.id ? { ...m, favorite: false } : m
        ),
      };
    case "load-upcoming-movies":
      return {
        movies: action.payload.movies,
      };
    case "add-review":
      return {
        movies: state.movies.map((m) =>
          m.id === action.payload.movie.id
            ? { ...m, review: action.payload.review }
            : m
        )
      };
    default:
      return state;
  }
};

export const UpcomingMoviesContext = React.createContext(null);

const UpcomingMoviesContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, { movies: [] });

  const addToFavorites = (movieId) => {
    const index = state.movies.map((m) => m.id).indexOf(movieId);
    dispatch({ type: "add-favorite", payload: { movie: state.movies[index] } });
  };

  const removeFromFavorites = (movieId) => {
    const index = state.movies.map((m) => m.id).indexOf(movieId);
    dispatch({
      type: "remove-favorite",
      payload: { movie: state.movies[index] },
    });
  };

  const addReview = (movie, review) => {
    dispatch({ type: "add-review", payload: { movie, review } });
  };

  useEffect(() => {
    getUpcomingMovies().then((movies) => {
      dispatch({ type: "load-upcoming-movies", payload: { movies } });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UpcomingMoviesContext.Provider
      value={{
        movies: state.movies,
        addToFavorites: addToFavorites,
        removeFromFavorites: removeFromFavorites,
        addReview: addReview,
      }}
    >
      {props.children}
    </UpcomingMoviesContext.Provider>
  );
};

export default UpcomingMoviesContextProvider;