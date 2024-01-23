import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const navigate = useNavigate(); 

  useEffect(() => {
   
    fetch(`http://127.0.0.1:5559/restaurants/${id}`)
      .then((response) => response.json())
      .then((data) => setRestaurant(data))
      .catch((error) => console.error("Error fetching restaurant details:", error));
  }, [id]);

  const handleDelete = async () => {
    try {
     
      await fetch(`http://127.0.0.1:5559/restaurants/${id}`, {
        method: "DELETE",
      });

      
      navigate("/restaurants");
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  return (
    <div>
      <h2>{restaurant.name}</h2>
      <p>{restaurant.address}</p>
      <button onClick={handleDelete}>Delete Restaurant</button>
    </div>
  );
}

export default RestaurantDetails;
