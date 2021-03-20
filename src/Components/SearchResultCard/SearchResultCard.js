import React from "react";
import cardData from "../../Data/fakeData.json";
import { useParams } from "react-router";

import "./SearchResultCard.css";

const SearchResultCard = ({ searchInput }) => {
  const { id } = useParams();
  console.log(id);
  const availableVehicle = cardData.find(
    (vehicle) => vehicle.id === "702460597"
  );
  console.log(availableVehicle);
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
        <h1>coming</h1>
      </div>
    </div>
  );
};

export default SearchResultCard;
