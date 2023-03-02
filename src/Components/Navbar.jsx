import React from "react";
import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button, ButtonGroup,
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
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../Reducers/auth";
import Coffeecashierlogo from '../Assets/coffeecashierlogo.png';


export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.authReducer.username); // Mengambil data dari reducer
  console.log("Data username :", username);
  const roleId = useSelector((state) => state.authReducer.roleId);
  console.log("Data roleId :", roleId);

  const logoutBtn = () => {
    localStorage.removeItem('coffee_login');
    dispatch(logoutAction());
  }

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
            display={{ lg: 'none' }}
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
              display={{ base: 'none', lg: 'flex' }}>
              {
                username ?
                  (roleId == 1 ?
                    <Menu>
                      <Button color={'#DE6B1F'} variant='ghost' onClick={() => navigate('/landing')}>Product</Button>
                      <Button color={'#DE6B1F'} variant='ghost' onClick={() => navigate('/account')}>Account</Button>
                      <Button color={'#DE6B1F'} variant='ghost' onClick={() => navigate('/transaction')}>Transaction</Button>
                      <Button color={'#DE6B1F'} variant='ghost' onClick={() => navigate('/report')}>Sales Report</Button>
                      <Button color={'#DE6B1F'} variant='ghost' onClick={() => navigate('/inventory')}>Inventory</Button>
                      <Button color={'#DE6B1F'} variant='ghost' onClick={() => navigate('/category')}>Categories</Button>
                    </Menu>
                    :
                    <Menu>
                      <Button color={'#DE6B1F'} variant='ghost' onClick={() => navigate('/landing')}>Product</Button>
                      <Button color={'#DE6B1F'} variant='ghost' onClick={() => navigate('/account')}>Account</Button>
                      <Button color={'#DE6B1F'} variant='ghost' onClick={() => navigate('/transaction')}>Transaction</Button>
                    </Menu>)
                  :
                  null
              }
              {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            {
              username ?
                <Menu>
                  <MenuButton as={Button}>
                    <Text color='orange.500'>{username}</Text>
                  </MenuButton>
                  <MenuList>
                    <MenuItem type='button' onClick={() => { logoutBtn(); { navigate('/', { replace: true }) } }}>Logout</MenuItem>
                  </MenuList>
                </Menu>
                :
                <ButtonGroup>
                  <Button type='button' variant='solid' backgroundColor={"orange.500"} color="white" onClick={() => navigate('/')}>Login</Button>
                  {/* <Button type='button' variant='outline' color='orange.500' onClick={() => navigate('/register')}>Register</Button> */}
                </ButtonGroup>
            }
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {
                username ?
                  (roleId == 1 ?
                    <>
                      <Button color={'#DE6B1F'} variant='ghost' onClick={() => navigate('/landing')}>Product</Button>
                      <Button color={'#DE6B1F'} variant='ghost' onClick={() => navigate('/account')}>Account</Button>
                      <Button color={'#DE6B1F'} variant='ghost' onClick={() => navigate('/transaction')}>Transaction</Button>
                      <Button color={'#DE6B1F'} variant='ghost' onClick={() => navigate('/report')}>Sales Report</Button>
                      <Button color={'#DE6B1F'} variant='ghost' onClick={() => navigate('/inventory')}>Inventory</Button>
                      <Button color={'#DE6B1F'} variant='ghost' onClick={() => navigate('/category')}>Categories</Button>
                    </>
                    :
                    <>
                      <Button color={'#DE6B1F'} variant='ghost' onClick={() => navigate('/landing')}>Product</Button>
                      <Button color={'#DE6B1F'} variant='ghost' onClick={() => navigate('/account')}>Account</Button>
                      <Button color={'#DE6B1F'} variant='ghost' onClick={() => navigate('/transaction')}>Transaction</Button>
                    </>)
                  :
                  null
              }
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}


