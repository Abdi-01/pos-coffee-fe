import React, { useEffect } from 'react';
import {
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

export const SearchBar = (props) => {
  const[searchInput, setSearchInput] = React.useState("");

  return (
<Stack spacing={4}>
  <InputGroup>
  <Input type='search' variant='filled' placeholder='Find your Coffee' bgColor='gray.900' 
  // w={{base:400}}
  onChange={(e)=> props.setProductName(e.target.value)}   
  // ml='10'
  color='white'
   />
    <Button 
      pointerEvents='visible'
      leftIcon={<FiSearch color='white' />}
      as={Button}
      onClick={()=>{
        props.setPage(0)
        props.getAllProducts()}}   
      size='20'
      variant='outline'
      bgColor='black'
      color='white'
      _active={{ bg: 'black', color:'white' }}
      
    > Search </Button>
  </InputGroup>
</Stack>
  );
};
