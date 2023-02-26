import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import Landing from "./Pages/Landing";
// import Product from "./Components/Product";
import { Route, Routes } from 'react-router-dom';
import Transaction from "./Pages/Transaction";



function App() {
  return (
    <div>
      <Navbar />
      <Routes>
      <Route path='/landing' element={<Landing />} />
      <Route path='/transaction' element={<Transaction />} />
      </Routes>
      {/* <Product /> */}
    </div>
  );
}

export default App;
