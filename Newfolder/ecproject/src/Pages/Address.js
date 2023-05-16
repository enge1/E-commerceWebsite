import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { BsCartCheck, BsCheck } from "react-icons/bs";
import { Link } from "@reach/router";

function Address() {
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [streetName, setStreetName] = useState("");
  const [buildingNumber, setBuildingNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [landmark,setLandmark] = useState("");
  const [theme] = useThemeHook();
  const [error, setError] = useState(false);
  const style = {
    width: 500,
    lineHeight: 2,
    border: "2px solid #aaa",
    borderRadius: 4,
    paddingLeft: 15,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      region.length === 0 ||
      city.length === 0 ||
      streetName.length === 0 ||
      buildingNumber.length === 0 ||
      floor.length === 0 ||
      zipCode === 0
    ) {
      setError(true);
    }
    else{ 
   
      var body = {
        "region":region,
        "city": city,
        "streetName" : streetName,
        "buildingNumber":parseInt(buildingNumber),
        "floor":parseInt(floor),
        "landmark": landmark,
        "zipCode": parseInt(zipCode)
      }
      const res =  fetch("https://localhost:44359/api/AddressInsert",{
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)}).then((res) =>
        res.json()        
      ).then((data)=>{          
        if(data[0].errorMessage == null){
          alert("Registered successfully"); 
        }else{
          alert("failed",data[0]); 
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
        Enter your Address
      </h1>
      <form onSubmit={handleSubmit}>
        <div
          className={`${
            theme ? "text-light" : "text-light-primary"
          } my-3 text-center`}
        >
          <input
            type="text"
            placeholder="Region - Governate"
            style={style}
            onChange={(e) => setRegion(e.target.value)}
          ></input>
          <br />
          {error && region <= 0 ? (
            <label style={{ color: "red" }}>Region is missing!</label>
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
            placeholder="City"
            style={style}
            onChange={(e) => setCity(e.target.value)}
          ></input>
          <br />
          {error && city <= 0 ? (
            <label style={{ color: "red" }}>City is missing!</label>
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
            placeholder="Street Name"
            style={style}
            onChange={(e) => setStreetName(e.target.value)}
          ></input>
          <br />
          {error && streetName <= 0 ? (
            <label style={{ color: "red" }}>Street name is missing!</label>
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
            placeholder="Building Number"
            style={style}
            onChange={(e) => setBuildingNumber(e.target.value)}
          ></input>
          <br />
          {error && buildingNumber <= 0 ? (
            <label style={{ color: "red" }}>Building number is missing!</label>
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
            placeholder="Floor"
            style={style}
            onChange={(e) => setFloor(e.target.value)}
          ></input>
          <br />
          {error && floor <= 0 ? (
            <label style={{ color: "red" }}>Floor is missing!</label>
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
            placeholder="Landmark (optional)"
            style={style}
            onChange={(e) => setLandmark(e.target.value)}
          ></input>
        </div>
        <div
          className={`${
            theme ? "text-light" : "text-light-primary"
          } my-3 text-center`}
        >
          <input
            type="text"
            placeholder="Zip Code"
            style={style}
            onChange={(e) => setZipCode(e.target.value)}
          ></input>
          <br />
          {error && zipCode <= 0 ? (
            <label style={{ color: "red" }}>Zip code is missing!</label>
          ) : (
            ""
          )}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link to="/">
            <Button className="m-1">
              <BsCartCheck size="1.7rem" />
              Continue Shopping
            </Button>
          </Link>
          <Link to="/credit">
          <Button variant="success" className="m-1" onClick={handleSubmit}>
            <BsCheck size="1.7rem" />
            Proceed Checkout
          </Button>
          </Link>
        </div>
      </form>
    </Container>
  );
}

export default Address;
