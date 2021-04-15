import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router";
import { useState, useEffect } from "react";
import {getProductForGuests} from '../auth'
const API = "https://peaceful-spire-60083.herokuapp.com/api";

const ShoppingCartModal = ({
  userId,
  orders,
  setOrders,
  guestOrder,
  setGuestOrder,
  // cart,
  // setCart
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const tax = 1.1;
  let subtotal = 0;
  console.log(orders);
  console.log(guestOrder);

  const deleteOrder = (orderId) => {
    fetch(`https://peaceful-spire-60083.herokuapp.com/api/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result) {
          const updatedOrders = orders.filter((order) => order.id !== orderId);
          setOrders(updatedOrders);
        }
      })
      .catch(console.error);
  };

  const removeProductFromGuestCart = (productId) => {
    let storageProducts = guestOrder;
    let products = storageProducts.filter(
      (product) => product.productId !== productId
    );
    localStorage.setItem("products", JSON.stringify(products));
    setGuestOrder(products);
  }

  const cart = () => {
    if (orders.length) {
      return orders.map((order, index) => {
        subtotal = Math.round((subtotal + order.productPrice) * 100) / 100;
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
            <Button variant="danger" onClick={() => deleteOrder(order.id)}>
              Remove Item
            </Button>
          </div>
        );
      });
    } else if (guestOrder.length) {
      return guestOrder.map((order, index) => {
        subtotal = Math.round((subtotal + order.productPrice) * 100) / 100;
        return (
          <div key={index}>
            <img
              src={order.productImageURL}
              width="50"
              height="50"
              className="game-icon"
            />
            <h5>{order.productTitle}</h5>
            <h5>${order.productPrice}</h5>
            <Button
              variant="danger"
              onClick={() => removeProductFromGuestCart(order.productId)}
            >
              Remove Item
            </Button>
          </div>
        );
      });
    }
    return <h3>There's no items in your cart</h3>
  }

  return (
    <>
      <img
      onClick={handleShow} 
      src="https://www.pinclipart.com/picdir/big/330-3306967_1600-x-1600-13-shopping-cart-icon-clipart.png"
      width= "50px"
      height="50px"
      // style={{backgroundColor: linear-gradient(to right, #3dd0d8 0%, rgba(146, 82, 234, 0.64) 100%)}}
      />

      <Modal show={show} onHide={handleClose} bg="dark" className="special_modal">
        <Modal.Header closeButton>
          <Modal.Title>Here's the items in your cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="cart">
            {cart()}
            {/* {!userId ? guestShoppingCart() : "There's no items in your cart"} */}
          </div>
          <h6>Subtotal: {subtotal}</h6>
          <h6>Tax: 10%</h6>
          <h6>Total: {Math.round(subtotal * tax * 100) / 100}</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Checkout</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShoppingCartModal;