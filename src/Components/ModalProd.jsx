import React from "react";
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
    Text
} from "@chakra-ui/react";
import { HiDocumentAdd } from "react-icons/hi";

function ModalProd(props) {


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


    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent bg={"black"} color="white">
                <ModalHeader fontSize="3xl" fontWeight="bold">Add Products</ModalHeader>
                <ModalCloseButton size="lg" color="red" />

                <ModalBody>
                    <FormControl my="3" isRequired={true}>
                        <FormLabel fontWeight="semibold">Product name</FormLabel>
                        <Input borderColor="orange.500" placeholder='Machiatto' onChange={(e) => props.setName(e.target.value)} />
                    </FormControl>
                    <FormControl my="3">
                        <FormLabel fontWeight="semibold">Product image</FormLabel>
                        <Button colorScheme={"orange"} rounded={"md"} h={"10"} _hover={""} p={"2.5"} variant={"link"} onClick={() => props.inputFile.current.click()}>
                            <HiDocumentAdd size={"md"} />
                            <Text ml={2}> Add a File</Text>
                            <input type="file" id="file" ref={props.inputFile} style={{ display: "none" }} onChange={props.onChangeFile} />
                            <Modal isOpen={props.modalProductImageisOpen} onClose={props.modalProductImageonClose}>
                                <ModalOverlay />
                                <ModalContent bg={"black"} color="white">
                                    <ModalHeader>Product Image</ModalHeader>
                                    <ModalCloseButton size="lg" color="red" />
                                    <ModalBody>
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
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                        <ButtonGroup>
                                            <Button colorScheme="orange" variant="outline" mr={1} onClick={props.modalProductImageonClose} >
                                                Confirm
                                            </Button>

                                            <Button colorScheme="red" variant="solid" mr={3} onClick={() => {
                                                props.modalProductImageonClose();
                                                props.setFileProduct(null);
                                            }}>
                                                Cancel
                                            </Button>
                                        </ButtonGroup>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </Button>






                    </FormControl>
                    <FormControl my="3" isRequired={true}>
                        <FormLabel fontWeight="semibold">Price</FormLabel>
                        <Input borderColor="orange.500" placeholder='Rp.250000' onChange={(e) => props.setPrice(e.target.value)} />
                    </FormControl>
                    <FormControl my="3" isRequired={true}>
                        <FormLabel fontWeight="semibold">Stock</FormLabel>
                        <Input borderColor="orange.500" placeholder='100' onChange={(e) => props.setStock(e.target.value)} />
                    </FormControl>
                    <FormControl my="3" isRequired={true}>
                        <FormLabel fontWeight="semibold">Category</FormLabel>
                        <Select borderColor={"orange.500"} bgColor={"black"} onChange={(e) => props.setCategoryId(e.target.value)}>
                            {printAllCategories()}
                        </Select>
                    </FormControl>
                    <FormControl my="3" isRequired={true}>
                        <FormLabel fontWeight="semibold">Status</FormLabel>
                        <Select borderColor={"orange.500"} bgColor={"black"} onChange={(e) => props.setStatusId(e.target.value)}>
                            {printAllStatus()}
                        </Select>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <ButtonGroup>
                        <Button colorScheme="orange" variant="outline" mr={1} onClick={props.addNewProduct} >
                            Confirm
                        </Button>

                        <Button colorScheme="red" variant="solid" mr={3} onClick={props.onClose}>
                            Close
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
                {/* ==================================================== */}
            </ModalContent>
        </Modal >
    );
}

export default ModalProd;
