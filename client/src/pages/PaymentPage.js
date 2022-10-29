import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { savePayment } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";

function PaymentPage(props) {
  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    navigate("/placeorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>

      <Container maxW="550px">
        <form onSubmit={submitHandler}>
          <Text fontSize="4xl" textAlign={"center"}>
            Payment
          </Text>

          <FormControl>
            <FormLabel>Stripe</FormLabel>
            <input
              type="radio"
              name="paymentMethod"
              id="paymentMethodStripe"
              value="stripe"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="paymentMethodStripe">Stripe</label>
          </FormControl>

          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Button type="submit" colorScheme="blue" mt="4">
              Continue
            </Button>
          </Flex>
        </form>
      </Container>
    </div>
  );
}
export default PaymentPage;
