import { Flex, Box, FormControl, Spacer, FormLabel, Input, InputGroup, HStack, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Link, } from '@chakra-ui/react';
import { useState } from 'react';
import OrderList from '../Components/OrderList';


export default function Transaction() {
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg='black'>
            <Stack spacing={8} mx={'auto'} minW={{ base:'px', md:'lg', lg:'2xl'}} py={12} px={6}>
                <Box
                    rounded={'lg'}
                    bg='gray.900'
                    boxShadow={'lg'}
                    p={8}>
                    <Text fontSize='4xl' fontWeight='bold' mb='8' pb='4' color='white' borderBottom='1px' borderColor='white'>Order Details</Text>
                    <Stack spacing={1}>
                        <Box mb='8'>
                        <Stack spacing={1}>
                            <Box>
                                <OrderList />
                            </Box>
                            <Box>
                                <OrderList />
                            </Box>
                            <Box>
                                <OrderList />
                            </Box>
                            <Box >
                                <OrderList />
                            </Box>
                            </Stack>
                        </Box>
                        <Flex borderTop='1px' borderColor='white' pt='4'
                        //  marginTop='20'
                          >
                                <Text fontWeight='bold' color='white' >
                                    Total
                                </Text>
                                <Spacer />
                                <Text fontWeight='bold' color='orange.500' >
                                    $36.00
                                </Text>
                        </Flex>
                        <Stack spacing={10} pt={8}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={'orange.500'}
                                color={'white'}
                                _hover={{
                                    bg: 'orange.600',
                                }}
                            >
                                Continue to Payment
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
