import React from 'react';
import {
    Flex,
    Avatar,
    Text,
    Box,
    Icon,
    Button,
    Heading
} from "@chakra-ui/react";

const Pagination = (props) => {
    const pageNumbers = [];
    console.log("ini props.totaldata", props.totalData);
    console.log("ini props.size", props.size);
    for (let i = 1; i <= Math.ceil(props.totalData / props.size); i++) {
        pageNumbers.push(i);
    }
    return (

        <Flex>
            {pageNumbers.map(number => (
                <Button onClick={() => props.paginate(number - 1)} color='white'
                    size='md'
                    fontSize="xs"
                    width="4"
                    bg="orange.500"
                    _hover={{
                        bg: "orange.600",
                    }}
                    className='page-link' type="button"
                    mr='4'
                >
                    {number}
                </Button>
            ))}
        </Flex>

    )

}
export default Pagination;