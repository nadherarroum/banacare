import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { baseAPI, imageUrl } from '../baseAPI';
import axios from 'axios';
import { removeAllCartItems } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showHideNotification } from '../features/notificationSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.value);
  const [city, setCity] = useState(''); // current chosen city
  const [cities, setCities] = useState([]); // all cities fetched from the backend
  const [placeOrderError, setPlaceOrderError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      const response = await axios.get(`${baseAPI}cities/`);
      setCities(response.data);
    };
    fetchCities();
  }, []);

  // Count Total Cost of the items including shipping -----------------------------
  const totalCost =
    cartItems
      .map((item) => item)
      .reduce((prev, curr) => prev + curr.quantity * curr.price, 0) +
    (city.shipping_cost ? city.shipping_cost : 0);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumberOne: '',
      phoneNumberTwo: '',
      email: '',
      city: '',
      street: '',
      detailedAddress: '',
      additionalInformation: '',
    },

    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(30, 'Must be 30 characters or less.')
        .required('Required'),

      lastName: Yup.string()
        .max(40, 'Must be 40 characters or less.')
        .required('Required'),

      phoneNumberOne: Yup.string()
        .min(11, 'This phone number is too short.')
        .max(11, 'This phone number is too long.')
        .required('Required'),

      phoneNumberTwo: Yup.string()
        .min(11, 'This phone number is too short.')
        .max(11, 'This phone number is too long.'),

      email: Yup.string().email('Invalid Email'),

      city: Yup.string().required('Required'),

      street: Yup.string()
        .max(50, 'Must be 50 characters or less.')
        .required('Required'),

      detailedAddress: Yup.string().max(400, 'Must be 400 characters or less.'),

      additionalInformation: Yup.string().max(
        400,
        'Must be 400 characters or less.'
      ),
    }),
    onSubmit: (values) => {
      var url = `${baseAPI}create-order/`;

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          shipping_cost: city.shipping_cost,
          totalCost: totalCost,
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumberOne: values.phoneNumberOne,
          phoneNumberTwo: values.phoneNumberTwo,
          email: values.email,
          city: values.city,
          street: values.street,
          detailedAddress: values.detailedAddress,
          additionalInformation: values.additionalInformation,
          items: cartItems,
        }),
      })
        .then(() => {
          dispatch(showHideNotification(true));
          localStorage.removeItem('cartItems');
          dispatch(removeAllCartItems());
          navigate({
            pathname: '/',
          });
        })
        .catch((error) => {
          setPlaceOrderError(true);
        });
    },
  });

  // when a city is chosen, it's shipping cost will be displayed and update the order data -----
  useEffect(() => {
    if (formik.values.city.length < 1) {
      setCity({ name: '', shipping_cost: 0 });
    } else {
      setCity(cities.filter((city) => city.name === formik.values.city)[0]);
    }
  }, [formik.values.city, cities]);

  return (
    <div className="checkout container">
      <h1 className="mt-5 mb-2 text-center">Checkout</h1>
      <form onSubmit={formik.handleSubmit}>
        <main className="row g-5">
          {/* Cart Items ---------------------------------------------- */}
          <div className="col-md-5 col-lg-6 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="">Your cart</span>
              <span className="badge checkout-count rounded">
                <span>
                  {cartItems
                    .map((item) => item.quantity)
                    .reduce((prev, curr) => prev + curr, 0)}
                </span>
              </span>
            </h4>
            <ul className="list-group mb-3">
              {cartItems.map((cartItem) => (
                <li
                  key={cartItem.name}
                  className="list-group-item d-flex justify-content-between lh-sm"
                >
                  <div className="row">
                    <div className="col-lg-3">
                      <div className="badge-container">
                        <img
                          src={`${imageUrl}${cartItem.imageOne}`}
                          alt={cartItem.name}
                          style={{
                            width: '120px',
                            height: '60px',
                            objectFit: 'cover',
                          }}
                        />
                        <span className="badge-count badge">
                          {cartItem.quantity}
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-9 d-flex flex-column justify-content-center">
                      <span>{cartItem.name}</span>
                      <span className="text-muted">{cartItem.price}TND</span>
                    </div>
                  </div>
                  <span className="text-muted">TND{cartItem.price}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between align-items-center bg-light">
                <div className="text-success">
                  <h6 className="my-0">Shipping</h6>
                  <p className="mb-0">
                    <small>{city.name}</small>
                  </p>
                </div>
                <span className="text-success">TND{city.shipping_cost}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total</span>
                <strong>{totalCost}TND</strong>
              </li>
            </ul>
          </div>

          {/* Contact Information ------------------------------------- */}

          <div className="col-md-7 col-lg-6">
            {/* <h2 className="">BANA CARE</h2> */}
            <h4 className="mb-3">Contact Information</h4>
            <div className="row g-3">
              {/* First and Last Name ---- */}
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label required">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control required"
                  id="firstName"
                  value={formik.values.firstName}
                  //onBlur will know if the input is touched or not, so that we check the error of a specific element only after it is touched
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />

                {formik.touched.firstName && formik.errors.firstName ? (
                  <p className="checkout-error-message">
                    {formik.errors.firstName}
                  </p>
                ) : null}
              </div>

              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label required">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={formik.values.lastName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <p className="checkout-error-message">
                    {formik.errors.lastName}
                  </p>
                ) : null}
              </div>

              {/* Phone Number ---- */}
              <div className="col-md-6">
                <label htmlFor="phoneNumberOne" className="form-label required">
                  Phone Number 1
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phoneNumberOne"
                  value={formik.values.phoneNumberOne}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.phoneNumberOne &&
                formik.errors.phoneNumberOne ? (
                  <p className="checkout-error-message">
                    {formik.errors.phoneNumberOne}
                  </p>
                ) : null}
              </div>

              <div className="col-md-6">
                <label htmlFor="phoneNumberTwo" className="form-label">
                  Phone Number 2
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phoneNumberTwo"
                  value={formik.values.phoneNumberTwo}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.phoneNumberTwo &&
                formik.errors.phoneNumberTwo ? (
                  <p className="checkout-error-message">
                    {formik.errors.phoneNumberTwo}
                  </p>
                ) : null}
              </div>

              {/* Email ---- */}
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="checkout-error-message">
                    {formik.errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            {/* row */}
            <h4 className="mb-3 mt-5">Shipping Address</h4>

            <div className="row g-3">
              {/* City ---- */}
              <div className="col-md-6">
                <label htmlFor="city" className="form-label required">
                  City
                </label>
                <select
                  className="form-select"
                  id="city"
                  value={formik.values.city}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                >
                  <option value="">Choose...</option>
                  {cities.length > 0 &&
                    cities.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                </select>
                {formik.touched.city && formik.errors.city ? (
                  <p className="checkout-error-message">{formik.errors.city}</p>
                ) : null}
              </div>

              {/* Street ---- */}
              <div className="col-md-6">
                <label htmlFor="street" className="form-label required">
                  Street
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  value={formik.values.street}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.street && formik.errors.street ? (
                  <p className="checkout-error-message">
                    {formik.errors.street}
                  </p>
                ) : null}
              </div>

              {/* Detailed Address ---- */}
              <div className="col-md-12">
                <label htmlFor="detailedAddress" className="form-label">
                  Detailed Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="detailedAddress"
                  value={formik.values.detailedAddress}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.detailedAddress &&
                formik.errors.detailedAddress ? (
                  <p className="checkout-error-message">
                    {formik.errors.detailedAddress}
                  </p>
                ) : null}
              </div>
            </div>

            {/* Additional Information ---- */}
            <h4 className="mb-3 mt-5">Additional Information</h4>
            <div className="row g-3">
              <div className="col">
                <label htmlFor="additional" className="form-label">
                  Additional Information
                </label>
                <textarea
                  className="form-control"
                  id="additionalInformation"
                  rows="3"
                  value={formik.values.additionalInformation}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                ></textarea>
                {formik.touched.additionalInformation &&
                formik.errors.additionalInformation ? (
                  <p className="checkout-error-message">
                    {formik.errors.additionalInformation}
                  </p>
                ) : null}
              </div>
            </div>

            {/* Button */}
            <div className="row">
              <div className="col">
                <div className="d-grid gap-2">
                  <button
                    className="btn-blue-dark btn-block btn mb-5 mt-4"
                    type="submit"
                    disabled={cartItems.length < 1}
                  >
                    Place Order
                  </button>
                  {placeOrderError ? (
                    <p className="checkout-error-message fs-5">
                      Order could not be added. Please try again later
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </main>
      </form>
    </div>
  );
};

export default Checkout;