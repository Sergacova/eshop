import React from 'react';
import Header from './pages/Header';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import ProductDetails from './components/products/ProductsDetails';
import Products from './components/products/Products';
import Login from "./pages/Login";
import Cart from './components/products/Cart';
import Footer from './pages/Footer';
import { Home } from './context/Home';
import { Suspense } from 'react';
import { Menu } from './context/Menu';

const App = () => {
  return (

    <BrowserRouter>
      <Suspense fallback='loading'></Suspense>
      <Provider store={store}>
        <Routes>
          <Route path="products" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="login" element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/menu' element={<Menu />} />
        </Routes>
        <Header />
        <Footer />

      </Provider>
    </BrowserRouter>

  );
};

export default App;
