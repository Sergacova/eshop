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


const App = () => {
  return (

    <BrowserRouter>

      <Provider store={store}>
        <Routes>
          <Route path="products" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="login" element={<Login />} />

        </Routes>
        <Header />
        <Footer />

      </Provider>
    </BrowserRouter>

  );
};

export default App;
