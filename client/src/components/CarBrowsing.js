import React, { useState, useEffect } from "react";
import CategoryBar from "/Users/net/car-rental-system/clint/src/components/CategoryBar.js";

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
    isCartEmpty,
    setIsCartEmpty,
}) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    fetch("http://localhost:3001/cars.json")
      .then((res) => res.json())
      .then(
        (result) => {
        setIsLoaded(true);
        setCars(result.cars);
        setFilteredCars(result.cars);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const addToCart = (car) => {
    fetch("http://localhost:3001/cars.json")
      .then((res) => res.json())
      .then((data) => {
        const availableCars = filteredCars.filter(
          (c) => c.id === car.id && c.availability === "Yes"
        );
        if (availableCars.length > 0) {
          const newCartItem = {
            ...car,
            id: lastId + 1
          };
          setCartItems([...cartItems, { ...newCartItem, reservationDays: 1 }]);
          setTotalPrice(totalPrice + car.price_per_day);
          setIsCartEmpty(false);
          setLastId(lastId + 1);
          sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
          sessionStorage.setItem("totalPrice", totalPrice);
          sessionStorage.setItem("isCartEmpty", isCartEmpty);
          sessionStorage.setItem("lastId", lastId);
          alert("Added to cart!");
        } else {
          alert(
            "Sorry, the car is not available now. Please try other cars."
          );
        }
      });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="main-area">
        <div className="mainArea-card-container">
          {filteredCars.map((car) => (
            <div className="mainArea-card-item" key={car.id}>
              <img className="mainArea-img" src={car.image} alt={car.name} />
              <h3 className="mainArea-name">{car.name}</h3>
              <p className="mainArea-title">
                <b>Category: </b>
                {car.category}
              </p>
              <p className="mainArea-title">
                <b>Model: </b>
                {car.model}
              </p>
              <p className="mainArea-title">
                <b>Mileage: </b>
                {car.mileage} kms
              </p>
              <p className="mainArea-title">
                <b>Fuel Type: </b>
                {car.fuel_type}
              </p>
              <p className="mainArea-title">
                <b>Seats: </b>
                {car.seats}
              </p>
              <p className="mainArea-title">
                <b>Price Per Day: </b>
                {car.price_per_day} AU
              </p>
              <p className="mainArea-title">
                <b>Availability: </b>
                {car.availability}
              </p>
              <p className="mainArea-description">
                <b>Description: </b>
                {car.description}
              </p>
              <br />
              <div>
                <button
                  className="addToCartBtn"
                  onClick={() => addToCart(car)}
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
