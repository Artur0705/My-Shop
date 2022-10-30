import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../actions/userActions";
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  Link,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function SigninPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const redirect = "/";
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
    dispatch(signin(email, password));
  };
  return (
    <>
      <Container maxW="550px">
        <form onSubmit={submitHandler}>
          <Text fontSize="4xl" textAlign={"center"}>
            Sign-In
          </Text>
          {error}

          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormHelperText>We'll never share your password.</FormHelperText>
          </FormControl>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Button type={"submit"} colorScheme="blue" mt="4">
              Login
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

export default SigninPage;
