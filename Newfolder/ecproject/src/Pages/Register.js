import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { BsCheck } from "react-icons/bs";
import { Link } from "@reach/router";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
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
    if (email.length === 0 || password.length === 0) {
      setError(true);
    }
   else{ 
   
    var body = {
      "email":email,
      "password": password,
      "confirmPass" : checkPassword
    }
    const res =  fetch("https://localhost:44359/api/Register",{
      method: 'POST', 
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)}).then((res) =>
      res.json()        
    ).then((data)=>{          
      if(data[0].errorNumber == "0"){
        alert("Registered successfully"); 
      }else{
        alert("Failed to register"); 
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
        Register
      </h1>
      <form>
        <div
          className={`${
            theme ? "text-light" : "text-light-primary"
          } my-3 text-center`}
        >
          <input
            type="email"
            placeholder="E-mail"
            style={style}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <br />
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
            type="password"
            placeholder="Password"
            style={style}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br />
          {error && password <= 0 ? (
            <label style={{ color: "red" }}>Password is missing!</label>
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
            type="password"
            placeholder="Re-enter Password"
            style={style}
            onChange={(e) => setCheckPassword(e.target.value)}
          ></input>
          <br />
          {password === checkPassword ? (
            ""
          ) : (
            <label style={{ color: "red" }}>Passwords don't match</label>
          )}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link to="/">
            <Button variant="success" className="m-1" onClick={handleSubmit}>
              <BsCheck size="1.7rem" />
              Register
            </Button>
          </Link>
        </div>
      </form>
    </Container>
  );
}

export default Register;
