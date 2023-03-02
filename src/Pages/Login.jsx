import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  Image,
} from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { API_URL } from "../helper";
import { useDispatch } from "react-redux";
import { loginAction } from "../Reducers/auth";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState("password");

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleVisible = () => {
    if (visible == "password") {
      setVisible("text");
    } else {
      setVisible("password");
    }
  };

  const onBtnLogin = async () => {
    try {
      if (username == "" || password == "") {
        alert("Fill in all form");
      } else {
        let response = await axios.post(`${API_URL}/auth/`, {
          username: username,
          password: password,
        });

        if (response.data.length == 0) {
          alert("Account not found");
        } else {
          alert("Login Success");
          // Menyimpan data ke localstorage browser untuk keepLogin
          localStorage.setItem("coffee_login", response.data.token);
          // Lanjut simpan response.data ke reducer
          dispatch(loginAction(response.data));
          navigate("/landing", { replace: true });
        }
      }
    } catch (error) {
      console.log("Error :", error);
      alert(error.response.data.message);
    }
  };

  return (
    <Flex minH={"100vh"} justify={"center"} bg={"black"}>
      <Flex mx="auto" mt="0px" maxWidth={"3xl"} maxH="85vh">
        <Box w="60%">
          <Image
            borderLeftRadius="3xl"
            objectFit="cover"
            w="full"
            h={"100%"}
            src="https://images.unsplash.com/photo-1606791405792-1004f1718d0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            alt="Coffee"
          />
        </Box>
        <Box
          px="8"
          py="4"
          backgroundColor={"gray.900"}
          borderRightRadius="3xl"
          w="40%"
        >
          <Text fontSize="4xl" fontWeight="bold" color={"white"}>
            Sign in
          </Text>
          <FormControl my="5">
            <FormLabel color={"white"}>Username</FormLabel>
            <Input
              backgroundColor={"white"}
              type="email"
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl my="5">
            <FormLabel color={"white"}>Password</FormLabel>
            <InputGroup>
              <Input
                backgroundColor={"white"}
                type={visible}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightAddon onClick={handleVisible}>
                {visible == "password" ? <AiFillEye /> : <AiFillEyeInvisible />}
              </InputRightAddon>
            </InputGroup>
            {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
          </FormControl>
          <div style={{ textAlign: "right" }}>
            <Button type="button" ml="1.5" variant="link" color={"white"}>
              Forgot password ?
            </Button>
          </div>
          <Button
            onClick={onBtnLogin}
            my="4"
            width="full"
            type="button"
            backgroundColor={"orange.500"}
            color="white"
          >
            Login
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}

export default LoginPage;
