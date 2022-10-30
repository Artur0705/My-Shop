import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveShipping } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

function ShippingPage(props) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>

      <Container maxW="550px">
        <form onSubmit={submitHandler}>
          <Text fontSize="4xl" textAlign={"center"}>
            Shipping
          </Text>

          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
              type="text"
              name="address"
              id="address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>City</FormLabel>
            <Input
              type="text"
              name="city"
              id="city"
              onChange={(e) => setCity(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Postal Code</FormLabel>
            <Input
              type="text"
              name="postalCode"
              id="postalCode"
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Country</FormLabel>
            <Input
              type="text"
              name="country"
              id="country"
              onChange={(e) => setCountry(e.target.value)}
            />
          </FormControl>

          <Flex alignItems={"center"} justifyContent={"space-between"}>
            {userInfo ? (
              <Button type="submit" colorScheme="blue" mt="4">
                Continue
              </Button>
            ) : (
              <Button type={"submit"} colorScheme="blue" mt="4">
                <Link to="/login">Login</Link>
              </Button>
            )}
          </Flex>
        </form>
      </Container>
    </div>
  );
}
export default ShippingPage;
