import logo from "/Users/net/car-rental-system/clint/src/components/assets/images/logo.png";
import "./App.css";
import React, { useState } from "react";
import Axios from "axios";
import CategoryBar from "/Users/net/car-rental-system/clint/src/components/CategoryBar.js";
import categoryList from "./components/categoryList";
import CartPopup from "/Users/net/car-rental-system/clint/src/components/CartPopup.js";

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

    const addToCart = (car) => {
        // alert("The cart has been reserved!");

     fetch("http://localhost:3001/cars.json")
    .then(res => res.json())
    .then(data => {
      const availableCars = data.cars.filter(c => c.id === car.id && c.availability === "Yes");
      if (availableCars.length > 0) {
        const newCartItem = {
          ...car,
          id: lastId + 1,
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
    });
    };

    class CarBrowsing extends React.Component {
        constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:3001/cars.json")
        .then(res => res.json())
        .then(
            (result) => {
            this.setState({
                isLoaded: true,
                cars: result.cars
            });
            },
            (error) => {
            this.setState({
                isLoaded: true,
                error
            });
            }
        )
    }
    
        render() {
            const { error, isLoaded, cars } = this.state;
                if (error) {
                return <div>Error: {error.message}</div>;
                } else if (!isLoaded) {
                return <div>Loading...</div>;
                } else {
                return (
                        <div className="main-area">
                            <div className="mainArea-card-container">
                                {cars.map(car => (
                                    <div className="mainArea-card-item" key={car.id}>
                                        <img className= "mainArea-img" src={car.image}></img>
                                        <h3 className="mainArea-name">{car.name}</h3>
                                        <p className="mainArea-title"><b>Category: </b>{car.category}</p> 
                                        <p className="mainArea-title"><b>Model: </b>{car.model}</p>
                                        <p className="mainArea-title"><b>Mileage: </b>{car.mileage} kms</p>
                                        <p className="mainArea-title"><b>Fuel Type: </b>{car.fuel_type}</p> 
                                        <p className="mainArea-title"><b>Seats: </b>{car.seats}</p>
                                        <p className="mainArea-title"><b>Price Per Day: </b>{car.price_per_day} AU</p>
                                        <p className="mainArea-title"><b>Availability: </b>{car.availability}</p>
                                        <p className="mainArea-description"><b>Description: </b>{car.description}</p>
                                        <br/>
                                        <div>
                                            <button className="addToCartBtn" onClick={() => addToCart(car)}>Add to Cart</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                )
            }
    }
}

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
        <nav className="navBar-container">
            <div className="navBar-container-brand">
                <div className="navBar-container-item">
                    <img className="navBar-container-logo" src={logo} alt="Logo"/>
                </div>
                <div className="navBar-container-item">
                    <CategoryBar categoryList={categoryList} />
                </div>
                <div></div>
                <div></div>
                <div className="navBar-container-item">
                    <div className="navBar-container-reservationBtn" onClick={toggleCartPopup}>Car Reservation ({cartItems.length})</div>
                </div>
            </div>
        </nav>
        <div className="container">
                {/* main-area */}
                <CarBrowsing/>
                
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

                {/* orderForm-popup */}
                {showForm && (
                    <div className="pop-form">
                        <div className="overlay"></div>
                            <div className="form-container">
                                <div className="form-content">
                                    <div className="cart-header">
                                        <h2 className="form-header-title">Check Out</h2>
                                        <button className="close-popup" onClick={checkout}>Close</button>
                                    </div>
                                    <form className="order-form" onSubmit={bookingCar}>
                                    <div className="form-table-container">
                                        <div className="order-form-item">
                                            <label htmlFor="firstName">First Name: </label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    id="firstName"
                                                    value={firstName}
                                                    onChange={(event) => setFirstName(event.target.value)}
                                                />
                                        </div>

                                        <div className="order-form-item">
                                            <label htmlFor="name">Last Name: </label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    id="lastName"
                                                    value={lastName}
                                                    onChange={(event) => setLastName(event.target.value)}
                                                />
                                        </div>

                                        <div className="order-form-item">
                                            <label>Email: </label>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    id="email"
                                                    value={email}
                                                    onChange={(event) => setEmail(event.target.value)}          
                                                />
                                            <button type="button" onClick={validateEmail}>Validate Email</button>
                                        </div>

                                        <div className="order-form-item">
                                            <label>Address Line: </label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    id="address"
                                                    value={address}
                                                    onChange={(event) => setAddress(event.target.value)}
                                                />
                                        </div>

                                        <div className="order-form-item">
                                            <label>City: </label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    id="city"
                                                    value={city}
                                                    onChange={(event) => setCity(event.target.value)}
                                                />
                                        </div>

                                        <div className="order-form-item">
                                            <label>State: </label>
                                            <select name="state" id="state" onChange={(event) => setState(event.target.value)}>
                                                <option value="">-- Please select --</option>
                                                <option value="ACT">Australian Capital Territory</option>
                                                <option value="NSW">New South Wales</option>
                                                <option value="NT">Northern Territory</option>
                                                <option value="QLD">Queensland</option>
                                                <option value="SA">South Australia</option>
                                                <option value="TAS">Tasmania</option>
                                                <option value="VIC">Victoria</option>
                                                <option value="WA">Western Australia</option>
                                            </select>
                                        </div>

                                        <div className="order-form-item">
                                            <label>Post Code: </label>
                                                <input
                                                    type="text"
                                                    name="postCode"
                                                    id="postCode"
                                                    value={postCode}
                                                    onChange={(event) => setPostCode(event.target.value)}
                                                />
                                        </div>

                                        <div className="order-form-item">
                                            <label>Payment Type: </label>
                                            <select name="paymentType" id="paymentType" onChange={(event) => setPaymentType(event.target.value)}>
                                                <optgroup label="paymentType">
                                                    <option value="master">Master</option>
                                                    <option value="visa">Visa</option>
                                                </optgroup>
                                            </select>   
                                        </div>
                                    </div>
                                    </form>
                                <div className="order-form-footer">
                                    <div className="order-form-price"><h3>Total Price: ${totalPrice.toFixed(2)}</h3></div>
                                    <div className="order-form-price"><h3>Bond: ${bondValue}</h3></div>                        
                                    <button type="button" onClick={checkout}>Continue Selection</button>
                                    <button type="submit" onClick={bookingCar}>Booking</button>     
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
    </body>
</>
)
}

export default App;