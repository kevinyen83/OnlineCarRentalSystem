

function CartPopup (props) {
    const { cartPopup, toggleCartPopup, cartItems, tableRows, checkout, isCartEmpty } = props;

return (
    <>
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
                                {!cartItems || cartItems.length === 0 ? (
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
        </>
    )
}

export default CartPopup;
