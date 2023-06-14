function FormPopup({
    showForm,
    checkout,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    validateEmail,
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
    bookingCar,
    totalPrice,
    bondValue,
}) 

{
return (
<>
    {showForm && (
    <div className="popup-form">
        <div className="overlay"></div>
        <div className="form-container">
        <div className="form-header">
            <h2 className="form-header-title">ORDER FORM</h2>
            <div className="form-header-close-popup" onClick={checkout}>
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
            <div className="form-footer-btn" onClick={checkout}>
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