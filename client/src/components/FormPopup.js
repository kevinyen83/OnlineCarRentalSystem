import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    postCode: Yup.string().required("Post Code is required"),
    paymentType: Yup.string().required("Payment Type is required"),
});

function FormPopup({
  cartItems,
  setCartItems,
  setIsCartEmpty,
  bondValue,
  setBondValue,
  totalPrice,
  showForm,
  setShowForm,
  toggleFormPopup,
}) {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      postCode: "",
      paymentType: "",
    },
    validationSchema,
    onSubmit: (values) => {
      validateEmail(values);
    },
  });

  const [isEmailValidated, setIsEmailValidated] = useState(false);
  const [hasRentingHistory, setHasRentingHistory] = useState(false);

  const validateEmail = ({ email }) => {
    Axios
      .post("http://localhost:3001/validateEmail", { email })
      .then((response) => {
        const { hasRentingHistory } = response.data;
        setHasRentingHistory(hasRentingHistory);
        console.log("A" + hasRentingHistory);
        setIsEmailValidated(true);
        if (email !== " " && email.includes("@")) {
          alert("Validation successful!");
          if (hasRentingHistory === true) {
            setBondValue(0);
          } else if (hasRentingHistory === false) {
            setBondValue(200);
          }
        } else {
          alert("Please fill in the email field with a valid email address");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

    const updateCarAvailability = () => {
        Axios.get("http://localhost:3001/cars.json")
        .then((response) => {
            const updatedCars = response.data.cars.map((car) => {
            const foundCartItem = cartItems.find((item) => item.name === car.name);
            if (foundCartItem) {
                return {
                ...car,
                availability: "No",
                };
            }
            return car;
            });

            Axios.put("http://localhost:3001/cars.json", { cars: updatedCars })
            .then((res) => {
                if (!res.data) {
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

  const onSubmit = () => {
    if (
      formik.errors.firstName ||
      formik.errors.lastName ||
      formik.errors.email ||
      formik.errors.address ||
      formik.errors.city ||
      formik.errors.state ||
      formik.errors.postCode ||
      formik.errors.paymentType ||
      !isEmailValidated
    ) {
      alert("Please fill in all required fields and validate your Email.");
    } else {
        Axios
        .post("http://localhost:3001/create", {
          email: formik.values.email,
          totalPrice: totalPrice,
        })
        .then(() => {
          console.log("success");
  
          setShowForm(false);
          setCartItems([]);
          setIsCartEmpty(true);
  
          formik.resetForm();
  
          updateCarAvailability(cartItems);
  
          alert("Order placed successfully!");
          console.log("Form submitted", formik.values.email, totalPrice);
        })
        .catch((error) => {
          console.error(error);
        });
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
              <form onSubmit={formik.handleSubmit}>
              <div className="form-table-container-item">
                <label htmlFor="firstName">First Name: </label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                    <div className="error-message">{formik.errors.firstName}</div>
                )}
                </div>

                <div className="form-table-container-item">
                  <label htmlFor="lastName">Last Name: </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.lastName && formik.touched.lastName && (
                    <div className="error-message">{formik.errors.lastName}</div>
                  )}
                </div>

                <div className="form-table-container-item">
                  <label htmlFor="email">Email: </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <button type="button" onClick={() => validateEmail(formik.values)}>
                    Validate Email
                  </button>
                  {formik.errors.email && formik.touched.email && (
                    <div className="error-message">{formik.errors.email}</div>
                  )}
                </div>

                <div className="form-table-container-item">
                  <label htmlFor="address">Address Line: </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.address && formik.touched.address && (
                    <div className="error-message">{formik.errors.address}</div>
                  )}
                </div>

                <div className="form-table-container-item">
                  <label htmlFor="city">City: </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.city && formik.touched.city && (
                    <div className="error-message">{formik.errors.city}</div>
                  )}
                </div>

                <div className="form-table-container-item">
                  <label htmlFor="state">State: </label>
                  <select
                    name="state"
                    id="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                  {formik.errors.state && formik.touched.state && (
                    <div className="error-message">{formik.errors.state}</div>
                  )}
                </div>

                <div className="form-table-container-item">
                  <label htmlFor="postCode">Post Code: </label>
                  <input
                    type="text"
                    name="postCode"
                    id="postCode"
                    value={formik.values.postCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.postCode && formik.touched.postCode && (
                    <div className="error-message">{formik.errors.postCode}</div>
                  )}
                </div>

                <div className="form-table-container-item">
                  <label htmlFor="paymentType">Payment Type: </label>
                  <select
                    name="paymentType"
                    id="paymentType"
                    value={formik.values.paymentType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <optgroup label="paymentType">
                      <option value="">-- Please select --</option>
                      <option value="master">Master</option>
                      <option value="visa">Visa</option>
                    </optgroup>
                  </select>
                  {formik.errors.paymentType && formik.touched.paymentType && (
                    <div className="error-message">{formik.errors.paymentType}</div>
                  )}
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
                <div
                  className="form-footer-btn"
                  type="submit"
                  onClick={onSubmit}
                  disabled={!isEmailValidated}
                >
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
