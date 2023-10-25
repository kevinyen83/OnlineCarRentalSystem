import React, { useState, useEffect } from "react";
import Axios from 'axios';

function CarBrowsing({
    setTotalPrice,
    totalPrice,
    setCars,
    filteredCars,
    setFilteredCars,
    cartItems,
    setCartItems,
    lastId,
    setLastId,
    setIsCartEmpty,
}) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        Axios.get("http://localhost:3001/cars.json")
          .then((response) => {
            setIsLoaded(true);
            setCars(response.data.cars);
            setFilteredCars(response.data.cars);
          })
          .catch((error) => {
            setIsLoaded(true);
            setError(error);
          });
      }, []);

  const addToCart = (car) => {
    const availableCars = filteredCars.filter(
      (c) => c.id === car.id && c.availability === "Yes"
    );

    const carAlreadyInCart = cartItems.some((item) => item.id === car.id);

    if (availableCars.length > 0 && !carAlreadyInCart) {
      const newCartItem = {
        ...car,
        id: lastId + 1
      };
      setCartItems([...cartItems, { ...newCartItem, reservationDays: 1 }]);
      setTotalPrice(totalPrice + car.price_per_day);
      setIsCartEmpty(false);
      setLastId(lastId + 1);
      sessionStorage.setItem("cartItems", JSON.stringify([...cartItems, { ...newCartItem, reservationDays: 1 }]));
      sessionStorage.setItem("totalPrice", JSON.stringify(totalPrice + car.price_per_day));
      sessionStorage.setItem("isCartEmpty", JSON.stringify(false));
      sessionStorage.setItem("lastId", JSON.stringify(lastId + 1));
      alert("Added to cart!");
    } else if (carAlreadyInCart) {
        alert("You have already reserved this car.");
    
    } else {
      alert("Sorry, the car is not available now. Please try other cars.");
    } 
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } 
  if (!isLoaded) {
    return <div>Loading...</div>;
  }{
    return (
      <div className="main-area">
        <div className="mainArea-card-container">
          {filteredCars.map((car) => (
            <div className="mainArea-card-item" key={car.id} data-testid="cart-item-id">
              <img className="mainArea-img" src={car.image} alt={car.name} data-testid="cart-item-image" />
              <h3 className="mainArea-name" data-testid="cart-item-name">{car.name}</h3>
              <p className="mainArea-title" data-testid="cart-item-category">
                <b>Category: </b>
                {car.category}
              </p>
              <p className="mainArea-title" data-testid="cart-item-model">
                <b>Model: </b>
                {car.model}
              </p>
              <p className="mainArea-title" data-testid="cart-item-mileage">
                <b>Mileage: </b>
                {car.mileage} kms
              </p>
              <p className="mainArea-title" data-testid="cart-item-fuel_type">
                <b>Fuel Type: </b>
                {car.fuel_type}
              </p>
              <p className="mainArea-title" data-testid="cart-item-seats">
                <b>Seats: </b>
                {car.seats}
              </p>
              <p className="mainArea-title" data-testid="cart-item-price_per_day">
                <b>Price Per Day: </b>
                {car.price_per_day} AU
              </p>
              <p className="mainArea-title" data-testid="cart-item-availability">
                <b>Availability: </b>
                {car.availability}
              </p>
              <p className="mainArea-description" data-testid="cart-item-description">
                <b>Description: </b>
                {car.description}
              </p>
              <br />
              <div>
                <button
                    className="addToCartBtn"
                    onClick={() => addToCart(car)}
                    data-testid="add-to-cart-btn"
                >
                Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CarBrowsing;
