import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login";
import Register from "./Pages/Register";
import NotFound from "./Pages/NotFound";
import Landing from "./Pages/Landing";
import { useDispatch } from "react-redux";
import React from "react";
import axios from "axios";
import { loginAction } from "./Reducers/auth";
import { API_URL } from "./helper";
import Transaction from "./Pages/Transaction";
import Account from "./Pages/Account";
import SalesReport from "./Pages/SalesReport";


function App() {
  const dispatch = useDispatch();

  const keepLogin = async () => {
    try {
      let token = localStorage.getItem('coffee_login');
      if (token) {
        let response = await axios.get(`${API_URL}/auth/keep_login`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("ini respon dari localstorage :", response.data);
        localStorage.setItem('coffee_login', response.data.token)
        dispatch(loginAction(response.data));

      }
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    keepLogin();
  }, []);

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/landing" element={<Landing/>}/>
        <Route path="/transaction" element={<Transaction/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/report" element={<SalesReport/>}/>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
