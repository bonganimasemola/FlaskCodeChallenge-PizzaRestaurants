import React from "react";
import { Link } from "react-router-dom";

// RestaurantList.js
function RestaurantList({ restaurants }) {
  return (
    <div>
      {(restaurants && restaurants.length === 0) ? (
        <p>Loading...</p>
      ) : (
        restaurants.map((restaurant, i) => (
          <div key={i}>
            <Link to={`/restaurants/${restaurant.id}`}>
              <h2>{restaurant.name}</h2>
            </Link>
            <p>{restaurant.address}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default RestaurantList;
