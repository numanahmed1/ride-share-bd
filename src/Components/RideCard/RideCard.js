import React from "react";
import { Card, Col } from "react-bootstrap";
import { useHistory } from "react-router";
import "./RideCard.css";

const RideCard = ({ rideType }) => {
  const { type, image_url, id } = rideType;
  const history = useHistory();
  const handleRideType = (id) => {
    const url = `/destination/${id}`;
    history.push(url);
  };
  return (
    <Col
      className="main-card col-6"
      onClick={() => handleRideType(id)}
      md={6}
      lg={3}
    >
      <Card className="ride-card h-100">
        <Card.Img variant="top" src={image_url} />
        <Card.Body>
          <Card.Title className="ride-title">{type}</Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RideCard;
