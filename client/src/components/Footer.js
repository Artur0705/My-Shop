import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Flex
      w="full"
      bg="blackAlpha.50"
      minHeight="20vh"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      justifyContent="center"
      mt="10"
    >
      <Text opacity="0.5">ShoesOn</Text>
    </Flex>
  );
};

export default Footer;
