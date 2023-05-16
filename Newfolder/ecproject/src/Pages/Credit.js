import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { Button, Container } from "react-bootstrap";
import { BsCheck } from "react-icons/bs";
import { Link } from "@reach/router";

function Credit() {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState("");
  const [theme] = useThemeHook();
  const [error, setError] = useState(false);

  const PStyle = {
    width: 500,
    lineHeight: 2,
    border: "2px solid #aaa",
    borderRadius: 4,
    paddingLeft: 15,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      number.length === 0 ||
      name.length === 0 ||
      cvc.length === 0 ||
      expiry.length === 0
    ) {
      setError(true);
    }
    else{ 
   
      var body = {
        "cardnumber":parseInt(number),
        "cardHolderName": name,
        "expityDate" : expiry,
        "cvc":cvc
      }
      console.log(body)
      const res =  fetch("https://localhost:44359/api/CardCredentialInsert",{
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)}).then((res) =>
        res.json()        
      ).then((data)=>{          
        if(data[0].errorNumber == "Entered succsessfuly"){
          alert("successfully"); 
        }else{
          alert(data[0]); 
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
        Enter your card credentials
      </h1>
      <Cards
        number={number}
        name={name}
        expiry={expiry}
        cvc={cvc}
        focused={focus}
      />
      <form onSubmit={handleSubmit}>
        <div
          className={`${
            theme ? "text-light" : "text-light-primary"
          } my-3 text-center`}
        >
          <input
            type="number"
            name="number"
            placeholder="Card Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            style={PStyle}
            onInput={(e) => {
              if (e.target.value.length > e.target.maxLength)
                e.target.value = e.target.value.slice(0, e.target.maxLength);
            }}
            maxlength={16}
          ></input><br/>
        {error && number.length <= 15 ? (
          <label style={{ color: "red", display:"inline-block",margin:"10px" }}>Card number is missing!</label>
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
            type="text"
            name="name"
            placeholder="Card Holder Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            style={PStyle}
          ></input><br/>
         {error && name.length <= 0 ? (
          <label style={{ color: "red", display:"inline-block",margin:"10px" }}>Card holder name is missing!</label>
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
            type="text"
            name="expiry"
            placeholder="MM/YY"
            onInput={(e) => {
              if (e.target.value.length > e.target.maxLength)
                e.target.value = e.target.value.slice(0, e.target.maxLength);
            }}
            maxlength={4}
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            style={PStyle}
          ></input><br/>
        {error && expiry.length <= 3 ? (
          <label style={{ color: "red", display:"inline-block",margin:"10px" }}>Expiry date is missing!</label>
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
            type="number"
            name="cvc"
            placeholder="CVC/CVV"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            style={PStyle}
            onInput={(e) => {
              if (e.target.value.length > e.target.maxLength)
                e.target.value = e.target.value.slice(0, e.target.maxLength);
            }}
            maxlength={3}
          ></input><br/>
        {error && cvc.length <= 2 ? (
          <label style={{ color: "red", display:"inline-block",margin:"10px" }}>CVC is missing!</label>
        ) : (
          ""
        )}  
        </div>
        
        <Link to="/order">
        <div style={{ textAlign: "center" }}>
          <Button variant="success" onClick={handleSubmit}>
            <BsCheck size="1.7rem" />
            Place Order
          </Button>
        </div>
        </Link>
      </form>
    </Container>
  );
}

export default Credit;
