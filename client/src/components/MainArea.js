import React, { useState } from "react";
import CarBrowsing from "./CarBrowsing";
import CartPopup from "./CartPopup";
import FormPopup from "./FormPopup";
import NavBar from './NavBar';

function MainArea({ checkout, removeItem }) {
    const [cartItems, setCartItems] = useState([]);
    const [isCartEmpty, setIsCartEmpty] = useState(true);
    const [reservationDays, setReservationDays] = useState(1);
    const [lastId, setLastId] = useState(0);
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [cartPopup, setCartPopup] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0); 
    const [bondValue, setBondValue] = useState("?");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postCode, setPostCode] = useState("");
    const [paymentType, setPaymentType] = useState("");    


    const toggleCartPopup = ({
    }) => {
        if (isCartEmpty === false){
            setCartPopup(!cartPopup);
        }else{
            alert("No car has been reserved!")
        }
    }

    const toggleFormPopup = () => {
        setShowForm(!showForm);
    }
    

    return (
        <>
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
                    isCartEmpty={isCartEmpty}
                    setIsCartEmpty={setIsCartEmpty}
                    removeItem={removeItem} 
                    setTotalPrice={setTotalPrice}
                    setShowForm={setShowForm} 
                    setCartPopup={setCartPopup}
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
                    totalPrice={totalPrice}
                    bondValue={bondValue}
                    setBondValue={setBondValue}
                    setShowForm={setShowForm}
                    toggleFormPopup={toggleFormPopup}
                    setCartItems={setCartItems}
                    setIsCartEmpty={setIsCartEmpty}
                />
            </div>
        </>
    )
}

export default MainArea;
