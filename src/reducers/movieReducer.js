import constants from '../constants/actionTypes'

let initialState = {
      movies: [],
      selectedMovie: null,
      loading: false,
      error: null
}

const movieReducer = (state = initialState, action) => {
      let updated = Object.assign({}, state);

      switch(action.type) {
            case constants.FETCH_MOVIES:
                  // Handle potential wrapper: { success: true, movies: [...] } or { movies: [...] }
                  let moviesList = [];
                  if (Array.isArray(action.movies)) {
                        moviesList = action.movies;
                  } else if (action.movies && Array.isArray(action.movies.movies)) {
                        moviesList = action.movies.movies;
                  } else if (action.movies && Array.isArray(action.movies.data)) {
                        moviesList = action.movies.data;
                  }

                  updated['movies'] = moviesList;
                  updated['selectedMovie'] = moviesList[0] || null;
                  return updated;
            case constants.SET_MOVIE:
                  updated['selectedMovie'] = action.selectedMovie;
                  return updated;
            case constants.FETCH_MOVIE:
                  // Handle potential wrapper: { movie: {...}, reviews: [...] } or just the movie
                  let selected = action.selectedMovie;
                  if (action.selectedMovie && action.selectedMovie.movie) {
                        selected = action.selectedMovie.movie;
                        if (action.selectedMovie.reviews) {
                              selected.reviews = action.selectedMovie.reviews;
                        }
                  }
                  updated['selectedMovie'] = selected;
                  return updated;
            default:
                  return state;
      }
}

export default movieReducer;