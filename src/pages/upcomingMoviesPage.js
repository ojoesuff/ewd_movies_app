import React, { useContext } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { UpcomingMoviesContext } from "../contexts/upcomingMoviesContext";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import AddToWatchlistIcon from "../components/cardIcons/addToWatchlist";

const UpcomingMoviesPage = (props) => {
  const context = useContext(UpcomingMoviesContext);
  const { movies  } = context;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <AddToFavoritesIcon movie={movie} />
            <AddToWatchlistIcon movie={movie} />
          </>
        );
      }}
    />
  );
};
export default UpcomingMoviesPage;