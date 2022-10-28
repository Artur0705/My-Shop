import React from "react";
import {
  Flex,
  Spacer,
  Text,
  Wrap,
  WrapItem,
  Avatar,
  Box,
  useMediaQuery,
} from "@chakra-ui/react";

const Testimonials = () => {
  const [isLargerThanLG] = useMediaQuery("(min-width: 62em)");

  return (
    <Flex
      maxWidth={isLargerThanLG ? "1400px" : "full"}
      minHeight="70vh"
      justifyContent="center"
      alignItems="center"
      py="16"
      px={isLargerThanLG ? "16" : "6"}
      mx="auto"
      flexDirection={isLargerThanLG ? "row" : "column"}
    >
      <Flex
        width={isLargerThanLG ? "380px" : "full"}
        shadow="md"
        minHeight="250px"
        flexDirection="column"
        p="8"
        m="4"
        border="1px solid #C4DDFF"
        borderRadius="md"
        justifyContent="center"
      >
        <Text mb="5">
          "I had a great experience shopping on this website and would
          definitely recommend it to others."
        </Text>
        <Wrap>
          <WrapItem>
            <Avatar
              name="Karl Brighton"
              src="https://sweta-myteam-website-fm.netlify.app/static/media/avatar-kady.78fc482c.jpg"
            />
          </WrapItem>

          <WrapItem>
            <Box>
              <Text fontSize="sm">Karl Brighton</Text>
            </Box>
          </WrapItem>
        </Wrap>
      </Flex>

      <Spacer />
      <Flex
        width={isLargerThanLG ? "380px" : "full"}
        shadow="md"
        minHeight="250px"
        flexDirection="column"
        p="8"
        m="4"
        border="1px solid #C4DDFF"
        borderRadius="md"
        justifyContent="center"
      >
        <Text mb="5">
          "I found the perfect pair of shoes on this website and the price was
          unbeatable."
        </Text>

        <Wrap>
          <WrapItem>
            <Avatar
              name="Karl Brighton"
              src="https://sweta-myteam-website-fm.netlify.app/static/media/avatar-aiysha.e119a0c1.jpg"
            />
          </WrapItem>

          <WrapItem>
            <Box>
              <Text fontSize="sm">Krishna Bells</Text>
            </Box>
          </WrapItem>
        </Wrap>
      </Flex>
      <Spacer />

      <Flex
        width={isLargerThanLG ? "380px" : "full"}
        shadow="md"
        minHeight="250px"
        flexDirection="column"
        p="8"
        m="4"
        border="1px solid #C4DDFF"
        borderRadius="md"
        justifyContent="center"
      >
        <Text mb="5">
          "The shoes were exactly what I was looking for and the website was
          easy to navigate".
        </Text>
        <Wrap>
          <WrapItem>
            <Avatar
              name="Ben Spiff"
              src="https://sweta-myteam-website-fm.netlify.app/static/media/avatar-arthur.098c2e26.jpg"
            />
          </WrapItem>

          <WrapItem>
            <Box>
              <Text fontSize="sm">Ben Spiff</Text>
            </Box>
          </WrapItem>
        </Wrap>
      </Flex>
    </Flex>
  );
};
export default Testimonials;
