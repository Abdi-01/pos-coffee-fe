import React from 'react';
import { Text,Button, Menu } from '@chakra-ui/react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

function Account() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const username = useSelector((state) => state.authReducer.username); // Mengambil data dari reducer
    console.log("Data username :", username);
    const roleId = useSelector((state) => state.authReducer.roleId);
    console.log("Data roleId :", roleId);

    return ( <div>
        <Text color='orange.500'>Account Page</Text>
        {
          username ?
          (roleId == 1 ?
          <Menu>
            <Button color={'#DE6B1F'} variant='ghost' onClick={() => navigate('/register')}>Register</Button>
          </Menu> 
          :
          null)
          :
          null
        }
    </div> );
}

export default Account