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
    ButtonGroup
} from "@chakra-ui/react";

function ModalProd(props) {


    const printAllCategories = () => {
        return props.category.map((val) => {
            return (
                <option style={{ backgroundColor: "black", color: "white" }} value={`${val.id}`}>{val.category}</option>
            )
        })
    }

    const printAllStatus = () => {
        return props.status.map((val) => {
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
                    <FormControl my="3">
                        <FormLabel fontWeight="semibold">Product name</FormLabel>
                        <Input borderColor="orange" placeholder='Machiatto' onChange={(e) => props.setName(e.target.value)} />
                    </FormControl>
                    <FormControl my="3">
                        <FormLabel fontWeight="semibold">Product image</FormLabel>
                        <Input borderColor="orange" onChange={(e) => props.setProductImage(e.target.value)} />
                    </FormControl>
                    <FormControl my="3">
                        <FormLabel fontWeight="semibold">Price</FormLabel>
                        <Input borderColor="orange" placeholder='Rp.250000' onChange={(e) => props.setPrice(e.target.value)} />
                    </FormControl>
                    <FormControl my="3">
                        <FormLabel fontWeight="semibold">Stock</FormLabel>
                        <Input borderColor="orange" placeholder='100' onChange={(e) => props.setStock(e.target.value)} />
                    </FormControl>
                    <FormControl my="3">
                        <FormLabel fontWeight="semibold">Category</FormLabel>
                        <Select borderColor={"orange"} bgColor={"black"} onChange={(e) => props.setCategoryId(e.target.value)}>
                            {printAllCategories()}
                        </Select>
                    </FormControl>
                    <FormControl my="3">
                        <FormLabel fontWeight="semibold">Status</FormLabel>
                        <Select borderColor={"orange"} bgColor={"black"} onChange={(e) => props.setStatusId(e.target.value)}>
                            {printAllStatus()}
                        </Select>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <ButtonGroup>
                        <Button colorScheme="orange" variant="outline" mr={1} onClick={props.addNewProduct} >
                            Confirm
                        </Button>

                        <Button bgColor="red" mr={3} onClick={props.onClose}>
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
