import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import style from "./Review.module.css";

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:8000/reviews");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const renderCards = (reviews) => {
    const rows = [];
    for (let i = 0; i < reviews.length; i += 3) {
      const rowCards = reviews.slice(i, i + 3).map((review, index) => (
        <Col key={i + index} md={4} className="mb-4">
          <Card border="info" className={`${style.fixed_card}`}>
            <Card.Header>{i + index + 1}</Card.Header>
            <Card.Body>
              <Card.Text className={`${style.font_weight}`}>
                {review.text}
              </Card.Text>
              <Card.Text className={`${style.font_color}`}>
                Classification: {review.classification}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ));
      rows.push(<Row key={i}>{rowCards}</Row>);
    }

    return rows;
  };

  return (
    <Container className={`${style.outer_container}mt-4`}>
      <h2 className={`${style.heading}`}>Existing Reviews</h2>
      {renderCards(reviews)}
    </Container>
  );
}

export default ReviewsPage;
