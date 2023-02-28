import React from 'react';
import { Box, Button, Container, Flex, FormControl, FormLabel, Input, InputGroup, InputRightAddon, Text, Image } from '@chakra-ui/react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function Register() {
    const [visible, setVisible] = React.useState('password');

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleVisible = () => {
        if (visible == 'password') {
            setVisible('text');
        } else {
            setVisible('password');
        }
    }

    return <Flex minH={'100vh'} justify={'center'} bg={'black'}>
    <Flex mx="auto" mt='0px' maxH='lg' maxWidth={'3xl'} >
        <Box w="60%">
            <Image borderLeftRadius='2xl' w='full' h="full" src='https://images.unsplash.com/photo-1515033669541-edd518741ca2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' alt='Coffee' />
        </Box>
        <Box px='8' py='4' backgroundColor={"gray.900"} borderRightRadius='3xl' w="40%">
            <Text  fontSize='4xl' fontWeight='bold' color={'white'}>Welcome to Coffee Shop</Text>
            <FormControl my='5'>
                <FormLabel color={'white'}>Username</FormLabel>
                <Input backgroundColor={'white'} type='text' onChange={(e) => setUsername(e.target.value)} />
            </FormControl>
            <FormControl my='5'>
                <FormLabel color={'white'}>Password</FormLabel>
                <InputGroup>
                    <Input backgroundColor={'white'} type={visible} onChange={(e) => setPassword(e.target.value)} />
                    <InputRightAddon onClick={handleVisible}>
                        {
                            visible == 'password' ?
                            <AiFillEye/>
                            :
                            <AiFillEyeInvisible/>
                        }
                    </InputRightAddon>
                </InputGroup>
                <FormLabel mt='5' color={'white'}>Confirmation Password</FormLabel>
                <InputGroup>
                    <Input backgroundColor={'white'} type={visible} onChange={(e) => setPassword(e.target.value)} />
                    <InputRightAddon onClick={handleVisible}>
                        {
                            visible == 'password' ?
                            <AiFillEye/>
                            :
                            <AiFillEyeInvisible/>
                        }
                    </InputRightAddon>
                </InputGroup>
            </FormControl>
            <Button my='4' width='full' type='button' backgroundColor={"orange.500"} color="white">
                Register
            </Button>
        </Box>
    </Flex>
</Flex>;
}

export default Register;