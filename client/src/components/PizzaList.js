import React from "react";
import { Link } from "react-router-dom";

// PizzaList.js
function PizzaList({ pizzas }) {
  return (
    <div>
      <h2>Pizzas:</h2>
      <ul>
        {pizzas && pizzas.length > 0 ? (
          pizzas.map((pizza) => (
            <li key={pizza.id}>
              <Link to={`/pizzas/${pizza.id}`}>
                <strong>{pizza.name}</strong> - {pizza.ingredients}
              </Link>
            </li>
          ))
        ) : (
          <p>No pizzas available</p>
        )}
      </ul>
    </div>
  );
}

export default PizzaList;
