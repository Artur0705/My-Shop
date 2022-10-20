import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/userActions";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

function RegisterPage(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const redirect = "/"; //props.location.search ? props.location.search.split("=")[1] : '/'
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };
  return (
    <>
      <Container maxW="550px">
        <form onSubmit={submitHandler}>
          <Text fontSize="4xl" textAlign={"center"}>
            Create Account
          </Text>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}

          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Re-Enter Password</FormLabel>
            <Input
              type="password"
              name="rePassword"
              id="rePassword"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Button type={"submit"} colorScheme="blue" mt="4">
              Register
            </Button>

            <Link
              mt="4"
              href={
                redirect === "/" ? "register" : "register?redirect=" + redirect
              }
              className="button secondary text-center"
            >
              Create account
            </Link>
          </Flex>
        </form>
      </Container>
    </>
  );
}
export default RegisterPage;
