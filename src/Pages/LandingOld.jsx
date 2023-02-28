import React from 'react';
import { Container, Flex, Text, Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import Sidenav from '../Components/Sidenav';
import Register from './Register';
import Transaction from './TransactionOld';

function Landing() {
    const username = useSelector((state) => state.authReducer.username);
    const roleId = useSelector((state) => state.authReducer.roleId);
    console.log("User name dari redux", useSelector((state) => state.authReducer))



    return (<Container maxW={'6xl'}>
        {roleId == 1 ? 
        (
        <Flex>
            <Box maxW={'100vh'}>
                < Sidenav />
            </Box>
            <Box maxW={'100vh'}>
                <Register/>
            </Box>
        </Flex>
        ) :
        (
            <Transaction/>
        )
    }

    </Container>
    );
}

export default Landing;