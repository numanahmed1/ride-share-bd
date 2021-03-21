import React from "react";
import cardData from "../../Data/fakeData.json";
import { useParams } from "react-router";
import "./SearchResultCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

const SearchResultCard = ({ searchInput }) => {
  const { vehicleId } = useParams();
  const availableVehicle = cardData.find((vehicle) => {
    if (vehicleId) {
      return vehicle.id === vehicleId;
    } else {
      return vehicle.id === "702460597";
    }
  });
  console.log(availableVehicle);
  const {
    image_url,
    type,
    capacity1,
    price1,
    capacity2,
    price2,
    capacity3,
    price3,
  } = availableVehicle;
  const { from, to, date } = searchInput;
  return (
    <div className="search-destination">
      <div className="detail-text">
        <p>{from}</p>
        <span>To</span> <p>{to}</p>
        <div>
          <p>Date: {date}</p>
        </div>
      </div>
      <div className="detail-other">
        <div className="d-flex justify-content-between align-center hr-card">
          <div className="hr-card-left d-flex justify-content-between align-center">
            <img className="vehicle-img" src={image_url} alt="" />
            <p>{type}</p>
            <div className="icon-box">
              <FontAwesomeIcon icon={faUsers} />
              <span>{capacity1}</span>
            </div>
          </div>
          <div>
            <p>${price1}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-center hr-card">
          <div className="hr-card-left d-flex justify-content-between align-center">
            <img className="vehicle-img" src={image_url} alt="" />
            <p>{type}</p>
            <div className="icon-box">
              <FontAwesomeIcon icon={faUsers} />
              <span>{capacity2}</span>
            </div>
          </div>
          <div>
            <p>${price2}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-center hr-card">
          <div className="hr-card-left d-flex justify-content-between align-center">
            <img className="vehicle-img" src={image_url} alt="" />
            <p>{type}</p>
            <div className="icon-box">
              <FontAwesomeIcon icon={faUsers} />
              <span>{capacity3}</span>
            </div>
          </div>
          <div>
            <p>${price3}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
