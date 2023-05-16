import React from "react";
import { Button, Card } from "react-bootstrap";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { useCart } from "react-use-cart";
import { BsCartPlus, BsTrash } from "react-icons/bs";

const ProductCard = (props) => {
  let { image, price, prodName , Id, totalItems} = props.data;
  const [theme] = useThemeHook();
  const { addItem } = useCart();

  const deleteProduct = () =>{
    var body = {"id":props.data.id}
    console.log(body)
    const res =  fetch("https://localhost:44359/api/DeleteProduct",{
      method: 'POST', 
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)}).then((res) =>
      res.json()        
    ).then((data)=>{          
      if(data[0].errorNumber == "Product Removed sucsessfuly"){
        alert("Product removed successfully"); 
      }else{
        alert("No item to remove"); 
      }      
    });
   }

  const addToCart = () => {

    var addItemRequest ={
      "id":props.data.id,"prodName": props.data.prodName
    }

    const res =  fetch("https://localhost:44359/api/AddProdToCart",{
      method: 'POST', 
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(addItemRequest)}).then((res) =>
      res.json()        
    ).then((data)=>{
      
      if(data[0].errorNumber == "1"){
        alert("You added this item before :), Please select anothe one");
      }else{
        addItem(props.data);
      }
    });
  };
  return (
    <Card
      style={{ width: "18rem", height: "auto" }}
      className={`${
        theme ? "bg-light-black text-light" : "bg-light text-black"
      }text-center p-0 overflow-hidden shadow mx-auto mb-4`}
    >
      <div
        style={{
          background: "white",
          height: "15rem",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "inherit",
        }}
      >
        <div style={{ width: "9rem" }}>
          <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/0/01/%D8%AA%D8%A7%D9%88%D9%86_%D8%AA%D9%8A%D9%85.jpg" className="img-fluid" />
        </div>
      </div>

      <Card.Body>
        <Card.Title
          style={{
            textOverFlow: "ellipsis",
            overFlow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
        {prodName}
        </Card.Title>
        <Card.Title>
          $ <span className="h5">{price}</span>
        </Card.Title>
        <Button
          onClick={() => addToCart()}
          className={`${
            theme ? "bg-dark-primary text-black" : "bg-light-primary"
          }d-flex align-item-center m-auto border-0`}
        >
          <BsCartPlus size="1.8rem" />
          Add To Cart
        </Button>
        <Button variant="danger" className="m-3" onClick={() => deleteProduct()}>
          <BsTrash size="1.4rem"></BsTrash>
        </Button>
      </Card.Body>
    </Card>
  );
};
export default ProductCard;
