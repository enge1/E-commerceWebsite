import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { BsCheck } from "react-icons/bs";
import { Link } from "@reach/router";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(false);
  const [theme] = useThemeHook();

  const style = {
    width: 500,
    lineHeight: 2,
    border: "2px solid #aaa",
    borderRadius: 4,
    paddingLeft: 15,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0 || price.length === 0) {
      setError(true);
    }
    else{
      var body = {"price":price, "prodName":name}
  const res =  fetch("https://localhost:44359/api/ProductInsertHead",{
    method: 'POST', 
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)}).then((res) =>
    res.json()        
  ).then((data)=>{          
    if(data[0].errorNumber == "0")  {
      alert("product added successfully"); 
    }else{
      alert("Failed to add product"); 
    }      
  });
    }
  };

  return (
    <Container className="py-4 mt-5">
      <h1
        className={`${
          theme ? "text-light" : "text-light-primary"
        } my-5 text-center`}
      >
        Add Product
      </h1>
      <form>

        <div
          className={`${
            theme ? "text-light" : "text-light-primary"
          } my-3 text-center`}
        >
          <input
            type="text"
            placeholder="Product's name"
            style={style}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <br />
          {error && name <= 0 ? (
            <label style={{ color: "red" }}>Product name is missing!</label>
          ) : (
            ""
          )}
        </div>

        <div
          className={`${
            theme ? "text-light" : "text-light-primary"
          } my-3 text-center`}
        >
          <input
            type="string"
            placeholder="Product's price"
            style={style}
            onChange={(e) => setPrice(e.target.value)}
          ></input>
          <br />
          {error && price <= 0 ? (
            <label style={{ color: "red" }}>Price is missing!</label>
          ) : (
            ""
          )}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link to="/">
            <Button variant="success" className="m-1" onClick={handleSubmit}>
              <BsCheck size="1.7rem" />
              Add Product
            </Button>
          </Link>
        </div>
      </form>
    </Container>
  );
}

export default AddProduct;
