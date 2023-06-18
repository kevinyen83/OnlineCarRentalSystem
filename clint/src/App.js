import "./App.css";
import React, { useState } from "react";
import Axios from "axios";
import CartPopup from "./components/CartPopup.js";
import FormPopup from "./components/FormPopup.js";
import CarBrowsing from "./components/CarBrowsing.js";
import NavBar from "./components/NavBar.js";

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0); 
    const [isCartEmpty, setIsCartEmpty] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [cartPopup, setCartPopup] = useState(false);
    const [reservationDays, setReservationDays] = useState(1);
    const [lastId, setLastId] = useState(0);
    const [isEmailValidated, setIsEmailValidated] = useState(false);
    const [bondValue, setBondValue] = useState("?");
    const [hasRentingHistory, setHasRentingHistory] = useState(false);
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);

        const [firstName, setFirstName] = useState("");
        const [lastName, setLastName] = useState("");
        const [email, setEmail] = useState("");
        const [address, setAddress] = useState("");
        const [city, setCity] = useState("");
        const [state, setState] = useState("");
        const [postCode, setPostCode] = useState("");
        const [paymentType, setPaymentType] = useState("");

    const handleValueChange = (e) => {
        setReservationDays(e.target.value); 
    };

    const toggleCartPopup = () => {
        if (isCartEmpty === false){
            setCartPopup(!cartPopup);
        }else{
            alert("No car has been reserved!")
        }
    }

    const removeItem = (item) => {
        const itemIndex = cartItems.findIndex((i) => i === item);
        if (itemIndex >= 0) {
        const updatedItems = [...cartItems];
        updatedItems.splice(itemIndex, 1);
    
        setCartItems(updatedItems);
        setTotalPrice(totalPrice - item.price_per_day);
        setIsCartEmpty(updatedItems.length === 0);
        }
        };

    const checkout = (item) => {
        if (!isCartEmpty) {
        setShowForm(!showForm);
        setCartPopup(false);
        setTotalPrice(
            cartItems.reduce((total, item) => total + item.price_per_day * item.reservationDays, 0)
        );
        setCartPopup(false);
        } else {
            alert("Invaild Input Value!")
        }
    };
  
    const updateCarAvailability = () => {
        fetch("http://localhost:3001/cars.json")
            .then((res) => res.json())
            .then((data) => {
            const updatedCars = data.cars.map((car) => {
                const foundCartItem = cartItems.find(
                (item) => item.name === car.name
                );
                if (foundCartItem) {
                return {
                    ...car,
                    availability: "No"
                };
                }
                return car;
            });
        
            fetch("http://localhost:3001/cars.json", {
                method: "PUT",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({ cars: updatedCars })
            })
                .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to update car availability.");
                }
                console.log("Car availability updated successfully.");
                })
                .catch((error) => {
                console.error(error);
                });
            })
            .catch((error) => {
            console.error(error);
            });
        };

    const bookingCar = (event, car) => {
        event.preventDefault();
            if (firstName && lastName && email && address && city && state && postCode && paymentType !== " ") {
                if (email.includes("@")) {
                    if (isEmailValidated != true){
                        alert("Please validate your Email first")
                    } else {
                    Axios.post("http://localhost:3001/create", {
                        email: email,
                        totalPrice: totalPrice,
                            }).then(() => {
                            console.log("success");
                            });
                    updateCarAvailability(cartItems)
                    
                    setShowForm(false);
                    setCartItems([]);
                    setIsCartEmpty(true);
                    setShowForm(false);
        
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setAddress("");
                    setCity("");
                    setState("");
                    setPostCode("");
                    setPaymentType("");
                    
                    alert("Order placed successfully!");
                    console.log("Form submitted", email, totalPrice);                    
                    }
            } else {
                alert("It's not a valid email address");
                }
        } else {
            alert("Please fill in all fields.");
        }
      };

      const validateEmail = () => {
        Axios.post("http://localhost:3001/validateEmail", { email })
          .then(response => {
            const { hasRentingHistory } = response.data;
            setHasRentingHistory(hasRentingHistory);
            console.log("A" + hasRentingHistory)
            setIsEmailValidated(true);
            if (email !== " " && email.includes("@")) {
                console.log("B" + hasRentingHistory)
                alert("Validation successful!")
                if (hasRentingHistory == true){
                    setBondValue(0)
                } else if (hasRentingHistory == false) {
                    setBondValue(200)
                }
        } else {
            alert("Please fill in the email field with a valid email address");
        }
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
    <>
    {/* NavBar */}
        <body>
            <NavBar 
            toggleCartPopup={toggleCartPopup}
            cartItems={cartItems}
            setFilteredCars={setFilteredCars}
            cars={cars}
            />

            <div className="container">
                {/* main-area */}
                <CarBrowsing
                    lastId={lastId}
                    setCartItems={setCartItems}
                    cartItems={cartItems}
                    setTotalPrice={setTotalPrice}
                    totalPrice={totalPrice}
                    setIsCartEmpty={setIsCartEmpty}
                    setLastId={setLastId}
                    isCartEmpty={isCartEmpty}
                    cars={cars}
                    setCars={setCars}
                    filteredCars={filteredCars}
                    setFilteredCars={setFilteredCars}
                />
                
                {/* cart-popup */}
                <CartPopup   
                    cartPopup={cartPopup}
                    toggleCartPopup={toggleCartPopup}
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    checkout={checkout}
                    isCartEmpty={isCartEmpty}
                    removeItem={removeItem} 
                />

                {/* form-popup */}
                <FormPopup
                    showForm={showForm}
                    checkout={checkout}
                    firstName={firstName}
                    setFirstName={setFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    email={email}
                    setEmail={setEmail}
                    validateEmail={validateEmail}
                    address={address}
                    setAddress={setAddress}
                    city={city}
                    setCity={setCity}
                    state={state}
                    setState={setState}
                    postCode={postCode}
                    setPostCode={setPostCode}
                    paymentType={paymentType}
                    setPaymentType={setPaymentType}
                    bookingCar={bookingCar}
                    totalPrice={totalPrice}
                    bondValue={bondValue}
                />
            </div>
    </body>
</>
)
}

export default App;