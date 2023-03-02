import { Text, Box, Image, Table, TableContainer, Tbody, Td, Th, Thead, Tr, ButtonGroup, IconButton, Flex, Button, useDisclosure, useToast, Stack, Switch } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';

import { BiEditAlt } from 'react-icons/bi'

import { BsPlusLg } from 'react-icons/bs'
import ModalProd from '../Components/ModalProd';
import ModalCategory from '../Components/ModalCategory';




function Inventory() {
    const toast = useToast()
    const modalProduct = useDisclosure();
    const modalCategory = useDisclosure();
    const [page, setPage] = React.useState(0);
    const [size, setSize] = React.useState(99999);
    const [productName, setProductName] = React.useState("");
    const [sortby, setSortby] = React.useState("name");
    const [order, setOrder] = React.useState("ASC");
    const [showProducts, setShowProducts] = React.useState([]);
    const [category, setCategory] = React.useState([]); // for get all category
    const [name, setName] = React.useState("");
    const [productImage, setProductImage] = React.useState("");
    const [price, setPrice] = React.useState(0);
    const [stock, setStock] = React.useState(0);
    const [categoryId, setCategoryId] = React.useState(1); // for create new product
    const [status, setStatus] = React.useState([]);
    const [statusId, setStatusId] = React.useState("1");
    const [catField, setCatField] = React.useState("")



    const getAllCategory = async () => {
        try {
            let token = localStorage.getItem("coffee_login");
            let response = await axios.get(`http://localhost:2000/products/category`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log("hasil response get all category", response.data.data)
            setCategory(response.data.data)
        } catch (error) {
            console.log("dari getAllCategory : ", error);
        }
    }

    const getAllStatus = async () => {
        try {
            let token = localStorage.getItem("coffee_login");
            let response = await axios.get(`http://localhost:2000/products/status`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log("hasil response get all status", response.data.data)
            setStatus(response.data.data)
        } catch (error) {
            console.log("dari getAllCategory : ", error);
        }
    }

    const addNewProduct = async () => {
        try {
            let token = localStorage.getItem("coffee_login");
            let response = await axios.post(`http://localhost:2000/products/add_product`, {
                name: name,
                product_image: productImage,
                price: price,
                stock: stock,
                categoryId: categoryId,
                statusId: statusId
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response) {

                modalProduct.onClose();
                toast({
                    description: `${name} has been added`,
                    position: "top",
                    status: 'success',
                    duration: 2000,
                    isClosable: true
                })
                getAllProducts();
            }


        } catch (error) {
            console.log("dari getAllCategory : ", error);
        }
    }

    const getAllProducts = async () => {
        try {
            let token = localStorage.getItem("coffee_login");
            let response = await axios.post(`http://localhost:2000/products/list?page=${page}&size=${size}&name=${productName}&sortby=${sortby}&order=${order}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("ini response.data dari getAllProducts 🪶 : ", response.data);
            console.log("ini ambil total data dari getAllProducts 🪶 : ", response.data.datanum);

            setShowProducts(response.data.data);
        } catch (error) {
            console.log("dari getAllProducts : ", error);
        }
    };


    const deleteItem = async (UUID) => {
        try {
            let token = localStorage.getItem("coffee_login");
            let response = await axios.patch(`http://localhost:2000/products/delete_product`, {
                uuid: UUID,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast({
                description: `${response.data}`,
                position: "top",
                status: 'success',
                duration: 2000,
                isClosable: true
            })
            getAllProducts();

            console.log("ini response.data dari deleteItem", response);
        } catch (error) {
            console.log("dari deleteItem : ", error);
        }
    }
    const addCategory = async () => {
        try {
            let token = localStorage.getItem("coffee_login");
            let response = await axios.post(`http://localhost:2000/products/add_category`, {
                category: catField
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response) {

                modalProduct.onClose();
                toast({
                    description: `${catField} has been added`,
                    position: "top",
                    status: 'success',
                    duration: 2000,
                    isClosable: true
                })
                getAllCategory();
            }


        } catch (error) {
            console.log("dari getAllCategory : ", error);
        }
    }


    const printAllProducts = () => {
        return showProducts.map((val, idx) => {
            console.log("hasil val =", val);
            return (

                <Tr color="white">
                    <Td>{idx + 1}</Td>
                    <Td>{val.name}</Td>
                    <Td><Image objectFit="cover" src={val.product_image} rounded="2xl" boxSize="200px" alt="product image" /></Td>
                    <Td>{val.price}</Td>
                    <Td>{val.stock}</Td>
                    <Td>{val.category.category}</Td>
                    <Td color={val.status.status == "Disabled" ? ("red") : ("green")}>{val.status.status}</Td>
                    <Td>
                        <Stack spacing={4} direction='row' align="center">
                            <IconButton variant="ghost" colorScheme={"orange"} fontSize="2xl" icon={<BiEditAlt />} ></IconButton>
                            {val.statusId == 1 ? (<Switch colorScheme="orange" defaultChecked onChange={() => deleteItem(val.uuid)} />) : (<Switch colorScheme="orange" onChange={() => deleteItem(val.uuid)} />)}

                        </Stack>
                    </Td>
                </Tr>


            )
        })
    }

    React.useEffect(() => {
        getAllProducts();
        getAllCategory();
        getAllStatus();
    }, [name, statusId]);

    return (
        <Box w="100vw" mx="auto" bgColor={"black"}>
            <Box w="65%" mx="auto">
                <Flex py="5" alignItems="center" justifyContent="space-between">
                    <Text color="White" fontSize="3xl" fontWeight="semibold"> All Products</Text>
                    <ButtonGroup gap="5">
                        <Button variant="solid" colorScheme={"orange"} mt="2" onClick={modalProduct.onOpen}> <BsPlusLg /> <Text marginLeft="3" mb="3px" fontSize="xl">Product</Text></Button>
                        <Button variant="solid" colorScheme={"orange"} mt="2" onClick={modalCategory.onOpen}> <BsPlusLg /> <Text marginLeft="3" mb="3px" fontSize="xl">Category</Text> </Button>
                    </ButtonGroup>
                    <ModalProd isOpen={modalProduct.isOpen} onClose={modalProduct.onClose} category={category} addNewProduct={addNewProduct} name={name} setName={setName} productImage={productImage} setProductImage={setProductImage} price={price} setPrice={setPrice} stock={stock} setStock={setStock} setCategoryId={setCategoryId} status={status} setStatusId={setStatusId} />
                    <ModalCategory isOpen={modalCategory.isOpen} onClose={modalCategory.onClose} setCatField={setCatField} addCategory={addCategory} />
                </Flex>
                <TableContainer>
                    <Table variant='simple' fontSize="xl">
                        <Thead>
                            <Tr>
                                <Th color={"white"} fontSize="md">Index</Th>
                                <Th color={"white"} fontSize="md">Product Name</Th>
                                <Th color={"white"} fontSize="md">Product Image</Th>
                                <Th color={"white"} fontSize="md">price</Th>
                                <Th color={"white"} fontSize="md"> Stock</Th>
                                <Th color={"white"} fontSize="md"> Category</Th>
                                <Th color={"white"} fontSize="md"> Status</Th>
                                <Th> </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {printAllProducts()}
                        </Tbody>

                    </Table>
                </TableContainer>
            </Box>
        </Box >
    );
}

export default Inventory;