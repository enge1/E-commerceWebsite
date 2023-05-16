import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { BsCheck } from "react-icons/bs";
import { Link } from "@reach/router";

function AddUser() {
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [status, setStatus] = useState("");
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
    if (email.length === 0 || age.length === 0 || status.length === 0) {
      setError(true);
    }
    else{ 
   
      var body = {
        "email":email,
        "age": parseInt(age),
        "status" : status
      }
      const res =  fetch("https://localhost:44359/api/AddUser",{
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)}).then((res) =>
        res.json()        
      ).then((data)=>{          
        if(data[0].errorNumber == "User Added"){
          alert("User added successfully"); 
        }else{
          alert("failed"); 
        }      
      });
     }
    console.log(email, age, status);
  };

  return (
    <Container className="py-4 mt-5">
      <h1
        className={`${
          theme ? "text-light" : "text-light-primary"
        } my-5 text-center`}
      >
        Add User
      </h1>
      <form>
        <div
          className={`${
            theme ? "text-light" : "text-light-primary"
          } my-3 text-center`}
        >
          <input
            type="email"
            placeholder="Please enter the E-mail"
            style={style}
            onChange={(e) => setEmail(e.target.value)}
          ></input><br/>
          {error && email <= 0 ? (
          <label style={{ color: "red" }}>E-mail is missing!</label>
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
            placeholder="Age"
            style={style}
            onInput={(e) => {
                if (e.target.value.length > e.target.maxLength)
                  e.target.value = e.target.value.slice(0, e.target.maxLength);
              }}
              maxlength={3}
            onChange={(e) => setAge(e.target.value)}
          ></input><br/>
          {error && age <= 0 ? (
          <label style={{ color: "red" }}>Age is missing!</label>
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
            placeholder="Status"
            style={style}
            onChange={(e) => setStatus(e.target.value)}
          ></input><br/>
          {error && status <= 0 ? (
          <label style={{ color: "red" }}>status is missing!</label>
        ) : (
          ""
        )}
        </div>
        <div style={{ textAlign: "center" }}>
          <Link to="/">
          <Button variant="success" className="m-1" onClick={handleSubmit}>
            <BsCheck size="1.7rem" />
            Add User
          </Button>
          </Link>
        </div>
      </form>
    </Container>
  );
}

export default AddUser;
