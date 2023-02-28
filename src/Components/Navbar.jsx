import React from "react";
import { Button, ButtonGroup, Container, Flex, Text, Menu, MenuButton, MenuItem, MenuList, Image, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../Reducers/auth";
import coffeecashierlogo from '../Assets/coffeecashierlogo.png';

function Navbar() {
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

  return <Container backgroundColor={"black"} boxShadow='md' maxW='full'>
  <Flex py='2.5' alignItems='center' justifyContent='space-between'>
    <Flex gap='2'>
      <Image src={coffeecashierlogo} boxSize='40px' alt='Coffee icon' />
      <Text fontWeight='bold' fontSize='2xl' color={'#DE6B1F'}> <span>COFFEE SHOP</span></Text>
    </Flex>
    {
      username ?
      (roleId == 1 ?
      <Menu>
        <Button color={'#DE6B1F'} variant='ghost' onClick={() => navigate('/landing')}>Product</Button>
        <Button color={'#DE6B1F'} variant='ghost' onClick={() => navigate('/account')}>Account</Button>
        <Button color={'#DE6B1F'} variant='ghost' onClick={() => navigate('/transaction')}>Transaction</Button>
        <Button color={'#DE6B1F'} variant='ghost' onClick={() => navigate('/report')}>Sales Report</Button>
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
    {
      username ?
      <Menu>
        <MenuButton as={Button}>
          <Text color='orange.500'>{username}</Text>
        </MenuButton>
        <MenuList>
          <MenuItem type='button' onClick={() => {logoutBtn(); {navigate('/', { replace:true})}}}>Logout</MenuItem>
        </MenuList>
      </Menu>
      :
      <ButtonGroup>
            <Button type='button' variant='solid' backgroundColor={"orange.500"} color="white" onClick={() => navigate('/')}>Login</Button>
            {/* <Button type='button' variant='outline' color='orange.500' onClick={() => navigate('/register')}>Register</Button> */}
      </ButtonGroup>
    }
  </Flex>
</Container>
}

export default Navbar;
