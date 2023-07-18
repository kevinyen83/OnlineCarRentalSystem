import React, { useState, useEffect } from "react";

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
          alert("Sorry, the car is not available now. Please try other cars.");
        }
      })
      .catch((error) => {
        console.error("Error adding car to cart:", error);
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
