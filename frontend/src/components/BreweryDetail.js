import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BreweryDetail = () => {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchBrewery = async () => {
      try {
        const res = await axios.get(`/api/breweries/${id}`);
        setBrewery(res.data);
        setReviews(res.data.reviews);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBrewery();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `/api/breweries/${id}/reviews`,
        { rating, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews([...reviews, res.data]);
    } catch (error) {
      console.error(error);
    }
  };

  if (!brewery) return <div>Loading...</div>;

  return (
    <div>
      <h2>{brewery.name}</h2>
      <p>{brewery.street}, {brewery.city}, {brewery.state}</p>
      <p>{brewery.phone}</p>
      <p><a href={brewery.website_url}>{brewery.website_url}</a></p>
      <h3>Reviews</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            <p>Rating: {review.rating}</p>
            <p>{review.description}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleReviewSubmit}>
        <h3>Add a Review</h3>
        <div>
          <label>Rating</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BreweryDetail;
