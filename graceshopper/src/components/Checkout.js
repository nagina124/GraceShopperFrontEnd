import { loadStripe } from "@stripe/stripe-js";
import {
  Elements
} from "@stripe/react-stripe-js";
import Dropdown from 'react-bootstrap/Dropdown'
import "./Checkout.css"
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from "react";
import {removeGuestProducts} from '../auth'
// import TakeMoney from './StripeCheckout'
import CheckoutForm from './StripeCheckout'
const API = "https://peaceful-spire-60083.herokuapp.com/api/orders";
// import StripeCheckout from 'react-stripe-checkout';
const stripePromise = loadStripe("pk_test_51Iei4JBoHWwkzUsZILLciQCW97S5JTpLMZak2X4ckbSdJUnT2CcRywoxeNb0Ez1fcyBtVzETYR1MJnLlKAtpf9xi00hJBUHQdx");

const Checkout = ({
    userId, 
    orders, 
    setOrders,
    cart,
    setCart,
    guestOrder,
    setGuestOrder
}) => {
    const [ orderConfirmed, setOrderConfirmed ] = useState(false)
    const [count, setCount] = useState()
 
    // const [selected, setSelected] = useState("");
    const tax = 1.10;
    let subtotal = 0;
    let total = 0;
    const getOrders = () => {
        fetch(`${API}/${userId}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setOrders(data);
            setCart(data)
        })
        .catch(console.error);
    };


    const makePending = () => {
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
                console.log(data, "order is pending");
                setOrderConfirmed(true)
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

    const updateCount = () => {

        // const changeCountHandler = (event) => {
        //     console.log(event.target.value)
        //     setCount(event.target.value);
        //   };


        // changeCountHandler()

        orders.forEach((order) => {
            fetch(`https://peaceful-spire-60083.herokuapp.com/api/orders/${order.id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  count: count,
                }),
              })


            .then((response) => response.json())
            .then((data) => {
                console.log(data, "count is increased");
                if(data){
                    const newOrderCount = orders.map((order) => {
                        if (order.id ) {
                          return data;
                        } else {
                          return order;
                        }
                      });
          
                      setOrders(newOrderCount);
                }
                
            })
            .catch(console.error);
        })
      }


    const clearCart = () => {
        setCart([]);
        removeGuestProducts()
    };

    useEffect(() => {
        if(userId){
            getOrders();
        } else {
          // getProductForGuests()
            // setGuestOrder(getProductForGuests())
            console.log(guestOrder)
          
        }
    }, []);

    //changes the count 

    

    return (
        <>
        <div className="order-checkout">
            <h1 className="secure-checkout"> Secure Checkout </h1>
            <p className="enjoy"> We hope you enjoy your purchase! </p>
        </div>
        
        <section>
            <Table className = "left" striped bordered hover style={{backgroundColor:"#038ed1"}}>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Game Name</th>
                    <th>Price</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                {userId ?
                orders.map((order, index) => {
                    subtotal = Math.round((subtotal + order.productPrice) * 100) / 100;
                    total = Math.round(subtotal * tax * 100) / 100;
                    return (
                        <tbody key={index}>
                            <tr>
                                <td>
                                {order.count}
                        {/* <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                {order.count}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item 
                                    value="1"
                                    onChange={(event) => {
                                        
                                        setCount((event.target.value));
                                        console.log(count)
                                        updateCount()
                                      }}
                                    >1</Dropdown.Item>

                                <Dropdown.Item 
                                // eventKey={order.count}
                                    value={2}
                                    onClick={(event) => {
                                        
                                        setCount(Number(event.target.value));
                                        console.log(event.target.value)
                                        console.log(count)
                                        updateCount()
                                      }}
                                    >2</Dropdown.Item> */}
                                
                                {/* <Dropdown.Item value={3} onClick={setCount}>3</Dropdown.Item>
                                <Dropdown.Item value={4} onClick={setCount}>4</Dropdown.Item>
                                <Dropdown.Item value={5} onClick={setCount}>5</Dropdown.Item>
                                <Dropdown.Item value={6} onClick={setCount}>6</Dropdown.Item>
                                <Dropdown.Item value={7} onClick={setCount}>7</Dropdown.Item>
                                <Dropdown.Item value={8} onClick={setCount}>8</Dropdown.Item>
                                <Dropdown.Item value={9} onClick={setCount}>9</Dropdown.Item>
                                <Dropdown.Item value={10} onClick={setCount}>10</Dropdown.Item> */}
                            {/* </Dropdown.Menu>
                        </Dropdown> */}
                                </td>
                                <td>{order.productTitle}</td>
                                <td>{order.productPrice}</td>
                                <td> 
                                    <button
                                        className="deleteButton"
                                        onClick={() => deleteOrder(order.id)}
                                    >
                                        Remove Item
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    )
                    })
                    : 
                    guestOrder.map((order, index) => {
                      subtotal = Math.round((subtotal + order.productPrice) * 100) / 100;
                      total = Math.round(subtotal * tax * 100) / 100;
                      return (
                          <tbody key={index}>
                              <tr>
                                <td>
                                  {order.count}
                                </td>
                                <td>{order.productTitle}</td>
                                <td>{order.productPrice}</td>
                                <td> 
                                    <button
                                        className="deleteButton"
                                        onClick={() => deleteOrder(order.id)}
                                    >
                                        Remove Item
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    )})
                    
                  }
                  
            </Table>

            <div className="orderTotal">
                <h6>Subtotal: {subtotal}</h6>
                <h6>Tax: 10%</h6>
                
                <h6 className= "total">Total: {total} </h6>
                <button onClick={clearCart}> Cancel Order </button>
                <button 
                    // onClick={makePending}
                    onClick={setOrderConfirmed}
                    className="confirmButton"
                > 
                    Confirm Order 
                </button>
            </div>

            { orderConfirmed ? 
            <div className="AppWrapper">
                <Elements stripe={stripePromise} >
                    <CheckoutForm 
                    amount={total}
                    orders={orders}
                    guestOrder={guestOrder}
                    setGuestOrder={setGuestOrder}

                    />
                </Elements>
            </div>
            : null}
        </section>
        </>
    )
}

export default Checkout;