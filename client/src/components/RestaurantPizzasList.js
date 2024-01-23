import React, { useState, useEffect } from 'react';

const RestaurantPizzasList = () => {
  const [restaurantPizzas, setRestaurantPizzas] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5559/restaurant_pizzas")
      .then((response) => response.json())
      .then((data) => setRestaurantPizzas(data))
      .catch((error) => console.error('Error fetching restaurant pizzas data:', error));
  }, []);

  return (
    <div>
      <h2>Restaurant Pizzas List</h2>
      <ul>
        {restaurantPizzas.map((rp) => (
          <li key={rp.id}>{`Pizza: ${rp.pizza.name}, Price: $${rp.price}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantPizzasList;
