import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';

import PizzaList from "./components/PizzaList";
import RestaurantList from "./components/RestaurantList";
import RestaurantDetails from "./components/RestaurantDetails";
import RestaurantPizzasList from "./components/RestaurantPizzasList"; 

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
    <Router>
      <div className="App">
        <h1>Pizza time!</h1>
        <p>Nibble on New York's tastiest pizza!</p>

        <Link to="/pizzas">Pizzas</Link>
        <Link to="/restaurants">Restaurants</Link>
        <Link to="/restaurant_pizzas">Restaurant Pizzas</Link>

        <Routes>
          <Route path="/pizzas" element={<PizzaList pizzas={data.pizzas} />} />
          <Route path="/restaurants" element={<RestaurantList restaurants={data.restaurants} />} />
          <Route path="/restaurants/:id" element={<RestaurantDetails />} />
          <Route path="/restaurant_pizzas" element={<RestaurantPizzasList />} />
          <Route path="/" element={<DefaultComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

function DefaultComponent() {
  return <p></p>;
}

export default App;
