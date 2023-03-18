import React from "react";
import {
  Box,
  Text,
  Button,
  Flex,
  Image,
  ButtonGroup,
  Menu,
  MenuItem,
  IconButton,
  MenuButton,
  MenuList,
  useDisclosure,
  Stack,
  HStack,
  Divider,
  ScaleFade,
  Spacer,
  useToast,
  FormControl,
  Input,
} from "@chakra-ui/react";
import Product from "../Components/Product";
import { SearchBar } from "../Components/SearchBar";
import { FiFilter, FiShoppingCart } from "react-icons/fi";
import { CgRemove } from "react-icons/cg";

import axios from "axios";
import Pagination from "../Components/Pagination";

const Landing = () => {
  const toast = useToast();
  const { onOpen } = useDisclosure();
  const btnRef = React.useRef();
  const [showProducts, setShowProducts] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [size, setSize] = React.useState(6);
  const [productName, setProductName] = React.useState("");
  const [totalData, setTotalData] = React.useState(0);
  const [sortby, setSortby] = React.useState("name");
  const [order, setOrder] = React.useState("ASC");
  const [category, setCategory] = React.useState("");
  const [status] = React.useState(1);
  const [allcategory, setallCategory] = React.useState([]); // for get all category
  const [cart, setCart] = React.useState([]);
  const [bayar, setBayar] = React.useState("");

  const getAllProducts = async () => {
    try {
      let token = localStorage.getItem("coffee_login");
      let response = await axios.post(
        `http://localhost:2000/products/list?page=${page}&size=${size}&name=${productName}&sortby=${sortby}&order=${order}&category=${category}&status=${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("ini response.data dari getAllProducts 🪶 : ", response.data);
      console.log(
        "ini ambil total data dari getAllProducts 🪶 : ",
        response.data.datanum
      );

      setTotalData(response.data.datanum);
      setShowProducts(response.data.data);
    } catch (error) {
      console.log("dari getAllProducts : ", error);
    }
  };

  //2. Jalani fungsi getAllProducts
  React.useEffect(() => {
    getAllProducts();
  }, [page, sortby, order, category]);

  React.useEffect(() => {
    getAllCategory();
  }, []);

  //3. Print list of products
  const printAllProducts = () => {
    // console.log("INI ISI Showproducts:", showProducts);
    let print = showProducts.map((val, idx) => {
      console.log("ini val : ", val);
      return (
        <Product
          id={val.id}
          name={val.name}
          uuid={val.uuid}
          productimage={
            val.product_image.includes("https")
              ? val.product_image
              : `http://localhost:2000${val.product_image}`
          }
          price={val.price}
          setCart={setCart}
          cart={cart}
        />
      );
    });
    return print;
  };
  const getAllCategory = async () => {
    try {
      let token = localStorage.getItem("coffee_login");
      let response = await axios.get(
        `http://localhost:2000/products/category`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("hasil response get all category", response.data.data);
      setallCategory(response.data.data);
    } catch (error) {
      console.log("dari getAllCategory : ", error);
    }
  };
  const printAllCategories = () => {
    return allcategory.map((val) => {
      console.log("hasil val category =", val.category);
      return (
        <Button
          variant="outline"
          bgColor={"black"}
          color="white"
          backgroundColor={
            category === `${val.category}` ? "orange.500" : "black"
          }
          _hover={{ bgColor: "orange.500" }}
          _active={{
            bg: "#DE6B1F",
            transform: "scale(0.98)",
          }}
          onClick={() => {
            setPage(0);
            setCategory(`${val.category}`);
          }}
        >
          {val.category}
        </Button>
      );
    });
  };
  const printCart = () => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaa", cart);
    let print = cart.map((val, idx) => {
      console.log("ini val : ", val);
      return (
        <Box w={"95%"} mx="auto">
          <HStack align="start" my="5">
            <Image
              src={`${val.image}`}
              alt="menu picture"
              borderRadius="xl"
              objectFit="cover"
              w="20"
              h="14"
              mr="2"
            />
            <Box maxW="xl" w="full">
              <Flex>
                <Text fontWeight="bold" color="white">
                  {val.name}
                </Text>
              </Flex>
              <Flex w="full" alignItems="center" justifyContent="space-between">
                <Text color="white">
                  Amount:{" "}
                  <Text as="span" color="orange" fontWeight="semibold">
                    {val.total_quantity}
                  </Text>
                </Text>
                <IconButton
                  variant="unstyled"
                  color="red"
                  _hover={{ color: "white" }}
                  icon={<CgRemove size="25px" />}
                  onClick={() => {
                    let find = cart.findIndex((data) => data.uuid === val.uuid);
                    let temp = [...cart];
                    temp.splice(find, 1);
                    setCart(temp);
                  }}
                />
                <Text fontSize="md">Rp. {val.price * val.total_quantity}</Text>
              </Flex>
            </Box>
          </HStack>
        </Box>
      );
    });
    return print;
  };
  const confirmTransaction = async () => {
    try {
      let result = parseInt(bayar) - (subTotal - discount + tax);
      console.log("bbbbbbbbbbbbbbbbbbbb", result, typeof result);
      let final = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(Math.abs(result));

      if (result < 0) {
        return alert(`The payment is not enough. It is ${final} short.`);
      } else {
        if (result === 0) {
          alert("Payment amount is exact");
          let token = localStorage.getItem("coffee_login");
          console.log(cart);
          let response = await axios.post(
            `http://localhost:2000/transaction/add`,
            {
              array: cart,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response) {
            setCart([]);
            setBayar("");
            return toast({
              description: `transaction is successfull`,
              position: "top",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          }
        } else {
          alert(`Change is ${final} `);
          let token = localStorage.getItem("coffee_login");
          console.log(cart);
          let response = await axios.post(
            `http://localhost:2000/transaction/add`,
            {
              array: cart,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response) {
            setCart([]);
            setBayar("");
            return toast({
              description: `transaction is successfull`,
              position: "top",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          }
        }
      }
    } catch (error) {
      toast({
        description: `transaction failed`,
        position: "top",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.log(error);
    }
  };

  // Change page
  const paginate = (pageNumber) => {
    setPage(pageNumber);
  };

  let subTotal = cart.reduce((a, b) => a + b.price * b.total_quantity, 0);
  let discount = 0 * subTotal;
  let tax = 0.1 * subTotal;
  let total = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(subTotal - discount + tax);

  return (
    <Flex
      minH={"92.5vh"}
      // align={'center'}
      justify={"center"}
      bg={"black"}
    >
      {/* LEFT CONTENT */}
      <Box flex={{ base: "none", lg: "1" }}></Box>
      {/* MIDDLE CONTENT */}
      <Box paddingTop="4" pb="4" flex="3" zIndex={"banner"}>
        <Text
          fontSize="4xl"
          fontWeight="bold"
          color="white"
          p={{ base: "8", lg: "4" }}
        >
          Find the best coffee for you
          {/* <Text fontSize='4xl' fontWeight='bold' color='white' pb={{ base: '-10', }} pt='-5'>coffee for you</Text> */}
        </Text>
        <Flex p={{ base: "4", lg: "2" }}>
          <Flex pl={{ base: "6", lg: "2" }} pr="2">
            <SearchBar
              productName={productName}
              setProductName={setProductName}
              getAllProducts={getAllProducts}
              setPage={setPage}
            />
          </Flex>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<FiFilter />}
              variant="outline"
              color="white"
              _expanded={{ bg: "white", color: "black" }}
              mr="2"
            />
            <MenuList>
              <MenuItem
                onClick={() => {
                  setSortby("name");
                  setOrder("ASC");
                }}
              >
                Sort by product name A-Z
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSortby("name");
                  setOrder("DESC");
                }}
              >
                Sort by product name Z-A
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSortby("price");
                  setOrder("ASC");
                }}
              >
                Sort by product price low-high
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSortby("price");
                  setOrder("DESC");
                }}
              >
                Sort by product price high-low
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Flex py="2" pl={{ base: "3", lg: "4" }} overflowX="scroll">
          <ButtonGroup>
            {/* ======================================================================================================================== */}
            <Button
              variant="outline"
              bgColor={"black"}
              color="white"
              backgroundColor={category === "" ? "orange.500" : "black"}
              _hover={{ bgColor: "orange.500" }}
              _active={{
                bg: "#DE6B1F",
                transform: "scale(0.98)",
              }}
              onClick={() => {
                setPage(0);
                setCategory("");
              }}
            >
              All
            </Button>
            {printAllCategories()}
            {/* ======================================================================================================================== */}
          </ButtonGroup>
        </Flex>
        <Flex
          maxW="6xs"
          flexWrap="wrap"
          justifyContent="space-evenly"
          alignItem="start"
        >
          {printAllProducts()}
          <Flex mt="4" w="full" justify={"center"}>
            <Pagination
              size={size}
              page={page}
              totalData={totalData}
              paginate={paginate}
            />
          </Flex>
        </Flex>
      </Box>
      {/* RIGHT CONTENT */}
      <Box
        flex="1"
        height="92.5vh"
        bgColor={cart.length === 0 ? "transparent" : "gray.900"}
        color="white"
      >
        <ScaleFade in={cart.length > 0} initialScale={0.9}>
          <Box display={cart.length === 0 ? "none" : "block"}>
            <Text
              textAlign="center"
              fontSize="2xl"
              fontWeight="bold"
              pb="5"
              color="white"
              borderColor="white"
            >
              Order Details
            </Text>
            <Divider w="98%" mx="auto" mb="3" />
            <Stack spacing={1}>
              <Box mb="8">
                <Stack spacing={1}>
                  <Box overflowY="scroll" height={{ md: "58vh", lg: "50vh" }}>
                    {printCart()}
                  </Box>
                </Stack>
              </Box>
            </Stack>
            <Box position="relative" bottom="1" fontWeight="semibold">
              <Flex w="95%" justifyContent="space-between" mx="auto">
                <Text>Sub-Total</Text>
                <Text>Rp. {subTotal}</Text>
              </Flex>
              <Flex w="95%" my="4" justifyContent="space-between" mx="auto">
                <Text>Discount</Text>

                <Text>0</Text>
              </Flex>
              <Flex w="95%" pb="4" justifyContent="space-between" mx="auto">
                <Text>Tax (10%)</Text>
                <Text>Rp. {tax}</Text>
              </Flex>
            </Box>
            <Flex
              borderTop="1px"
              justifyContent="space-between"
              mx="auto"
              borderColor="white"
              pt="4"
              w="97%"
              mb="2"
            >
              <Text fontWeight="bold" color="white">
                Total
              </Text>
              <Spacer />
              <Text fontWeight="bold" color="orange.500">
                {total}
              </Text>
            </Flex>
            <FormControl>
              <Flex
                w="97%"
                pb="4"
                justifyContent="space-between"
                alignItems="center"
                mx="auto"
              >
                <Text fontWeight="bold" color="white">
                  Payment
                </Text>
                <Input
                  w="25%"
                  size="sm"
                  fontSize="md"
                  textAlign="right"
                  value={bayar}
                  onChange={(e) => setBayar(e.target.value)}
                />
              </Flex>
            </FormControl>
            <Box
              bgColor="orange.500"
              w="100%"
              as="button"
              type="button"
              _hover={{ bgColor: "orange.600" }}
              boxShadow="dark-lg"
              mt={{ lg: "-2", xl: "4" }}
              onClick={confirmTransaction}
            >
              <Text
                textAlign="center"
                fontSize="xl"
                fontWeight="semibold"
                py={{ xl: "3", lg: "2" }}
              >
                Confirm
              </Text>
            </Box>
          </Box>
        </ScaleFade>
      </Box>
    </Flex>
  );
};

export default Landing;
