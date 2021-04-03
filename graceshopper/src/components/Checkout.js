import "./Checkout.css"
import Table from 'react-bootstrap/Table'
import { useEffect, useState } from "react";
const API = "https://peaceful-spire-60083.herokuapp.com/api/orders";

const Checkout = () => {

    const [orders, setOrders] = useState([]);
   
    const getOrders = () => {
    fetch(`${API}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
      })
      .catch(console.error);
    };
    
    useEffect(() => {
        getOrders();
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

                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>

                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>

                    </tr>
                    <tr>
                    <td>3</td>
                    <td>Larry the Bird</td>
                    <td>@twitter</td>
                    </tr>
                </tbody>
            </Table>
        </section>
        {/* <section className = "left">
            <div>
                <h2> Review Your Order </h2>
               {orders.map((order, index) => {
                   return (
                        <>
                            <h5 key={index}>{order.productTitle}</h5>
                            <li>{order.count}</li>

                        </>)
               })}
            </div>
        </section> */}
        <div className= "center">
            <p> Delivery Address </p>
        </div>
        <div className= "right">
            <p> Payment </p>
        </div>
        </>
    )
}

export default Checkout;