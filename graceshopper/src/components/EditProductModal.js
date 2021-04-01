import { useState } from "react";
import { getToken } from "../auth";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const EditProductModal = ({
  productId,
  products,
  setProducts,
  title,
  setTitle,
  category,
  setCategory,
  description,
  setDescription,
  price,
  setPrice,
  inventory,
  setInventory,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function editProduct(event) {
    event.preventDefault();
    if (getToken()) {
      fetch(
        `https://peaceful-spire-60083.herokuapp.com/api/products/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            title: title,
            category: category,
            description: description,
            price: price,
            inventory: inventory,
          }),
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result) {
            const newProducts = products.map((product) => {
              if (product.id === productId) {
                return result;
              } else {
                return products;
              }
            });
            setProducts(newProducts);
          }
        })
        .catch(console.error);
    }
    event.target.reset();
  }
  return (
    <div>
      <Button variant="warning" onClick={handleShow}>
        Edit Product
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product.</Modal.Title>
        </Modal.Header>

        <Form onSubmit={editProduct}>
          <Modal.Body>
            <Form.Group controlId="formBasicName">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                placeholder={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCategory">
              <Form.Label>Category:</Form.Label>
              <Form.Control
                placeholder={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                placeholder={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPrice">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                placeholder={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicInventory">
              <Form.Label>Inventory:</Form.Label>
              <Form.Control
                placeholder={inventory}
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
            <Button variant="primary" type="submit">
              Edit Product
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default EditProductModal;
