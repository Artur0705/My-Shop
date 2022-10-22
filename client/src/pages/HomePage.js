import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import Rating from "../components/Rating";
import { Button, Container, Flex, Input, Select } from "@chakra-ui/react";
import Hero from "../components/Hero";

function HomePage(props) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const params = useParams();
  const category = params.id ? params.id : "";
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  return (
    <>
      {category && <h2>{category}</h2>}
      <Flex
        h="10vh"
        alignItems="center"
        p="6"
        position="sticky"
        top="0"
        zIndex="sticky"
        w="full"
      >
        <Container maxW={"400px"}>
          <form onSubmit={submitHandler}>
            <Flex>
              <Input
                placeholder="Search"
                name="searchKeyword"
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <Button type="submit" colorScheme="blue" ml="4">
                Search
              </Button>
            </Flex>
          </form>
        </Container>

        <Container maxW={"300px"}>
          <Flex>
            <div>Sort By </div>

            <Select onChange={sortHandler}>
              <option value="">Newest</option>
              <option value="lowest">Lowest</option>
              <option value="highest">Highest</option>
            </Select>
          </Flex>
        </Container>
      </Flex>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className="products">
          <Flex
            alignItems="center"
            justifyContent="space-between"
            w="full"
            py="16"
            px={"6"}
            flexWrap="wrap"
            flexDirection={"row"}
          >
            {products &&
              products.map((product) => (
                <>
                  <Flex
                    width={"400px"}
                    shadow="md"
                    p="6"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="md"
                    flexDirection="column"
                    textAlign="center"
                    mb={"4"}
                  >
                    <Hero data={product} />
                  </Flex>
                </>
              ))}
          </Flex>
        </ul>
      )}
    </>
  );
}

export default HomePage;
