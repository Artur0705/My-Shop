import {
  Flex,
  FormControl,
  Text,
  Input,
  Textarea,
  Button,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { omit } from "lodash";

const ContactUs = () => {
  const [isLargerThanLG] = useMediaQuery("(min-width: 62em)");
  const defaultForm = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
    validate(e, e.currentTarget.name, e.currentTarget.value);
  };

  const [errors, setErrors] = useState({});

  const validate = (event, name, value) => {
    switch (name) {
      case "name":
        if (value.length <= 3) {
          setErrors({
            ...errors,
            name: "Name must be minimum 3 characters",
          });
        } else {
          let newObj = omit(errors, "name");
          setErrors(newObj);
        }
        break;

      case "email":
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            email: "Please enter a valid email address",
          });
        } else {
          let newObj = omit(errors, "email");
          setErrors(newObj);
        }
        break;

      case "message":
        if (value.length <= 4) {
          setErrors({
            ...errors,
            message: "Minimum 5 characters required",
          });
        } else {
          let newObj = omit(errors, "message");
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
  };

  const [input, setInput] = useState(defaultForm);
  const toast = useToast();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const submitForm = () => {
    Axios.post("/api/users/contact", input, {
      headers: { Authorization: "Bearer " + userInfo.token },
    });
    return toast({
      title: "Message sent!🚀",
      description: "Thank you for contacting us!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };
  return (
    <Flex
      w="full"
      minHeight="90vh"
      py="16"
      px={isLargerThanLG ? "16" : "6"}
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Text fontSize="3xl" mb="6">
        Contact Us
      </Text>

      <FormControl
        w={isLargerThanLG ? "60%" : "full"}
        display="flex"
        flexDirection="column"
        alignItems="start"
      >
        <Input
          id="fullName"
          type="text"
          placeholder="Full Name"
          mb="5"
          h="14"
          value={input.name}
          name="name"
          onChange={handleChange}
        />
        {errors.name && <h3 class="errore">{errors.name}</h3>}

        <Input
          id="email"
          type="email"
          name="email"
          value={input.email}
          onChange={handleChange}
          placeholder="Email"
          mb="5"
          h="14"
        />
        {errors.email && <h3 class="errore">{errors.email}</h3>}

        <Textarea
          placeholder="Enter a message"
          name="message"
          value={input.message}
          onChange={handleChange}
          mb="5"
          rows={7}
          p="5"
        />
        {errors.message && <h3 class="errore">{errors.message}</h3>}

        <Button
          colorScheme="blue"
          size="lg"
          textAlign="left"
          width="200px"
          type="submit"
          onClick={submitForm}
        >
          SUBMIT
        </Button>
      </FormControl>
    </Flex>
  );
};

export default ContactUs;
