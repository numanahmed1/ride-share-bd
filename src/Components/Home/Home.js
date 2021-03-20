import React from "react";
import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import cardData from "../../Data/fakeData.json";
import RideCard from "../RideCard/RideCard";
import "./Home.css";

const Home = () => {
  const [rideTypes, setRideTypes] = useState([]);
  useEffect(() => {
    setRideTypes(cardData);
  }, []);
  console.log(rideTypes);
  return (
    <div className="home d-flex align-items-center">
      <Container>
        <Row>
          {rideTypes.map((rideType) => (
            <RideCard key={rideType.id} rideType={rideType} />
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
