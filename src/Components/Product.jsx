import React from "react";
import { Spacer, Card, CardBody, Stack, Heading, Divider, CardFooter, Box, Button, ButtonGroup, Container, Flex, Text, Menu, MenuButton, MenuItem, MenuList, Spinner, Image, IconButton } from '@chakra-ui/react';
import axios from "axios";


function Product() {

  const getAllProducts = async () => {
    try {
      let token = localStorage.getItem("coffee_login"); //td token is not defined krn ini 
      let response = await axios.post('http://localhost:2000/products/',{}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      //cara tau ada yg login ato engga dr localstorage
    
      console.log("ini response dari getAllProducts : ", getAllProducts);
    } catch (error) {
      console.log("dari getAllProducts : ", error);
    }
  }

  return (
    //   <div>Produk</div>
    <Card minW={{ base: '40%', sm: '40%', md: '30%', lg: '32%' }} bgColor='gray.900' borderRadius={{ base: 'xl', md: '3xl' }} my={{ base: '2', md: '4' }}
      mx={{ base: '0', lg: '1' }}
    >
      <CardBody>
        {/* PRODUCT IMAGE */}
        <Image
          src='https://images.unsplash.com/photo-1600056781444-55f3b64235e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80'
          alt='menu picture'
          borderRadius={{ base: 'lg', md: 'xl' }}
          objectFit='cover'
          w="full"
          h={{ base: '20', sm: "40", md: '44' }}
        />
        <Stack mt={{ base: '2', sm: '6' }} spacing='3'>
          {/* PRODUCT NAME */}
          <Heading size={{ base: 'sm', sm: 'md' }} color='white'>Cappuccino</Heading>
          <Flex >
            <Text color='white' fontSize={{ base: 'md', sm: '2xl' }}>
              {/* PRODUCT PRICE */}
              <Flex>
                <Text color={'#DE6B1F'} mr='2'>$</Text>
                4.50
              </Flex>
            </Text>
            <Spacer />
            {/* ADD TO ORDER BUTTON */}
            <Button variant='solid' colorScheme='orange' size={{ base: 'xs', md: 'md' }}>
              <Text fontWeight='extrabold'>
                +
              </Text>
            </Button>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default Product;
