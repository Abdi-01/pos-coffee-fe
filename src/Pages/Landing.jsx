import React from 'react';
import { Box, Heading, Text, Button, Flex, Image, Container, ButtonGroup, Icon } from '@chakra-ui/react';
import Product from '../Components/Product';
import { SearchBar } from '../Components/SearchBar';
import { FiFilter } from 'react-icons/fi';
import axios from "axios";


const Landing = (props) => {
    const [showProducts, setShowProducts] = React.useState([]);
    const getAllProducts = async () => {
        try {
            let token = localStorage.getItem("coffee_login"); //td token is not defined krn ini 
            let response = await axios.post('http://localhost:2000/products/', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            //cara tau ada yg login ato engga dr localstorage
            console.log("ini response.data dari getAllProducts 🪶 : ", response.data);
            setShowProducts(response.data);
        } catch (error) {
            console.log("dari getAllProducts : ", error);
        }
    };

    //2. kita jalanin fungsi nya 
    React.useEffect(() => {
        getAllProducts();
    }, []);

    //3. print list of products
    const printAllProducts = () => {
        let print = showProducts.map((val, idx) => {
            console.log("ini val : ", val);
            return < Product name={val.name} productimage={val.product_image} price={val.price} />
        });
        return print;
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={'black'}
        >
            {/* LEFT CONTENT */}
            <Box flex={{ base: 'none', lg: '1' }}>
            </Box>
            {/* MIDDLE CONTENT */}
            <Box paddingTop='4' pb='8'
                flex='4'
            >
                <Text fontSize='4xl' fontWeight='bold' color='white' p={{ base: '8', lg: '4' }}>
                    Find the best
                    <Text fontSize='4xl' fontWeight='bold' color='white' pb={{ base: '-10', lg: '10' }} pt='-5'>coffee for you</Text>
                </Text>
                <Flex p={{ base: '4', lg: '2' }} >
                    <Flex pl={{ base: '6', lg: '2' }}>
                        <SearchBar />
                    </Flex>
                    <Button bgColor={'transparent'} fontSize={30} variant='outline'>
                        <Icon as={FiFilter} color='white' />
                    </Button>
                </Flex>
                <Flex pb='5' pl={{ base: '6', lg: '2' }}>
                    <ButtonGroup>
                        <Button bgColor={"black"} color='white'>
                            Coffee
                        </Button>
                        <Button bgColor={"black"} color='white'>
                            Croissant
                        </Button>
                        <Button bgColor={"black"} color='white'>
                            Ice Cream
                        </Button>
                    </ButtonGroup>
                </Flex>
                <Flex maxW='6xs' flexWrap='wrap' justifyContent='space-evenly' alignItem='start'>
                    {printAllProducts()}
                </Flex>
            </Box>
            {/* RIGHT CONTENT */}
            <Box flex={{ base: 'none', lg: '1' }}>
            </Box>
        </Flex>
    )
};

export default Landing;
