import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import {
  Button,
  Container,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
function PlaceOrderPage(props) {
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const navigate = useNavigate();

  const { cartItems, shipping, payment } = cart;
  if (!shipping.address) {
    navigate("/shipping");
  } else if (!payment.paymentMethod) {
    navigate("/payment");
  }
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };
  useEffect(() => {
    if (success) {
      props.history.push("/order/" + order._id);
    }
  }, [success]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <Container maxW="550px">
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Shopping Cart</TableCaption>
            <Tbody>
              <Tr>
                <Td>Shipping</Td>
                <Td colSpan={"2"}>
                  {cart.shipping.address}, {cart.shipping.city},
                  {cart.shipping.postalCode}, {cart.shipping.country},
                </Td>
              </Tr>
              <Tr>
                <Td>Payment</Td>
                <Td colSpan={"2"}>
                  Payment Method: {cart.payment.paymentMethod}
                </Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>
              <Button
                type="submit"
                colorScheme="blue"
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </TableCaption>
            <Tbody>
              <Tr>
                <Td>Price</Td>
                <Td colSpan={"2"}>
                  {" "}
                  {cartItems.length === 0 ? (
                    <div>Cart is empty</div>
                  ) : (
                    cartItems.map((item) => (
                      <li>
                        <div className="cart-image">
                          <img src={item.image} alt="product" />
                        </div>
                        <div className="cart-name">
                          <div>
                            <Link to={"/product/" + item.product}>
                              {item.name}
                            </Link>
                          </div>
                          <div>Qty: {item.qty}</div>
                        </div>
                        <div className="cart-price">${item.price}</div>
                      </li>
                    ))
                  )}
                </Td>
              </Tr>
              <Tr>
                <Td>Payment</Td>
                <Td colSpan={"2"}>
                  Payment Method: {cart.payment.paymentMethod}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <TableContainer>
          <Table variant="simple">
            <h3>Order Summary</h3>
            <Tbody>
              <Tr>
                <Td>Items</Td>
                <Td colSpan={"2"}>${itemsPrice}</Td>
              </Tr>
              <Tr>
                <Td>Shipping</Td>
                <Td colSpan={"2"}>${shippingPrice}</Td>
              </Tr>
              <Tr>
                <Td>Tax</Td>
                <Td colSpan={"2"}>${taxPrice}</Td>
              </Tr>
              <Tr>
                <Td>Total</Td>
                <Td colSpan={"2"}>${totalPrice}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default PlaceOrderPage;
