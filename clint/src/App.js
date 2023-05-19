import logo from "/Users/net/car-rental-system/clint/src/components/assets/images/logo.png";
import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0); 
    const [isCartEmpty, setIsCartEmpty] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [cartPopup, setCartPopup] = useState(false);
    const [reservationDays, setReservationDays] = useState(1);
    const [lastId, setLastId] = useState(0);
    const [bookingStatus, setBookingStatus] = useState(false);

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
     fetch("/cars.json")
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
        fetch("/cars.json")
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
                    <div className="car-list">
                        <div className="main-area">
                            <div className="mainArea-card-container">
                                {cars.map(car => (
                                    <div className="mainArea-card" key={car.id}>
                                        <img className= "mainArea-img" src={car.image}></img>
                                        <h3 className="mainArea-name">{car.name}</h3>
                                        <p className="mainArea-title"><b>brand: </b>{car.brand}</p> 
                                        <p className="mainArea-title"><b>model: </b>{car.model}</p>
                                        <p className="mainArea-title"><b>mileage: </b>{car.mileage} kms</p>
                                        <p className="mainArea-title"><b>fuel_type: </b>{car.fuel_type}</p> 
                                        <p className="mainArea-title"><b>seats: </b>{car.seats}</p>
                                        <p className="mainArea-title"><b>price_per_day: </b>{car.price_per_day} AU</p>
                                        <p className="mainArea-title"><b>availability: </b>{car.availability}</p>
                                        <p className="mainArea-description"><b>description: </b>{car.description}</p>
                                        <br/>
                                        <div>
                                            <button className="addToCartBtn" onClick={() => addToCart(car)}>Add to Cart</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                </div>
                )
            }
    }
}


const tableRows = cartItems.map((item) => {
    const handleChange = (e) => {
        const updatedCart = cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
            return { ...cartItem, reservationDays: e.target.value };
        }
        return cartItem;
        });
        setCartItems(updatedCart);
    };
        
    return (
        <tr key={item.id}>
        <td className="cart_table_item">
            <img src={item.image} alt={item.name} height="50" width="80" />
        </td>
        <td className="cart_table_item">{item.name}</td>
        <td className="cart_table_item">$ {item.price_per_day}</td>
        <td className="cart_table_item">
            <input type="number" min="1" value={item.reservationDays || 1} onChange={handleChange} />
        </td>
        <td className="cart_table_item">
            <button onClick={() => removeItem(item)}>Remove</button>
        </td>
        </tr>
    );
    });

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
        setCartItems([]);
        setCartPopup(false);
        } else {
            alert("Invaild Input Value!")
        }
    };

    const bookingCar = (event) => {
        event.preventDefault();
        if (firstName && lastName && email && address && city && state && postCode && paymentType !== " ") {
          if (email.includes("@")) {
            Axios.post("http://localhost:3001/create", {
                email: email,
                totalPrice: totalPrice,
                    }).then(() => {
                    console.log("success");
                    });

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

          } else {
            alert("It's not a valid email address");
          }
        } else {
          alert("Please fill in all fields.");
        }
      };


      

    return (
    <>
    {/* NavBar */}
    <nav className='navBar-setting navBar-menu-text nav-container'>
        <div className="nav-container-item"><img className='logo' src={logo} alt='Logo'/></div>
        <div className="shoppingCart-item"><h1>Hertz-UTS</h1></div> 
        <botton className="reservation-btn" onClick={toggleCartPopup}>Car Reservation ({cartItems.length})</botton>
    </nav>
        
    <body>
     {/* main-area */}
      <CarBrowsing/>
        
    {/* cart-popup */}
    {cartPopup &&(
    <div className="popup-cart">
        <div className="overlay"></div>
        <div className="cart-container">
        <div className="cart-row">
            <div className="cart-content">
                <div className="cart-header">
                    <h2 className="cart-title">Car Rental Center</h2>
                    <button className="close-popup" onClick={toggleCartPopup}>Close</button>
                </div>
                <div className="cart-card-container">
                        {cartItems.length === 0 ? (
                            <p>Your cart is empty</p>
                        ) : (
                        <div className="cart-item-card-container">
                            <div>
                                <table>
                                    <thead>
                                    <tr>
                                        <th className="cart_table_item">Image</th>
                                        <th className="cart_table_item">Name</th>
                                        <th className="cart_table_item">Price Per Day</th>
                                        <th className="cart_table_item">Reservation Days</th>
                                        <th className="cart_table_item">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>{tableRows}</tbody>
                                </table>
                            </div>
                        </div>
                        )}
                    <div className="cart-footer">
                            <div></div>
                            <div></div>
                            <button onClick={checkout}  disabled={isCartEmpty} style={{ backgroundColor: isCartEmpty ? "grey" : "white" }}>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    )}

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
                            <button type="button" onClick={checkout}>Continue Selection</button>
                            <button type="submit" onClick={bookingCar}>Booking</button>     
                    </div>
                </div>
            </div>
        </div>
    )}
</body>
</>
)
}

export default App;