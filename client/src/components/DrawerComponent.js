import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Link,
  Flex,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

const DrawerComponent = ({ isOpen, onClose, btnRef }) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      zIndex="popover"
    >
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Menu</DrawerHeader>

        <DrawerBody>
          <Flex flexDirection="column">
            <Link href="/profile" fontSize="md" mr="10">
              Profile
            </Link>
            <Link href="/category/running_shoes">Running shoes</Link>
            <Link href="/category/sneakers">Sneakers</Link>
            <Link href="/category/classic">Classic</Link>
            <Link href="/category/work_boots">Work boots</Link>

            {userInfo && userInfo.isAdmin && (
              <>
                <Link href="/products" fontSize="md" mr="10">
                  Products
                </Link>
                <Link href="/orders" fontSize="md" mr="10">
                  Orders
                </Link>
              </>
            )}
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
