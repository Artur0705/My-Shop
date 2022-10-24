import {
  Flex,
  Spacer,
  Image,
  Text,
  Button,
  useMediaQuery,
  TableContainer,
  Table,
  TableCaption,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct, saveProductReview } from "../actions/productActions";
import Rating from "../components/Rating";
import { PRODUCT_REVIEW_SAVE_RESET } from "../constants/productConstants";

const Services = ({ data }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (productSaveSuccess) {
      alert("Review submitted successfully.");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(params.id));
    return () => {
      //
    };
  }, [productSaveSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  const handleAddToCart = () => {
    navigate("/cart/" + params.id + "?qty=" + qty);
  };
  const [isLargerThanLG] = useMediaQuery("(min-width: 62em)");
  return (
    <Flex
      width="full"
      minHeight="70vh"
      alignItems="center"
      px={isLargerThanLG ? "16" : "6"}
      py="16"
      justifyContent="center"
      flexDirection={isLargerThanLG ? "row" : "column"}
    >
      <Flex
        w={isLargerThanLG ? "40%" : "full"}
        mb={isLargerThanLG ? "0" : "6"}
        alignItems="center"
        justifyContent="center"
      >
        <Image src={data.image} alt={data.image} w="full" />
      </Flex>
      <Spacer />
      <Flex w={"60%"} flexDirection="column" ml={isLargerThanLG ? "7" : "0"}>
        <Text fontSize={isLargerThanLG ? "5xl" : "4xl"} fontWeight="bold">
          {data.name}
        </Text>

        <Text mb="6" opacity="0.8">
          {data.description}
        </Text>

        <TableContainer>
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>Price</Td>
                <Td>{data.price}$</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  );
};

export default Services;
