import React from "react";
import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Text,
  Stack,
  Image
} from '@chakra-ui/react';
// import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { RxHamburgerMenu } from "react-icons/rx";
import { CgClose } from "react-icons/cg";
import Coffeecashierlogo from '../Assets/coffeecashierlogo.png';


export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bgColor='gray.900' px={{ base: '6', md: '4' }}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
          bgColor={'gray.900'}
          color='white'
            size={'md'}
            icon={isOpen ? <CgClose /> : < RxHamburgerMenu />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={2} alignItems={'center'}>
            <Box>
              <Image src={Coffeecashierlogo} boxSize='40px' alt="coffeecashier_logo" />
            </Box>
            <Text fontWeight='bold' fontSize='2xl' color='white' className='test' pr='8' display={{ base: 'none', md: 'flex' }}>
              COFFEE SHOP
            </Text>

            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              <Text color='white' >Home</Text>
              <Text color='white' >Product</Text>
              <Text color='white' >Account</Text>
              <Text color='white' >Transaction</Text>
              {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Logout</MenuItem>

              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <Text color='white'>Home</Text>
              <Text color='white'>Product</Text>
              <Text color='white'>Account</Text>
              <Text color='white'>Transaction</Text>
              {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}


