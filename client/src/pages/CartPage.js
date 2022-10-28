import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Container,
  Button,
} from "@chakra-ui/react";

function CartScreen(props) {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const productId = params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <div className="cart">
      <Container maxW="1120px">
        <TableContainer>
          <Table variant="simple">
            <Text fontSize="4xl" textAlign={"center"}>
              Shopping Cart
            </Text>
            <Tbody>
              {cartItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                cartItems.map((item) => (
                  <Tr>
                    <Td>
                      <img src={item.image} width="100" alt="" />
                    </Td>
                    <Td>
                      {" "}
                      <Link to={"/product/" + item.product}>{item.name}</Link>
                    </Td>
                    <Td>
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(addToCart(item.product, e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </Td>
                    <Td>
                      <button
                        type="button"
                        className="button"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        Delete
                      </button>
                    </Td>
                    <Td>${item.price}</Td>
                  </Tr>
                ))
              )}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>
                  Subtotal ({" "}
                  {cartItems && cartItems.reduce((a, c) => a + c.qty, 0)} items)
                  : ${" "}
                  {cartItems &&
                    cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </Th>
                <Th isNumeric>
                  <Button
                    onClick={checkoutHandler}
                    className="button primary full-width"
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                </Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default CartScreen;
