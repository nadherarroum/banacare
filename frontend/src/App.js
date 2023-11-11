import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// REDUX TOOLKIT ----
import { fetchAsyncProducts } from './features/productSlice';
import { fetchAsyncCategories } from './features/categorySlice';
import { useDispatch } from 'react-redux';
// SCREENS ----
import Services from './screens/Services';
import About from './screens/About';
import Cart from './screens/Cart';
import Checkout from './screens/Checkout';
import Contact from './screens/Contact';
import Home from './screens/Home';
import ProductDetails from './screens/ProductDetails';
// import Shop from './screens/Shop';
import Error from './screens/Error';
// COMPONENTS ----
import Layout from './components/Layout';
import Loader from './components/Loader';

const LazyShop = React.lazy(() => import('./screens/Shop'));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAsyncCategories());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route
          path="shop"
          element={
            <React.Suspense fallback={<Loader />}>
              <LazyShop />
            </React.Suspense>
          }
        />
        <Route
          path="products"
          element={
            <React.Suspense fallback={<Loader />}>
              <LazyShop />
            </React.Suspense>
          }
        />
        <Route
          path="shop/:urlSearchKey"
          element={
            <React.Suspense fallback={<Loader />}>
              <LazyShop />
            </React.Suspense>
          }
        />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="services" element={<Services />} />
        <Route path="products/:productId" element={<ProductDetails />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
