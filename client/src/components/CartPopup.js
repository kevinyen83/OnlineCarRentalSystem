import React, { useState } from "react";

function CartPopup ({
    setTotalPrice, 
    totalPrice, 
    setShowForm, 
    showForm, 
    isCartEmpty, 
    cartItems, 
    setCartItems, 
    setIsCartEmpty,
    cartPopup,
    setCartPopup,
    }) {

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

    const closeCart = () => {
        setCartPopup(false);
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
            <td className="cart-table-container-item">
                <img src={item.image} alt={item.name} height="50" width="80" />
            </td>
            <td className="cart-table-container-item">{item.name}</td>
            <td className="cart-table-container-item">$ {item.price_per_day}</td>
            <td className="cart-table-container-item">
                <input type="number" min="1" value={item.reservationDays || 1} onChange={handleChange} />
            </td>
            <td className="cart-table-container-item">
                <button onClick={() => removeItem(item)}>Remove</button>
            </td>
            </tr>
        );
    });
    

return (
    <>
    {cartPopup &&(
        <div className="popup-cart">
            <div className="overlay"></div>
            <div className="cart-container">
                        <div className="cart-header">
                            <h2 className="cart-header-title">CAR RENTAL CENTER</h2>
                            <div className="cart-header-close-popup" onClick={closeCart}>Close</div>
                        </div>
                        <div className="cart-table-container">
                                {!cartItems || cartItems.length === 0 ? (
                                    <p>Your cart is empty</p>
                                ) : (
                                    <div>
                                        <table>
                                            <thead>
                                            <tr>
                                                <th className="cart-table-container-item">Image</th>
                                                <th className="cart-table-container-item">Name</th>
                                                <th className="cart-table-container-item">Price Per Day</th>
                                                <th className="cart-table-container-item">Reservation Days</th>
                                                <th className="cart-table-container-item">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>{tableRows}</tbody>
                                        </table>
                                    </div>
                                )}
                        </div>
                        <div className="cart-footer">
                            <div></div>
                            <div className="cart-footer-item">
                                <div className="cart-footer-checkoutBtn" onClick={checkout}  disabled={isCartEmpty} style={{ backgroundColor: isCartEmpty ? "grey" : "rgb(219, 188, 76)" }}>Check out</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CartPopup;
