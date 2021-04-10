import { useState, React } from "react";
import { Redirect } from "react-router-dom";
import { login, getToken, userId, getUserId } from "../auth";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
const API = "https://peaceful-spire-60083.herokuapp.com/api";

const Register = ({
  username,
  setUsername,
  token,
  setToken,
  authenticate,
  setAuthentication,
  guestOrder,
  setGuestOrder,
  setOrders,
  userId,
  setUserId
}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPassWordConfirmation] = useState();

  function createUser(event) {
    event.preventDefault();
    if (email && username && password && password === passwordConfirmation) {
      fetch("https://peaceful-spire-60083.herokuapp.com/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.error) {
            alert(result.error);
          }
          if(result.message === `duplicate key value violates unique constraint "users_email_key"`)
          {alert("Email already used. Please use another email to register.")}
          if (result.token !== undefined) {
            login(result.token);
            setToken(getToken());
            isLoggedIn(result);
            userId(result.userId);
            setUserId(result.userId);
            moveOrdersFromGuestToUser();
          }
        })
        .catch(console.error);
    }
  }

  const isLoggedIn = (result) => {
    if (result.token) {
      console.log("is registered");
      setAuthentication(true);
      alert(result.message);
    } else {
      console.log("not registered");
    }
  };

  if (authenticate && token) {
    return <Redirect to="./" />;
  }

  const getOrdersForUser = async () => {
    fetch(`${API}/orders/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
      })
      .catch(console.error);
  };

  const moveOrdersFromGuestToUser = async () => {
    guestOrder.forEach(order => {
      fetch(`${API}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: getUserId(),
          productId: order.productId,
          productTitle: order.productTitle,
          count: 1,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          
          getOrdersForUser();
        });
    });
    setGuestOrder([]);
    localStorage.removeItem('products');
  }

  return (
    <div>
      <Container>
        <center>
          <h1 style={{ padding: "35px" }}>REGISTER PAGE</h1>
        </center>
        <Form onSubmit={createUser}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="Password"
              minLength="8"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <Form.Text id="passwordHelpInline" muted>
              Must be greater than 7 characters.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPasswordConfirmation">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              placeholder="Password Confirmation"
              minLength="8"
              onChange={(event) => {
                setPassWordConfirmation(event.target.value);
              }}
            />
            <Form.Text id="passwordHelpInline" muted>
              Must be greater than 7 characters.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Register;
