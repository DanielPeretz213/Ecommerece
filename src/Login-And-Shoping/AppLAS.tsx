import React from "react";
import LoginPage from "./componnents/LoginPage";
import { Context, useContextInformation } from "./hooks/Context";
import Header from "./componnents/Header";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import SignUpPage from "./componnents/SignUpPage";
import ProductList from "./componnents/ProductList";
  import ShoppingCart from "./componnents/ShoppingCart";
import Payment from "./componnents/payment";

const AppLAS: React.FC = () => {
  return (
    <BrowserRouter>
      <Context>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/payment" element={<Payment/>} />
        </Routes>
      </Context>
    </BrowserRouter>
  );
};
export default AppLAS;
