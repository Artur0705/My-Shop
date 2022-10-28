import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct, saveProductReview } from "../actions/productActions";
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
  Textarea,
  FormControl,
  FormLabel,
  Select,
  Container,
  Thead,
  Th,
} from "@chakra-ui/react";
import { PRODUCT_REVIEW_SAVE_RESET } from "../constants/productConstants";
import Services from "../components/Services";
import Rating from "../components/Rating";

function ProductPage(props) {
  const [isLargerThanLG] = useMediaQuery("(min-width: 62em)");
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
  const params = useParams();
  const navigate = useNavigate();

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

  return (
    <>
      <Container maxW="550px">
        {product && (
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
              <Image src={product.image} alt={product.image} w="full" />
            </Flex>
            <Spacer />
            <Flex
              w={"60%"}
              flexDirection="column"
              ml={isLargerThanLG ? "7" : "0"}
            >
              <Text fontSize={isLargerThanLG ? "5xl" : "4xl"} fontWeight="bold">
                {product.name}
              </Text>

              <Text mb="6" opacity="0.8">
                {product.description}
              </Text>

              <TableContainer>
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td>Price</Td>
                      <Td>{product.price}$</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>

              {product.countInStock > 0 && (
                <Button
                  width="200px"
                  onClick={handleAddToCart}
                  size="lg"
                  colorScheme="blue"
                >
                  Add to Cart
                </Button>
              )}
            </Flex>
          </Flex>
        )}
        <Container maxW="1120px">
          <Text fontSize="4xl" textAlign={"center"}>
            Review and Comment
          </Text>

          <TableContainer>
            <Table variant="simple">
              <Tbody>
                {product &&
                  product.reviews.map((review) => (
                    <Tr key={review._id}>
                      <Td>{review.name}</Td>
                      <Td>
                        <Rating value={review.rating}></Rating>
                      </Td>
                      <Td>{review.createdAt.substring(0, 10)}</Td>
                      <Td>{review.comment}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Container>

        <li>
          <h3>Write a customer review</h3>
          {userInfo ? (
            <form onSubmit={submitHandler}>
              <div className="form-container">
                <FormControl>
                  <FormLabel>Rating</FormLabel>
                  <Select
                    placeholder="Rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="1">1- Poor</option>
                    <option value="2">2- Fair</option>
                    <option value="3">3- Good</option>
                    <option value="4">4- Very Good</option>
                    <option value="5">5- Excelent</option>
                  </Select>
                </FormControl>
                <Text mb="8px">Comment</Text>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Comment"
                  size="sm"
                />
                <div>
                  <Button
                    type="submit"
                    width="200px"
                    mt="20px"
                    size="lg"
                    colorScheme="blue"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <div>
              Please <Link to="/signin">Sign-in</Link> to write a review.
            </div>
          )}
        </li>
      </Container>
    </>
  );
}

export default ProductPage;
