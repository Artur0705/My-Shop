import {
  Box,
  Button,
  Flex,
  Img,
  Spacer,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";

const Hero = () => {
  const [isLargerThanLG] = useMediaQuery("(min-width: 62em)");
  return (
    <Flex
      alignItems="center"
      w="full"
      py="16"
      minHeight="90vh"
      flexDirection={"column"}
    >
      <Flex w="full" px="16px" alignItems="center" justifyContent="center">
        <Img
          src="https://theshoesnobblog.com/wp-content/uploads/2021/01/Untitled-1-800x518.jpg.webp"
          alt="Chakra UI"
        />
      </Flex>
      <Box w="full" px="16px" alignItems="center" justifyContent="center">
        <Text
          fontSize={isLargerThanLG ? "5xl" : "4xl"}
          fontWeight="bold"
          mb="4"
        >
          {" "}
          Shoe Title
        </Text>

        <Text mb="6" fontSize={isLargerThanLG ? "lg" : "base"} opacity={0.7}>
          Description text
        </Text>

        <Button
          w="200px"
          colorScheme="blue"
          variant="solid"
          h="50px"
          size={isLargerThanLG ? "lg" : "md"}
          mb={isLargerThanLG ? "0" : "10"}
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/";
          }}
        >
          Add cart
        </Button>
      </Box>
      <Spacer />
    </Flex>
  );
};

export default Hero;
