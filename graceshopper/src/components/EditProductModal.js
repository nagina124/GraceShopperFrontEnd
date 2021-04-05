import { useState } from "react";
import { getToken } from "../auth";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const EditProductModal = ({
  productId,
  productTitle,
  productImageURL,
  productSplash,
  productURL,
  productCategory,
  productDescription,
  productPrice,
  productInventory,
  products,
  setProducts,
}) => {
  const [title, setTitle] = useState(productTitle);
  const [imageURL, setImageURL] = useState(productImageURL);
  const [splash, setSplash] = useState(productSplash);
  const [productUrl, setProductUrl] = useState(productURL);
  const [category, setCategory] = useState(productCategory);
  const [description, setDescription] = useState(productDescription);
  const [price, setPrice] = useState(productPrice);
  const [inventory, setInventory] = useState(productInventory);
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
            imageURL: imageURL,
            splash: splash,
            productURL: productUrl,
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
                return product;
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
                type="text"
                placeholder={productTitle}
                onChange={(event) => {
                  if (event.target.value !== null) {
                    setTitle(event.target.value);
                  } else {
                    return productTitle;
                  }
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicImageURL">
              <Form.Label>Image URL:</Form.Label>
              <Form.Control
                type="text"
                placeholder={productImageURL}
                onChange={(event) => {
                  if (event.target.value !== null) {
                    setImageURL(event.target.value);
                  } else {
                    return productImageURL;
                  }
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicSplash">
              <Form.Label>Splash:</Form.Label>
              <Form.Control
                type="text"
                placeholder={productSplash}
                onChange={(event) => {
                  if (event.target.value !== null) {
                    setSplash(event.target.value);
                  } else {
                    return productSplash;
                  }
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicURL">
              <Form.Label>Single Game URL Route:</Form.Label>
              <Form.Control
                type="text"
                placeholder={productURL}
                onChange={(event) => {
                  if (event.target.value !== null) {
                    setProductUrl(event.target.value);
                  } else {
                    return productUrl;
                  }
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCategory">
              <Form.Label>Category:</Form.Label>
              <Form.Control
                type="text"
                placeholder={productCategory}
                onChange={(event) => {
                  if (event.target.value !== null) {
                    setCategory(event.target.value);
                  } else {
                    return productCategory;
                  }
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                placeholder={productDescription}
                onChange={(event) => {
                  if (event.target.value !== null) {
                    setDescription(event.target.value);
                  } else {
                    return productDescription;
                  }
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPrice">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder={productPrice}
                onChange={(event) => {
                  if (event.target.value !== null) {
                    setPrice(event.target.value);
                  } else {
                    return productPrice;
                  }
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicInventory">
              <Form.Label>Inventory:</Form.Label>
              <Form.Control
                type="number"
                step="any"
                placeholder={productInventory}
                onChange={(event) => {
                  if (event.target.value !== null) {
                    setInventory(event.target.value);
                  } else {
                    return productInventory;
                  }
                }}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Edit Product
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default EditProductModal;
