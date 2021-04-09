import "./Checkout.css"
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from "react";
import {getProductForGuests} from '../auth'
const API = "https://peaceful-spire-60083.herokuapp.com/api/orders";

const Checkout = ({userId, orders, setOrders}) => {
    const [ orderConfirmed, setOrderConfirmed ] = useState(false)
    const [count, setCount] = useState()

    const getOrders = () => {
        fetch(`${API}/${userId}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setOrders(data);
        })
        .catch(console.error);
    };


    const updateOrderStatus = () => {
        orders.forEach((order) => {
            fetch(`https://peaceful-spire-60083.herokuapp.com/api/orders/${order.id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  orderStatus: 'pending',
                }),
              })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // setOrders(data);
                setOrderConfirmed(true);
            })
            .catch(console.error);
        })
    }

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

    // const userOrder = orders.filter((order) => {
    //     if(order.userId == userId){
    //         return order
    //     }
    // })

    // console.log(userOrder)

    useEffect(() => {
        if(userId){
            getOrders();
        } else {
            getProductForGuests()
        }
    }, []);


    return (
        <>
        <div className="orderCheckout">
            <h1> Secure Checkout </h1>
            <p> We hope you enjoy your purchase ^_^ </p>
        </div>
        
        <section className = "left">
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Game Name</th>
                    <th>Price</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                {orders.map((order, index) => {
                    return (
                        <tbody key={index}>
                            <tr>
                                <td>{order.count}</td>
                                <td>{order.productTitle}</td>
                                <td>{order.productPrice}</td>
                                <td> 
                                    <Button
                                        variant="danger"
                                        onClick={() => deleteOrder(order.id)}
                                    >
                                        Remove Item
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    )
                    })
                }
            </Table>
            <button> 
                Confirm Order 
            </button>
        </section>
        </>
    )
}

export default Checkout;