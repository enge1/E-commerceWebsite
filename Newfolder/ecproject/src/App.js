//import logo from './logo.svg';
//import './App.css';
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useThemeHook } from "./GlobalComponents/ThemeProvider";
import Header from "./components/Header";
import { Router } from "@reach/router";

//PAGES
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Address from "./Pages/Address";
import Order from "./Pages/Order";
import Credit from "./Pages/Credit";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Users from "./Pages/Users";
import AddProduct from "./Pages/AddProduct";
import AddUser from "./Pages/AddUser";

function App() {
  const [theme] = useThemeHook();
  return (
    <main
      className={theme ? "bg-black" : "bg-light-2"}
      style={{ height: "100vh", overflowY: "auto" }}
    >
      <Header />
      <Router>
        <Home path="/" />
        <Cart path="/cart" />
        <Address path="/address" />
        <Order path="/order" />
        <Credit path="/credit" />
        <Login path="/login" />
        <Register path="register" />
        <Users path="/users"/>
        <AddProduct path="/addproduct"/>
        <AddUser path="/adduser"/>
      </Router>
    </main>
  );
}

export default App;
