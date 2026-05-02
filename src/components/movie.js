import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { fetchMovie } from "../actions/movieActions";
import MovieDetail from "../components/moviedetail"

// support routing

function Movie(props) {
    const [selectedMovie] = useState(props.selectedMovie);
    const params = useParams();
    const movieTitle = params.movieTitle;
    console.log(movieTitle);
    const dispatch = useDispatch();
    if (selectedMovie == null) {
        dispatch(fetchMovie(movieTitle));
    }

    return (<MovieDetail movieTitle={movieTitle} />)
}

export default Movie;