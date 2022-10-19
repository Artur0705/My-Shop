import React, { useRef } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";

import Hero from "./components/Hero";
import Nav from "./components/Nav";
import ContactUs from "./components/ContactUs";
import Services from "./components/Services";
import AboutUs from "./components/AboutUs";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const { onOpen } = useDisclosure();
  const btnRef = useRef();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="/" element={<HomePage />}></Route>,
        <Route path="login" element={<SigninPage />}></Route>,
        <Route path="register" element={<RegisterPage />}></Route>,
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );

  return (
    <Box>
      <Nav ref={btnRef} onOpen={onOpen} userInfo={userInfo} />
      <RouterProvider router={router} />

      <Flex>
        <Hero />
        <Hero />
        <Hero />
      </Flex>
      <AboutUs />
      <Services />
      <Testimonials />
      <ContactUs />
      <Footer />
    </Box>
  );
}

export default App;
