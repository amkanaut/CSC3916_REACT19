import React, { useEffect, useState } from 'react';
import { fetchMovie, postReview } from '../actions/movieActions'; // [x] Added postReview here!
import { useDispatch, useSelector } from 'react-redux';
import { Card, ListGroup, ListGroupItem, Image, Form, Button } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { movieTitle } = useParams(); 
  const selectedMovie = useSelector(state => state.movie.selectedMovie);
  const loading = useSelector(state => state.movie.loading); 
  const error = useSelector(state => state.movie.error); 
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);

  const onSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
        movieId: selectedMovie._id,
        title: selectedMovie.title, // Backend uses this to link the review
        review: review,
        rating: rating
    };
    dispatch(postReview(reviewData));
    setReview(''); // Clear the form after submit
  };

  useEffect(() => {
    dispatch(fetchMovie(movieTitle));
  }, [dispatch, movieTitle]);

  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div className="text-danger mt-5 text-center">Error: {error.message || error.toString()}</div>;
  }

  if (!selectedMovie) {
    return <div>No movie data available.</div>;
  }

    return (
      // [x] Wrapped both cards in a single parent div!
      <div> 
        {/* TOP CARD: Movie Details & Existing Reviews */}
        <Card className="bg-dark text-white p-4 rounded mb-4">
          <Card.Header>Movie Detail</Card.Header>
          <Card.Body>
            <Image className="image" src={selectedMovie.imageUrl} thumbnail style={{ maxWidth: '300px' }} />
          </Card.Body>
          <ListGroup className="text-dark">
            <ListGroupItem><h2>{selectedMovie.title}</h2></ListGroupItem>
            <ListGroupItem>
              {/* Added optional chaining (?.) just in case actors array is empty */}
              {selectedMovie.actors?.map((actor, i) => (
                <p key={i} className="mb-1">
                  <b>{actor.actorName}</b> as {actor.characterName}
                </p>
              ))}
            </ListGroupItem>
            <ListGroupItem>
              <h4>
                <BsStarFill style={{ color: 'gold' }}/> {selectedMovie.avgRating ? Number(selectedMovie.avgRating).toFixed(1) : "N/A"}
              </h4>
            </ListGroupItem>
          </ListGroup>
          <Card.Body className="card-body bg-white text-dark mt-3 rounded">
            <h5>User Reviews</h5>
            {/* Added optional chaining (?.) here too */}
            {selectedMovie.reviews?.length > 0 ? (
                selectedMovie.reviews.map((review, i) => (
                <div key={i} className="border-bottom mb-2 pb-2">
                    <b>{review.username}</b> &nbsp; 
                    <span className="text-warning"><BsStarFill /> {review.rating}</span>
                    <p className="mb-0 mt-1">"{review.review}"</p>
                </div>
                ))
            ) : (
                <p>No reviews yet. Be the first!</p>
            )}
          </Card.Body>
        </Card>

        {/* BOTTOM CARD: The Add Review Form */}
        <Card className="bg-light text-dark p-3">
          <h4>Add a Review</h4>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Select value={rating} onChange={(e) => setRating(e.target.value)}>
                {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Stars</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Review</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                value={review} 
                onChange={(e) => setReview(e.target.value)} 
                placeholder="What did you think of the movie?"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">Submit Review</Button>
          </Form>
        </Card>
      </div>
    );
  };


export default MovieDetail;