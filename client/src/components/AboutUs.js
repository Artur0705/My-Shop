import React from "react";
import { Flex, Spacer, Text, useMediaQuery } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { FaHandshake, FaStar } from "react-icons/fa";
import { GiConverseShoe } from "react-icons/gi";

const AboutUs = () => {
  const [isLargerThanMD] = useMediaQuery("(min-width: 48em)");
  const array = [
    {
      id: 1,
      text: " We are a shoe company that provides high-quality, stylish shoes for both men and women.",
      icon: GiConverseShoe,
    },
    {
      id: 2,
      text: "We have a wide selection of shoes to choose from, so you can find the perfect pair for any occasion.      ",
      icon: FaStar,
    },
    {
      id: 3,
      text: "We pride ourselves on our excellent customer service and fast shipping.",
      icon: FaHandshake,
    },
  ];
  return (
    <Flex
      minH="70vh"
      alignItems="center"
      justifyContent="space-between"
      w="full"
      py="16"
      px={isLargerThanMD ? "16" : "6"}
      flexWrap="wrap"
      flexDirection={isLargerThanMD ? "row" : "column"}
    >
      {array.map((arr, index) => (
        <>
          <Flex
            key={arr.id}
            height="300px"
            bg="blackAlpha.200"
            width={isLargerThanMD ? "32%" : "full"}
            shadow="md"
            p="6"
            alignItems="center"
            justifyContent="center"
            borderRadius="md"
            flexDirection="column"
            textAlign="center"
            mb={isLargerThanMD ? "0" : "4"}
            border="1px solid #C4DDFF"
          >
            <Icon as={arr.icon} boxSize={14} color="blue.600" mb="5" />
            <Text>{arr.text}</Text>
          </Flex>

          <Spacer />
        </>
      ))}
    </Flex>
  );
};

export default AboutUs;
