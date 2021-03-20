import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import GoogleMapReact from "google-map-react";
import SearchResultCard from "../SearchResultCard/SearchResultCard";

import "./Destination.css";

const Destination = ({ center, zoom }) => {
  const [showResult, setShowResult] = useState(false);
  const [searchInput, setSearchInput] = useState({
    from: "",
    to: "",
    date: "",
  });
  const handleSearchBtn = () => {
    setShowResult(!showResult);
  };
  const handleChange = (event) => {
    const newSearchInput = { ...searchInput };
    newSearchInput[event.target.name] = event.target.value;
    setSearchInput(newSearchInput);
  };
  return (
    <Container className="destination">
      <Row>
        <Col sm={12} md={6} lg={4}>
          {showResult === false ? (
            <div className="search-destination">
              <form onSubmit={handleSearchBtn}>
                <div>
                  <label htmlFor="from">From</label>
                  <input
                    name="from"
                    onBlur={handleChange}
                    type="text"
                    placeholder="Sylhet"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="to">To</label>
                  <input
                    name="to"
                    onBlur={handleChange}
                    type="text"
                    placeholder="Sunamgonj"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="to">Choose a Date</label>
                  <input
                    name="date"
                    onBlur={handleChange}
                    type="date"
                    required
                  />
                </div>
                <div className="search-btn">
                  <input type="submit" value="Search" />
                </div>
              </form>
            </div>
          ) : (
            <SearchResultCard searchInput={searchInput} />
          )}
        </Col>

        <Col sm={12} md={6} lg={8}>
          <div className="map">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyBUpkr7qhPdtXs-gjEmZvmOBPQ5TuzEcrw",
              }}
              defaultCenter={center}
              defaultZoom={zoom}
            ></GoogleMapReact>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

Destination.defaultProps = {
  center: {
    lat: 24.886436,
    lng: 91.880722,
  },
  zoom: 11,
};
export default Destination;
