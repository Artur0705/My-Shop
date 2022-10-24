import React, { useState } from "react";
import {
  Text,
  Flex,
  Spacer,
  IconButton,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
  Link,
  MenuItem,
  MenuButton,
  MenuList,
  Menu,
} from "@chakra-ui/react";
import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaAlignJustify } from "react-icons/fa";
import { Icon } from "@chakra-ui/react";

const Nav = ({ onOpen, ref, userInfo }) => {
  const [scroll, setScroll] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const navBg = useColorModeValue("white", "blackAlpha.200");
  const [isLargerThanMD] = useMediaQuery("(min-width: 48em)");

  const changeScroll = () =>
    document.body.scrollTop > 80 || document.documentElement.scrollTop > 80
      ? setScroll(true)
      : setScroll(false);

  window.addEventListener("scroll", changeScroll);

  return (
    <Flex
      h="10vh"
      alignItems="center"
      p="6"
      boxShadow={scroll ? "base" : "none"}
      position="sticky"
      top="0"
      zIndex="sticky"
      w="full"
      bg={navBg}
    >
      <Text fontSize="xl" fontWeight="bold">
        Shop
      </Text>

      <Spacer />

      <Flex alignItems="center">
        <IconButton mr="10" w={6} h={6} p={5} onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </IconButton>

        {isLargerThanMD ? (
          <>
            {userInfo ? (
              <Menu class="z-index-1000">
                <MenuButton rightIcon={<ChevronDownIcon />}>
                  {userInfo.name}
                </MenuButton>
                <MenuList>
                  <MenuItem minH="48px">
                    <Link href="/profile" fontSize="md" mr="10">
                      Profile
                    </Link>
                  </MenuItem>
                  {userInfo && userInfo.isAdmin && (
                    <>
                      <MenuItem minH="48px">
                        <Link href="/orders" fontSize="md" mr="10">
                          Orders
                        </Link>
                      </MenuItem>
                      <MenuItem minH="48px">
                        <Link href="/products" fontSize="md" mr="10">
                          Products
                        </Link>
                      </MenuItem>
                    </>
                  )}
                </MenuList>
              </Menu>
            ) : (
              <>
                <Link href="/login" fontSize="md" mr="10">
                  Login
                </Link>
              </>
            )}
          </>
        ) : (
          <IconButton ref={ref} onClick={onOpen}>
            <Icon as={FaAlignJustify} />
          </IconButton>
        )}

        <Link href="/cart" fontSize="md" ml="10">
          Cart
        </Link>
      </Flex>
    </Flex>
  );
};

export default Nav;
