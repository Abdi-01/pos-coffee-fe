import { Text, Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr, ButtonGroup, IconButton, Flex, Button, useDisclosure, useToast, Stack, Switch } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';

import { BiEditAlt } from 'react-icons/bi'

import { BsPlusLg } from 'react-icons/bs'

import ModalCategory from '../Components/ModalCategory';
import ModalEcat from '../Components/ModalEcat';




function Categories() {
    const toast = useToast()
    const modalCategory = useDisclosure();
    const modalEcat = useDisclosure();
    const [id, setId] = React.useState(1);
    const [allcategory, setallCategory] = React.useState([]); // for get all category
    const [status, setStatus] = React.useState([]);
    const [statusId, setStatusId] = React.useState("1");
    const [category, setCategory] = React.useState(""); // for setting a category

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
            setStatus(response.data.data)
        } catch (error) {
            console.log("dari getAllCategory : ", error);
        }
    }

    const addCategory = async () => {
        try {
            let token = localStorage.getItem("coffee_login");
            let response = await axios.post(`http://localhost:2000/products/add_category`, {
                category: category
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response) {
                modalEcat.onClose();
                toast({
                    description: `${category} has been added`,
                    position: "top",
                    status: 'success',
                    duration: 2000,
                    isClosable: true
                })
                getAllCategory();
            }


        } catch (error) {
            toast({
                description: `${error.response.data}`,
                position: "top",
                status: 'error',
                duration: 2000,
                isClosable: true
            })
            console.log("dari add Category : ", error);
        }
    }

    const printAllCategories = () => {
        return allcategory.map((val, idx) => {
            // console.log("hasil val =", val);
            return (
                <Tr color="white">
                    <Td>{idx + 1}</Td>
                    <Td>{val.category}</Td>
                    <Td color={val.status.status === "Disabled" ? ("red") : ("green")}>{val.status.status}</Td>
                    <Td>
                        <Stack spacing={4} direction='row' align="center">
                            <IconButton variant="ghost" colorScheme={"orange"} fontSize="2xl" icon={<BiEditAlt />} onClick={() => {
                                modalEcat.onOpen()
                                setId(val.id)
                            }}></IconButton>
                            {val.statusId === 1 ? (<Switch colorScheme="orange" defaultChecked onChange={() => deleteCategory(val.id)} />) : (<Switch colorScheme="orange" onChange={() => deleteCategory(val.id)} />)}

                        </Stack>
                    </Td>
                </Tr>
            )
        })
    }
    const editCategory = async () => {
        try {
            let token = localStorage.getItem("coffee_login");
            let response = await axios.patch(`http://localhost:2000/products/edit_category`, {
                category: category,
                id: id
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response) {
                modalEcat.onClose();
                toast({
                    description: `Succesfully edited category`,
                    position: "top",
                    status: 'success',
                    duration: 2000,
                    isClosable: true
                })
                getAllCategory();
            }
        } catch (error) {
            toast({
                description: `${error.response.data}`,
                position: "top",
                status: 'error',
                duration: 2000,
                isClosable: true
            })
            console.log("dari edit category : ", error);
        }
    }
    const deleteCategory = async (id) => {
        try {
            let token = localStorage.getItem("coffee_login");
            let response = await axios.patch(`http://localhost:2000/products/delete_category`, {
                id: id,
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
            getAllCategory();

            console.log("ini response.data dari deleteItem", response);
        } catch (error) {
            toast({
                description: `${error.response.data}`,
                position: "top",
                status: 'error',
                duration: 2000,
                isClosable: true
            })
        }
    }

    React.useEffect(() => {
        getAllCategory();
        getAllStatus();
    }, [statusId]);

    return (
        <Box w="100vw" mx="auto" bgColor={"black"} h="100vh">
            <Box w="65%" mx="auto">
                <Flex py="5" alignItems="center" justifyContent="space-between">
                    <Text color="White" fontSize="3xl" fontWeight="semibold"> All Categories</Text>
                    <ButtonGroup gap="5">
                        <Button variant="solid" colorScheme={"orange"} mt="2" onClick={modalCategory.onOpen}> <BsPlusLg /> <Text marginLeft="3" mb="3px" fontSize="xl">Category</Text> </Button>
                    </ButtonGroup>
                    <ModalEcat isOpen={modalEcat.isOpen} onClose={modalEcat.onClose} setCategory={setCategory} allcategory={allcategory} editCategory={editCategory} />
                    <ModalCategory isOpen={modalCategory.isOpen} onClose={modalCategory.onClose} setCategory={setCategory} addCategory={addCategory} />
                </Flex>
                <TableContainer>
                    <Table variant='simple' fontSize="xl">
                        <Thead>
                            <Tr>
                                <Th color={"white"} fontSize="md">Index</Th>
                                <Th color={"white"} fontSize="md">Category</Th>
                                <Th color={"white"} fontSize="md">Status</Th>
                                <Th> </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {printAllCategories()}
                        </Tbody>

                    </Table>
                </TableContainer>
            </Box>
        </Box >
    );
}

export default Categories;