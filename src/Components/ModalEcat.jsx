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
} from "@chakra-ui/react";


function ModalEcat(props) {

  const printAllCategories = () => {
    return props.allcategory.map((val) => {
      return (
        <option
          style={{ backgroundColor: "black", color: "white" }}
          value={`${val.id}`}
        >
          {val.category}
        </option>
      );
    });
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent bg={"black"} color="white">
        <ModalHeader fontSize="3xl" fontWeight="bold">
          Edit Category
        </ModalHeader>
        <ModalCloseButton size="lg" color="red" />

        <ModalBody>
          <FormControl my="3" isRequired={true}>
            <FormLabel fontWeight="semibold">New category name</FormLabel>
            <Input
              borderColor="orange"
              placeholder="Coffee"
              onChange={(e) => props.setCategory(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <ButtonGroup>
            <Button
              colorScheme="orange"
              variant="outline"
              mr={1}
              onClick={props.editCategory}
            >
              Confirm
            </Button>

            <Button bgColor="red" mr={3} onClick={props.onClose}>
              Close
            </Button>
          </ButtonGroup>
        </ModalFooter>
        {/* ==================================================== */}
      </ModalContent>
    </Modal>
  );
}

export default ModalEcat;
