import React from "react";
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import { useCart } from "react-use-cart";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { BsCartCheck, BsCheck } from "react-icons/bs";
import { Link } from "@reach/router";

const Cart = () => {
  const [theme] = useThemeHook();
  const {
    isEmpty,
    items,
    cartTotal,
    removeItem,
  } = useCart();
  const removeItemDataBase = (id) =>{

    var removeRequest = {"id":id}
    const res =  fetch("https://localhost:44359/api/RemoveProdFromCart",{
      method: 'POST', 
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(removeRequest)}).then((res) =>
      res.json()        
    ).then((data)=>{          
      if(data[0].errorNumber == "0"){
        alert("Item removed successfully"); 
      }else{
        alert("No item to remove"); 
      }      
    });
  }

  return (
    <Container className="py-4 mt-5">
      <h1
        className={`${
          theme ? "text-light" : "text-light-primary"
        } my-5 text-center`}
      >
        {isEmpty ? "your cart is Empty" : "your cart"}
      </h1>
      <Row className="justify-content-center">
        <Table
          responsive="sm"
          striped
          bordered
          hover
          variant={theme ? "dark" : "light"}
          className="mb-5"
        >
          <tbody>
            {items.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                      <div style={{ background: "white",
                        height: "8rem",
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",padding: "5rem" }}>
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/0/01/%D8%AA%D8%A7%D9%88%D9%86_%D8%AA%D9%8A%D9%85.jpg"
                          style={{ width: "4rem" }}
                          alt={item.prodName}
                        />
                      </div>
                  </td>
                  <td>
                    <h6
                      style={{
                        whiteSpace: "nowrap",
                        width: "14rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.prodName}
                    </h6>
                  </td>
                  <td>${item.price}</td>
                  <td>Quantity ({item.quantity})</td>
                  <td>                    
                    <Button
                      variant="danger"
                      onClick={() =>{
                         removeItemDataBase(item.id);
                         removeItem(item.id);
                        }}
                      className="ms-2"
                    >
                      Remove Item
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {!isEmpty && (
          <Row
            style={{ position: "fixed", bottom: "0" }}
            className={`${
              theme ? "bg-light-black text-light" : "bg-light text-black"
            } justify-content-center w-100`}
          >
            <Col className="py-2">
              <h4>Total Price: ${cartTotal}</h4>
            </Col>
            <Col className="p-0" md={4}>             
              <Link to="/">
                <Button className="m-1">
                  <BsCartCheck size="1.7rem" />
                  Continue Shopping
                </Button>
              </Link>
              <Link to="/address">
                <Button variant="success" className="m-1">
                  <BsCheck size="1.7rem" />
                  Go to Checkout
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="success" className="m-1">
                  <BsCheck size="1.7rem" />
                  Login
                </Button>
              </Link>
            </Col>
          </Row>
        )}
      </Row>
    </Container>
  );
};

export default Cart;
