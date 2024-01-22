import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [data, setData] = useState({ restaurants: [], pizzas: [] });

  useEffect(() => {
   
    Promise.all([
      fetch("http://127.0.0.1:5559/pizzas").then((r) => r.json()),
      fetch("http://127.0.0.1:5559/restaurants").then((r) => r.json())
    ])
    .then(([pizzas, restaurants]) => {
      setData({ pizzas, restaurants });
    })
    .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <h1>Pizza time!</h1>
      <p>Nibble on New York's tastiest pizza!</p>

      {(data.restaurants && data.restaurants.length === 0) ? (
        <p>Loading...</p>
      ) : (
        data.restaurants.map((restaurant, i) => (
          <div key={i}>
            <h2>{restaurant.name}</h2>
            <p>{restaurant.address}</p>
          </div>
        ))
      )}

      <h2>Pizzas:</h2>
      <ul>
        {(data.pizzas && data.pizzas.length > 0) ? (
          data.pizzas.map((pizza) => (
            <li key={pizza.id}>
              <strong>{pizza.name}</strong> - {pizza.ingredients}
            </li>
          ))
        ) : (
          <p>No pizzas available</p>
        )}
      </ul>
    </div>
  );
}

export default App;
