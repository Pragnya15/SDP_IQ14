import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:8000/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <h2>Existing Reviews</h2>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>{review.text} - Classification: {review.classification}</li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewsPage;
