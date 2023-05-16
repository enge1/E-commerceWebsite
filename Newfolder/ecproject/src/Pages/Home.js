import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { BiSearch } from "react-icons/bi";
import SearchFilter from "react-filter-search";
import ProductCard from "../components/ProductCard";
import { Link } from "@reach/router";

const Home = () => {
  const [theme] = useThemeHook();
  const [searchInput, setSearchInput] = useState("");
  const [productData, setProductData] = useState([]);

  async function getResponse() {
    const res = await fetch("https://localhost:44359/api/ProductsSelect", {
      method: "GET",
    }).then((res) => res.json());
    console.log(res);
    setProductData(await res);
  }

  useEffect(() => {
    getResponse();
  }, []);

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={10} md={7} lg={6} xl={4} className="mb-3 mx-auto text-center">
          <h1
            className={`${
              theme ? "text-light" : "text-light-primary"
            } my-5 text-center`}
          >
            Search Products
          </h1>
          <InputGroup className="mb-3">
            <InputGroup.Text
              className={
                theme
                  ? "bg-black text-dark-primary"
                  : "bg-light text-light-primary"
              }
            >
              <BiSearch size="2rem" />
            </InputGroup.Text>
            <FormControl
              placeholder="search your products"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className={
                theme ? "bg-light-black text-light" : "bg-light text-black"
              }
            />
          </InputGroup>
          <div style={{ textAlign: "center" }}>
            <Link to="/addproduct">
            <Button variant="success" className="justify-content-center">
              <h6>Add Product</h6>
            </Button>
            </Link>
          </div>
        </Col>
        <SearchFilter
          value={searchInput}
          data={productData}
          renderResults={(results) => (
            <Row className="justify-content-center">
              {results.map((item, i) => (
                <ProductCard data={item} key={i} />
              ))}
            </Row>
          )}
        />
      </Row>
    </Container>
  );
};

export default Home;
