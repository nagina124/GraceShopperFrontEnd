import { useState } from "react";
import { getToken } from "../auth";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const AddProductModal = ({ products, setProducts }) => {
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [splash, setSplash] = useState("")
  const [productURL, setProductURL] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [inventory, setInventory] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function addProduct(event) {
    event.preventDefault();
    if (getToken()) {
      fetch("https://peaceful-spire-60083.herokuapp.com/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          title: title,
          imageURL: imageURL,
          splash: splash,
          productURL: productURL,
          category: category,
          description: description,
          price: price,
          inventory: inventory,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result) {
            const newProducts = [...products];
            newProducts.push(result);
            setProducts(newProducts);
          }
        })
        .catch(console.error);
    }
    event.target.reset();
  }
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Add Product
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product.</Modal.Title>
        </Modal.Header>

        <Form onSubmit={addProduct}>
          <Modal.Body>
            <Form.Group controlId="formBasicName">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicImageURL">
              <Form.Label>Image URL:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                onChange={(event) => {
                  setImageURL(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicSplash">
              <Form.Label>Splash:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter splash"
                onChange={(event) => {
                  setSplash(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicURL">
              <Form.Label>Single Game URL Route:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product url easy to read"
                onChange={(event) => {
                  setProductURL(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCategory">
              <Form.Label>Category:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                onChange={(event) => {
                  setCategory(event.target.value.toUpperCase());
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPrice">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                step="any"
                placeholder="Enter price"
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicInventory">
              <Form.Label>Inventory:</Form.Label>
              <Form.Control
                type="number"
                step="any"
                placeholder="Enter inventory"
                onChange={(event) => {
                  setInventory(event.target.value);
                }}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Add Product
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AddProductModal;
