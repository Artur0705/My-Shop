import React, { useRef } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { useDisclosure, Box } from "@chakra-ui/react";

import Nav from "./components/Nav";
import DrawerComponent from "./components/DrawerComponent";
import HomePage from "./pages/HomePage";
import ContactUs from "./components/ContactUs";
import SigninPage from "./pages/SigninPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ProductPage from "./pages/ProductPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import ShippingPage from "./pages/ShippingPage";
import Footer from "./components/Footer";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="/" element={<HomePage />}></Route>,
        <Route path="login" element={<SigninPage />}></Route>,
        <Route path="register" element={<RegisterPage />}></Route>,
        <Route path="profile" element={<ProfilePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="shipping" element={<ShippingPage />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="placeorder" element={<PlaceOrderPage />} />
        <Route path="category/:id" element={<HomePage />} />
        <Route path="cart/:id" element={<CartPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );
  return (
    <Box>
      <Nav ref={btnRef} onOpen={onOpen} userInfo={userInfo} />
      <RouterProvider router={router} />
      <ContactUs />
      <Footer />
      <DrawerComponent isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </Box>
  );
}

export default App;
