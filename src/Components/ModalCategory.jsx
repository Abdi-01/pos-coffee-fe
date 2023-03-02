import React from "react";
import {
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

function ModalCategory(props) {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent bg={"black"} color="white">
                <ModalHeader fontSize="3xl" fontWeight="bold">Add Category</ModalHeader>
                <ModalCloseButton size="lg" color="red" />

                <ModalBody>
                    <FormControl my="3">
                        <FormLabel fontWeight="semibold">Category</FormLabel>
                        <Input borderColor="orange" placeholder='Coffee' onChange={(e) => props.setCatField(e.target.value)} isre />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <ButtonGroup>
                        <Button colorScheme="orange" variant="outline" mr={1} onClick={props.addCategory} >
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

export default ModalCategory;
