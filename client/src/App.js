import React, { useRef } from "react";

import Hero from "./components/Hero";
import Nav from "./components/Nav";
import { useSelector } from "react-redux";

import { Box, Flex, useDisclosure } from "@chakra-ui/react";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const { onOpen } = useDisclosure();
  const btnRef = useRef();

  return (
    <Box>
      <Nav ref={btnRef} onOpen={onOpen} userInfo={userInfo} />
      <Flex>
        <Hero />
        <Hero />
        <Hero />
      </Flex>
    </Box>
  );
}

export default App;
