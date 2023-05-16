import React from "react";
import { Container } from "react-bootstrap";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { Button } from "react-bootstrap";
import { Link } from "@reach/router";

function Payment() {
  const [theme] = useThemeHook();

  return (
    <Container className="py-4 mt-5">
      <h1
        className={`${
          theme ? "text-light" : "text-light-primary"
        } my-5 text-center`}
      >
        Your Order is placed Successfully!
      </h1>
      <div style={{ textAlign: "center" }}>
        <Link to="/">
          <Button className="m-1">
            Back to Home
          </Button>
        </Link>
      </div>
    </Container>
  );
}

export default Payment;
