import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
// import Notification from '../components/Notification';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import ToastNotification from './ToastNotification';

const Layout = () => {
  const cartItems = useSelector((state) => state.cart.value);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="App">
      {/* <Notification /> */}
      <ToastNotification />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
