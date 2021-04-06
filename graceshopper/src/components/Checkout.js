import "./Checkout.css"
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from "react";
import {getProductForGuests} from '../auth'
const API = "https://peaceful-spire-60083.herokuapp.com/api/orders";

const Checkout = ({userId}) => {

    const [ orders, setOrders ] = useState([]);
    const [ orderConfirmed, setOrderConfirmed ] = useState(false)
    const [count, setCount] = useState()

    const getOrders = () => {
        fetch(`${API}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setOrders(data);
        })
        .catch(console.error);
    };



    console.log(orders)

    const userOrder = orders.filter((order) => {
        if(order.userId == userId){
            return order
        }
    })

    console.log(userOrder)

    
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
                    </tr>
                </thead>
                {userOrder.map((order, index) => {
                    return (
                        <tbody key={index}>
                            <tr>
                                <td>{order.count}</td>
                                <td>{order.productTitle}</td>
                                <td>{order.productPrice}</td>
                            </tr>
                        </tbody>
                    )
                    })
                }
            </Table>
            <button > Confirm Order </button>
        </section>
        {orderConfirmed ? 
        <div className= "center" id="activeDelivery">
            <p> Delivery Address </p>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="password" placeholder="First Name" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="password" placeholder="Last Name" />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="Address Line 1" />
                </Form.Group>

                <Form.Group controlId="formGridAddress2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control placeholder="Address Line 2" />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control placeholder="City"/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select" defaultValue="Choose...">
                        <option>Choose...</option>
                        <option>...</option>
                    </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control />
                    </Form.Group>
                </Form.Row>

                {/* <Form.Group id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
        : 
        <div className= "center" id="inactiveDelivery">
            <p> Please confirm your order to continue </p>
        </div>
        }
        <div className= "right">
            <p> Payment </p>
        </div>
        </>
    )
}

export default Checkout;