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
        <Text mb="5">"Lorem ipsum."</Text>
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
              <Text fontSize="sm" opacity="0.7">
                Test Customer
              </Text>
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
        <Text mb="5">"Lorem ipsum..."</Text>

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
              <Text fontSize="sm" opacity="0.7">
                Test customer
              </Text>
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
        <Text mb="5">"Lorem ipsum..."</Text>
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
              <Text fontSize="sm" opacity="0.7">
                Test Customer
              </Text>
            </Box>
          </WrapItem>
        </Wrap>
      </Flex>
    </Flex>
  );
};
export default Testimonials;
