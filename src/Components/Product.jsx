import React from "react";
import { Spacer, Card, CardBody, Stack, Heading, Button, ButtonGroup, Flex, Text, Image, } from '@chakra-ui/react';

function Product(props) {

  const [disabled] = React.useState(false);

  const search = props.cart.find((val) => {
    // untuk mengetahui apakah di dalam cart usestate ada data yg sama dengan card product atau tidak
    if (val.id === props.id) {
      return true
    } else {
      return false
    }
  });



  return (
    <Card minW={{ base: '40%', sm: '40%', md: '30%', lg: '32%' }} bgColor='gray.900' borderRadius={{ base: 'xl', md: '3xl' }} my={{ base: '2', md: '4' }}
      mx={{ base: '0', lg: '1' }}
    >
      <CardBody>
        {/* PRODUCT IMAGE */}
        <Image
          src={props.productimage}
          alt='menu picture'
          borderRadius={{ base: 'lg', md: 'xl' }}
          objectFit='cover'
          w="full"
          h={{ base: '20', sm: "40", md: '44' }}
        />
        <Stack mt={{ base: '2', sm: '6' }} spacing='3'>
          {/* PRODUCT NAME */}
          <Heading size={{ base: 'sm', sm: 'md' }} color='white'>
            {/* Cappuccino */}
            {props.name}
          </Heading>
          <Flex >
            <Text color='white' fontSize={{ base: 'md', sm: '2xl' }}>
              {/* PRODUCT PRICE */}
              <Flex>
                <Text color={'#DE6B1F'} mr='2'>$</Text>
                {/* 4.50 */}
                {props.price}
              </Flex>
            </Text>
            <Spacer />
            {/* ADD TO ORDER BUTTON */}
            {search ? (
              <>
                <ButtonGroup gap="2">
                  <Button variant='solid' colorScheme='orange' size={{ base: 'xs', md: 'md' }} boxShadow="dark-lg" onClick={() => {
                    let found = props.cart.findIndex((val) =>
                      val.uuid === props.uuid);
                    let temp = [...props.cart];
                    if (temp[found].total_quantity === 1) {
                      temp.splice(found, 1);
                    } else {
                      temp[found].total_quantity -= 1;
                    }
                    props.setCart(temp)
                  }}
                    disabled={disabled}>
                    <Text fontWeight='extrabold' pb="1">
                      -
                    </Text>
                  </Button>

                  <Button variant='solid' colorScheme='orange' size={{ base: 'xs', md: 'md' }} boxShadow="dark-lg" onClick={() => {
                    let found = props.cart.findIndex((val) =>
                      val.uuid === props.uuid
                    );
                    let temp = [...props.cart];
                    temp[found].total_quantity += 1;
                    props.setCart(temp);
                  }}>
                    <Text fontWeight='extrabold' pb="1" >
                      +
                    </Text>
                  </Button>
                </ButtonGroup>
              </>
            ) : (<Button variant='solid' colorScheme='orange' size={{ base: 'xs', md: 'md' }} boxShadow="dark-lg" onClick={() => {
              props.setCart([...props.cart,
              {
                id: props.id,
                name: props.name,
                total_quantity: 1,
                price: props.price,
                uuid: props.uuid,
                image: props.productimage
              }])
            }}>
              <Text fontWeight='extrabold'>
                +
              </Text>
            </Button>)}
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default Product;
