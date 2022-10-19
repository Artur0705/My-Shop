import React from "react";

import Hero from "./components/Hero";
import { Box, Flex } from "@chakra-ui/react";

function App() {
  return (
    <Box>
      <Flex>
        <Hero />
        <Hero />
        <Hero />
      </Flex>
    </Box>
  );
}

export default App;
