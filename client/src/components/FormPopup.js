import axios from "axios";
import React, { useState } from "react";


function FormPopup({
    checkout,
    cartItems,
    setCartItems,
    setIsCartEmpty,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    address,
    setAddress,
    city,
    setCity,
    state,
    setState,
    postCode,
    setPostCode,
    paymentType,
    setPaymentType,
    bondValue,
    setBondValue,
    totalPrice,
    showForm,
    setShowForm,
    toggleFormPopup,
}) {

    const [isEmailValidated, setIsEmailValidated] = useState(false);
    const [hasRentingHistory, setHasRentingHistory] = useState(false);

    const validateEmail = () => {
        axios.post("http://localhost:3001/validateEmail", { email })
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
                    axios.post("http://localhost:3001/create", {
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

return (
<>
    {showForm && (
    <div className="popup-form">
        <div className="overlay"></div>
        <div className="form-container">
        <div className="form-header">
            <h2 className="form-header-title">ORDER FORM</h2>
            <div className="form-header-close-popup" onClick={toggleFormPopup}>
            Close
            </div>
        </div>

        <div className="form-table-container">
            <form onSubmit={bookingCar}>
            <div className="form-table-container-item">
                <label htmlFor="firstName">First Name: </label>
                <input
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                />
            </div>
            <div className="form-table-container-item">
                <label htmlFor="name">Last Name: </label>
                <input
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                />
            </div>
            <div className="form-table-container-item">
                <label>Email: </label>
                <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                />
                <button type="button" onClick={validateEmail}>
                Validate Email
                </button>
            </div>
            <div className="form-table-container-item">
                <label>Address Line: </label>
                <input
                type="text"
                name="address"
                id="address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                />
            </div>
            <div className="form-table-container-item">
                <label>City: </label>
                <input
                type="text"
                name="city"
                id="city"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                />
            </div>
            <div className="form-table-container-item">
                <label>State: </label>
                <select
                name="state"
                id="state"
                onChange={(event) => setState(event.target.value)}
                >
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
            <div className="form-table-container-item">
                <label>Post Code: </label>
                <input
                type="text"
                name="postCode"
                id="postCode"
                value={postCode}
                onChange={(event) => setPostCode(event.target.value)}
                />
            </div>
            <div className="form-table-container-item">
                <label>Payment Type: </label>
                <select
                name="paymentType"
                id="paymentType"
                onChange={(event) => setPaymentType(event.target.value)}
                >
                <optgroup label="paymentType">
                    <option value="master">Master</option>
                    <option value="visa">Visa</option>
                </optgroup>
                </select>
            </div>
            </form>
        </div>

        <div className="form-footer">
            <div className="form-footer-item">
            <div className="form-footer-price">
                <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            </div>
            </div>
            <div className="form-footer-item">
            <div className="form-footer-bond">
                <h3>Bond: ${bondValue}</h3>
            </div>
            </div>
            <div className="form-footer-item">
            <div></div>
            </div>
            <div className="form-footer-item">
                <div className="form-footer-btn-continue" onClick={toggleFormPopup}>
                    Continue Selection
                </div>
            </div>
            <div className="form-footer-item">
                <div className="form-footer-btn" onClick={bookingCar}>
                    Booking
                </div>
            </div>
        </div>
        </div>
    </div>
    )}
</>
);
}

export default FormPopup;