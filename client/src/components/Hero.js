import {
  Box,
  Flex,
  Img,
  Link,
  Spacer,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";

const Hero = ({ data }) => {
  const [isLargerThanLG] = useMediaQuery("(min-width: 62em)");
  return (
    <Flex
      alignItems="center"
      w="full"
      py="16"
      h="600px"
      flexDirection={"column"}
    >
      <Flex w="full" px="16px" alignItems="center" justifyContent="center">
        <Img src={data.image} alt={data.image} />
      </Flex>
      <Box w="full" px="16px" alignItems="center" justifyContent="center">
        <Text
          fontSize={isLargerThanLG ? "5xl" : "4xl"}
          fontWeight="bold"
          mb="4"
        >
          {" "}
          <Link href={"/product/" + data._id} fontSize="md" mr="10">
            {data.name}
          </Link>
        </Text>

        <Text mb="6" fontSize={isLargerThanLG ? "lg" : "base"} opacity={0.7}>
          {data.description}
        </Text>

        <Text mb="6" fontSize={isLargerThanLG ? "lg" : "base"} opacity={0.7}>
          {data.brand}
        </Text>

        <Text mb="6" fontSize={isLargerThanLG ? "lg" : "base"} opacity={0.7}>
          {data.price}$
        </Text>
      </Box>
      <Spacer />
    </Flex>
  );
};

export default Hero;
