import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router";
import { useState, useEffect } from "react";
const API = "https://peaceful-spire-60083.herokuapp.com/api";

const ShoppingCartModal = ({ userId, orders, setOrders }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const tax = 1.10;
  let subtotal = 0;
  console.log(orders);


  const deleteOrder = (orderId) => {
    fetch(
      `https://peaceful-spire-60083.herokuapp.com/api/orders/${orderId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result) {
          const updatedOrders = orders.filter(
            (order) => order.id !== orderId
          );
          setOrders(updatedOrders);
        }
      })
      .catch(console.error);
  }




  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Shopping Cart
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Here's the items in your cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="cart">
            {orders
              ? orders.map((order, index) => {
                  subtotal =
                    Math.round((subtotal + order.productPrice) * 100) / 100;
                  return (
                    <div key={index}>
                      <img
                        src={order.imageURL}
                        width="50"
                        height="50"
                        className="game-icon"
                      />
                      <h5>{order.productTitle}</h5>
                      <h5>${order.productPrice}</h5>
                      <Button
                        variant="danger"
                        onClick={() => deleteOrder(order.id)}
                      >
                        Remove Item
                      </Button>
                    </div>
                  );
                })
              : "There's no items in your cart"}
          </div>
          <h6>Subtotal: {subtotal}</h6>
          <h6>Tax: 10%</h6>
          <h6>Total: {Math.round(subtotal * tax * 100) / 100}</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShoppingCartModal;