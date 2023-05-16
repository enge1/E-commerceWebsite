import React from "react";
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { Link } from "@reach/router";
import  { useEffect, useState } from "react";

// const data = [
//   { ID: 0, email: "habiba258@gmail.com", age: 19, status: "Pending" },
//   { ID: 1, email: "gehad243@gmail.com", age: 19, status: "Active" },
//   { ID: 2, email: "fady549@gmail.com", age: 25, status: "Reported" },
// ];

function Users() {

  const [theme] = useThemeHook();
  const [data, setUsersData] = useState([]);
  async function deleteUser(id){
  var body = {"id":id}
  console.log(body)
  const res =  fetch("https://localhost:44359/api/DeleteUser",{
    method: 'POST', 
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)}).then((res) =>
    res.json()        
  ).then((data)=>{          
    if(data[0].errorNumber == "0"){
      alert("user removed successfully"); 
    }else{
      alert("No item to remove"); 
    }      
  });
 }
async function getResponse() {
    const res = await fetch("https://localhost:44359/api/UsersSelect", {
      method: "POST",
    }).then((res) => res.json());
    console.log(res);
    setUsersData(await res);
  }

  useEffect(() => {
    getResponse();
  }, []);
  return (
    <Container className="py-4 mt-5">
      <h1
        className={`${
          theme ? "text-light" : "text-light-primary"
        } my-5 text-center`}
      >
        {data===null ? "There are no users" : "Users"}
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
            <th
              style={{
                textAlign: "center",
              }}
            >
              ID
            </th>

            <th
              style={{
                textAlign: "center",
              }}
            >
              E-mail
            </th>
            <th
              style={{
                textAlign: "center",
              }}
            >
              Age
            </th>
            <th
              style={{
                textAlign: "center",
              }}
            >
              Status
            </th>
            <th
              style={{
                textAlign: "center",
              }}
            >
              Actions
            </th>
            {data.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.id}</td>
                  <td>
                    <h6
                      style={{
                        whiteSpace: "nowrap",
                        width: "14rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {val.email}
                    </h6>
                  </td>
                  <td>{val.age}</td>
                  <td>{val.status}</td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      variant="danger"
                      onClick={() => deleteUser(val.id)}
                      className="ms-2"
                    >
                      Remove user
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {data!=null && (
          <Row
            style={{ position: "fixed", bottom: "0" }}
            className={`${
              theme ? "bg-light-black text-light" : "bg-light text-black"
            } justify-content-center w-100`}
          >
            <Col className="py-2">
              <h4>Total users: {data.length}</h4>
            </Col>
            <Col className="p-0" md={1}>
              <Link to="/adduser">
                <Button className="m-1">Add User</Button>
              </Link>
            </Col>
          </Row>
        )}
      </Row>
    </Container>
  );
}

export default Users;
