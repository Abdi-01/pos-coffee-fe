import React, { useState } from "react";
import {
    Select,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    Button,
    ModalCloseButton,
    ButtonGroup,
    Image,
    Text,
    useToast,
    FormHelperText
} from "@chakra-ui/react";
import { HiDocumentAdd } from "react-icons/hi";
import axios from "axios";


function Modaledit(props) {
    const toast = useToast()
    const [name] = useState("");
    const [stock] = useState("");
    const [price] = useState("");

    const printAllCategories = () => {
        return props.allcategory.map((val) => {
            return (
                <option style={{ backgroundColor: "black", color: "white" }} value={`${val.id}`}>{val.category}</option>
            )
        })
    }

    const printAllStatus = () => {
        return props.allStatus.map((val) => {
            return (
                <option style={{ backgroundColor: "black", color: "white" }} value={`${val.id}`}>{val.status}</option>
            )
        })
    }

    const editProduct = async () => {
        try {
            let token = localStorage.getItem("coffee_login");
            let formData = new FormData();

            formData.append("data", JSON.stringify({
                name: !name ? props.name : name,
                price: !price ? props.price : price,
                stock: !stock ? props.stock : stock,
                categoryId: props.categoryId,
                statusId: props.statusId
            }));

            if (props.fileProduct != null) {
                formData.append("images", props.fileProduct);
            }
            let update = await axios.patch(`http://localhost:2000/products/edit_product?uuid=${props.uuid}`,
                formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (update.data.success) {
                props.setFileProduct(null);
                toast({
                    position: "top",
                    title: `Item Successfully Edited`,
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                props.getAllProducts();
                props.onClose();
            }
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent bg={"black"} color="white">
                <ModalHeader fontSize="3xl" fontWeight="bold">Edit Products</ModalHeader>
                <ModalCloseButton size="lg" color="red" />

                <ModalBody>
                    <FormControl my="3">
                        <FormLabel fontWeight="semibold">Product name</FormLabel>
                        <Input borderColor="orange.500" placeholder='Machiatto' onChange={(e) => props.setName(e.target.value)} defaultValue={props.name} />
                    </FormControl>
                    <FormControl my="3">
                        <FormLabel fontWeight="semibold">Product image</FormLabel>
                        <Image
                            objectFit="cover"
                            size="4xl"
                            src={
                                props.fileProduct
                                    ? URL.createObjectURL(
                                        props.fileProduct
                                    )
                                    : ""
                            }
                            w="full"
                        />
                        <Button colorScheme={"orange"} rounded={"md"} h={"10"} _hover={""} p={"2.5"} variant={"link"} onClick={() => props.inputFile.current.click()}>
                            <HiDocumentAdd size={"md"} />
                            <Text ml={2}> Add a File</Text>
                            <input type="file" id="file" ref={props.inputFile} style={{ display: "none" }} onChange={props.onChangeFile} />
                        </Button>
                    </FormControl>
                    <FormControl my="3">
                        <FormLabel fontWeight="semibold">Price</FormLabel>
                        <Input borderColor="orange.500" placeholder='Rp.250000' onChange={(e) => props.setPrice(e.target.value)} defaultValue={props.price} />
                    </FormControl>
                    <FormControl my="3">
                        <FormLabel fontWeight="semibold">Stock</FormLabel>
                        <Input borderColor="orange.500" placeholder='100' onChange={(e) => props.setStock(e.target.value)} defaultValue={props.stock} />
                    </FormControl>
                    <FormControl my="3">
                        <FormLabel fontWeight="semibold">Category</FormLabel>
                        <Select borderColor={"orange.500"} bgColor={"black"} onChange={(e) => props.setCategoryId(e.target.value)}>
                            {printAllCategories()}
                        </Select>
                        <FormHelperText color={"gray.300"}>Previous category was {props.catformodal}</FormHelperText>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <ButtonGroup>
                        <Button colorScheme="orange" variant="outline" mr={1} onClick={editProduct}  >
                            Confirm
                        </Button>
                        <Button colorScheme="red" variant="solid" mr={3} onClick={() => {
                            props.onClose()
                            props.setFileProduct(null);
                        }}>
                            Close
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
                {/* ==================================================== */}
            </ModalContent>
        </Modal >

    );
}

export default Modaledit;