import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { logout, update } from "../actions/userActions";
import { listMyOrders, payOrder } from "../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

function ProfilePage(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [search] = useSearchParams();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, email, name, password }));
  };
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, success, error } = userUpdate;

  const myOrderList = useSelector((state) => state.myOrderList);
  const { orders } = myOrderList;
  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword(userInfo.password);
    }
    if (search.get("received")) {
      dispatch(payOrder(search.get("received")));
    }
    dispatch(listMyOrders());
    return () => {};
  }, [userInfo]);

  return (
    <>
      <>
        <Container maxW="550px">
          <form onSubmit={submitHandler}>
            <Text fontSize="4xl" textAlign={"center"}>
              User Profile
            </Text>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {success && <div>Profile Saved Successfully.</div>}
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={name}
              />
            </FormControl>

            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Button type={"submit"} colorScheme="blue" mt="4">
                Update
              </Button>
              <Button
                type="button"
                onClick={handleLogout}
                colorScheme="red"
                mt="4"
              >
                Logout
              </Button>
            </Flex>
          </form>
        </Container>
        <Container maxW="1120px">
          <Text fontSize="4xl" textAlign={"center"}>
            Orders
          </Text>

          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>DATE</Th>
                  <Th>TOTAL</Th>
                  <Th>PAID</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders?.map((order) => (
                  <Tr key={order._id}>
                    <Td>{order._id}</Td>
                    <Td>{order.createdAt}</Td>
                    <Td>{order.totalPrice}</Td>
                    <Td>{order.isPaid ? "Paid" : "Pending"}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Container>
      </>
    </>
  );
}

export default ProfilePage;
