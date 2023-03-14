import { Text, Box, Image, Table, TableContainer, Tbody, Td, Th, Thead, Tr, IconButton, Flex, Button, useDisclosure, useToast, Stack, Switch } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';

import { BiEditAlt } from 'react-icons/bi'

import { BsPlusLg } from 'react-icons/bs'
import ModalProd from '../Components/ModalProd';
import Modaledit from '../Components/Modaledit'




function Inventory() {
    const toast = useToast()
    const modalProduct = useDisclosure();
    const modalEdit = useDisclosure();
    const modalProductImage = useDisclosure();
    const inputFile = React.useRef(null);
    const [fileProduct, setFileProduct] = React.useState(null);
    const [page, setPage] = React.useState(0);
    const [size, setSize] = React.useState(99999);
    const [uuid, setUuid] = React.useState("")
    const [productName, setProductName] = React.useState("");
    const [sortby, setSortby] = React.useState("name");
    const [order, setOrder] = React.useState("ASC");
    const [showProducts, setShowProducts] = React.useState([]);
    const [allcategory, setallCategory] = React.useState([]); // for get all category, prlu untuk component modal yg dipakai di page ini
    const [name, setName] = React.useState("");
    const [productImage, setProductImage] = React.useState("");
    const [price, setPrice] = React.useState(0);
    const [stock, setStock] = React.useState(0);
    const [categoryId, setCategoryId] = React.useState(1); // for create new product
    const [allStatus, setAllStatus] = React.useState([]);
    const [statusId, setStatusId] = React.useState("1");
    const [category] = React.useState("");
    const [statusget] = React.useState("");
    const [catformodal, setCatForModal] = React.useState("")


    const getAllCategory = async () => {
        try {
            let token = localStorage.getItem("coffee_login");
            let response = await axios.get(`http://localhost:2000/products/category`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log("hasil response get all category", response.data.data)
            setallCategory(response.data.data)
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
            setAllStatus(response.data.data)
        } catch (error) {
            console.log("dari getAllStatus : ", error);
        }
    }

    const onChangeFile = (event) => {
        modalProductImage.onOpen();
        setFileProduct(event.target.files[0]);
    };

    const addNewProduct = async () => {
        try {
            let formData = new FormData();
            let token = localStorage.getItem("coffee_login");

            formData.append(
                "data",
                JSON.stringify({
                    name: name,
                    price: price,
                    stock: stock,
                    categoryId: categoryId,
                    statusId: statusId
                })
            );
            if (formData != null) {
                formData.append("images", fileProduct);
            }


            let response = await axios.post(`http://localhost:2000/products/add_product`,
                formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response) {
                setFileProduct(null);

                toast({
                    description: `${name} has been added`,
                    position: "top",
                    status: 'success',
                    duration: 2000,
                    isClosable: true
                })
                getAllProducts();
                modalProduct.onClose();
            }
        } catch (error) {
            console.log("dari addNewProduct : ", error);
        }
    }

    const getAllProducts = async () => {
        try {
            let token = localStorage.getItem("coffee_login");

            let response = await axios.post(`http://localhost:2000/products/list?page=${page}&size=${size}&name=${productName}&sortby=${sortby}&order=${order}&category=${category}&status=${statusget}`, {}, {
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


    const printAllProducts = () => {
        return showProducts.map((val, idx) => {
            console.log("hasil val print products =", val);
            return (
                <>
                    <Tr color="white">
                        <Td>{idx + 1}</Td>
                        <Td>{val.name}</Td>
                        <Td><Image objectFit="cover" src={val.product_image.includes("https") ? val.product_image : `http://localhost:2000${val.product_image}`} rounded="2xl" boxSize="200px" alt="product image" /></Td>
                        {/* `${API_URL}${props.image}` */}
                        <Td>{val.price}</Td>
                        <Td>{val.stock}</Td>
                        <Td>{val.category.category}</Td>
                        <Td color={val.status.status === "Disabled" ? ("red") : ("green")}>{val.status.status}</Td>
                        <Td>
                            <Stack spacing={4} direction='row' align="center">
                                <IconButton variant="ghost" colorScheme={"orange"} fontSize="2xl" icon={<BiEditAlt />} onClick={() => onEditButton(val.uuid, val.name, val.price, val.stock, val.category.category)}></IconButton>

                                {val.statusId === 1 ? (<Switch colorScheme="orange" defaultChecked onChange={() => deleteItem(val.uuid)} />) : (<Switch colorScheme="orange" onChange={() => deleteItem(val.uuid)} />)}

                            </Stack>
                        </Td>
                    </Tr>
                </>


            )
        })
    }

    const onEditButton = (uuid, valname, valprice, valstock, valcategory) => {
        modalEdit.onOpen()
        setUuid(uuid)
        setName(valname)
        setPrice(valprice)
        setStock(valstock)
        setCatForModal(valcategory)
    }

    React.useEffect(() => {
        getAllProducts();
        getAllCategory();
        getAllStatus();
    }, [name, statusId]);

    return (
        <Box w="100vw" mx="auto" bgColor={"black"} h="full">
            <Box maxW="65vw" mx="auto" >
                <Flex py="5" alignItems="center" justifyContent="space-between">
                    <Text color="White" fontSize="3xl" fontWeight="semibold"> All Products</Text>
                    <Button variant="solid" colorScheme={"orange"} mt="2" onClick={modalProduct.onOpen}> <BsPlusLg /> <Text marginLeft="3" mb="3px" fontSize="xl">Product</Text></Button>
                    {/* =================================================================== Product Add modal ============================================================ */}
                    <ModalProd isOpen={modalProduct.isOpen} onClose={modalProduct.onClose} allcategory={allcategory} addNewProduct={addNewProduct} name={name} setName={setName} productImage={productImage} setProductImage={setProductImage} price={price} setPrice={setPrice} stock={stock} setStock={setStock} setCategoryId={setCategoryId} allStatus={allStatus} setStatusId={setStatusId} inputFile={inputFile} onChangeFile={onChangeFile} modalProductImageisOpen={modalProductImage.isOpen} modalProductImageonClose={modalProductImage.onClose} fileProduct={fileProduct} setFileProduct={setFileProduct} />
                    {/* =================================================================== Product edit modal ============================================================ */}
                    <Modaledit isOpen={modalEdit.isOpen} onClose={modalEdit.onClose} allcategory={allcategory} name={name} setName={setName} productImage={productImage} setProductImage={setProductImage} price={price} setPrice={setPrice} stock={stock} setStock={setStock} categoryId={categoryId} setCategoryId={setCategoryId} allStatus={allStatus} statusId={statusId} setStatusId={setStatusId} inputFile={inputFile} onChangeFile={onChangeFile} modalProductImageisOpen={modalProductImage.isOpen} modalProductImageonClose={modalProductImage.onClose} fileProduct={fileProduct} setFileProduct={setFileProduct} uuid={uuid} getAllProducts={getAllProducts} catformodal={catformodal} />
                </Flex>
                <TableContainer overflowX="hidden" maxW="100%">
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