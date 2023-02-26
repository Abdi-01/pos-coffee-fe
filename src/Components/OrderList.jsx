import React from 'react';
import {
  Avatar,
  Box,
  Text,
  HStack,
  Flex,
  IconButton,
  Spacer,
  LinkBox,
  LinkOverlay,
  Image
} from '@chakra-ui/react';
import {
  AiOutlineMessage,
  AiOutlineHeart,
  AiOutlineShareAlt,
  AiOutlineRetweet
} from 'react-icons/ai';
import { Link } from 'react-router-dom';

function OrderList(props) {

  return (
    <LinkBox w={'full'}>
      <HStack align="start" my="5">
      <Image
      src='https://images.unsplash.com/photo-1600056781444-55f3b64235e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80'
      alt='menu picture'
      borderRadius='xl' 
      objectFit='cover'
      w='20'
      h='14'
      mr='2'
    />
        <Box  maxW="xl" w='full'> 
          <Flex >
            <Text fontWeight="bold" color='white'> 
            Cappuccino
            </Text>
          </Flex>
          <Flex w='full'>
            <Text color='white' >
              2 x
            </Text>
            <Spacer />
            <Text color='orange.500'>
                $9.00
            </Text>
          </Flex>
        </Box>
      </HStack>
    </LinkBox>
  );
};

export default OrderList;
