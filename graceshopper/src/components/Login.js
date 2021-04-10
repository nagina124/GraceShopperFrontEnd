import { React, useState } from "react";
import { Redirect, Link } from "react-router-dom";
// import RegisterModal from "./RegisterModal";
import { getToken, getUser, login, user, userId } from "../auth";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
const API = "https://peaceful-spire-60083.herokuapp.com/api";

const Login = ({
  authenticate,
  setAuthentication,
  username,
  setUsername,
  setToken,
  orders,
  setOrders

}) => {
  const [password, setPassword] = useState();
  const [loginSuccessful, setLoginSuccessful] = useState(false);

  function authentication(event) {
    event.preventDefault();
    fetch("https://peaceful-spire-60083.herokuapp.com/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.name === "IncorrectCredentialsError") {
          alert("Username or Password does not match. Please try again.");
        } else {
          console.log(result);
          login(result.token);
          if (result.admin === true) {
            user(result.admin);
          }
          setToken(getToken());
          isLoggedIn(result);
          userId(result.userId)
          getOrdersForUser(result.userId)
        }
      })
      .catch(console.error);
  }

  const getOrdersForUser = (userId) => {
    fetch(`${API}/orders/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setOrders(data);
    })
    .catch(console.error);
  };


  const isLoggedIn = (result) => {
    if (result.name !== "IncorrectCredentialsError") {
      console.log("is logged in");
      setAuthentication(true);
      setLoginSuccessful(true);
      alert(result.message);
    } else {
      console.log("not logged in");
      alert(result.message);
    }
  };

  if (loginSuccessful && authenticate && !getUser()) {
    return <Redirect to="/" />;
  } else if (loginSuccessful && authenticate && getUser()) {
    return <Redirect to="./admin" />;
  }


  return (
    <div>
      <Container>
        <center>
          <h1 style={{ padding: "35px" }}>LOGIN PAGE</h1>
        </center>
        <Form onSubmit={authentication}>
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
              type="password"
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Link
            to="/register"
            style={{
              color: "#fff",
              background: "#007bff",
              padding: "10px",
              margin: "10px 15px",
              borderRadius: "7%",
              fontSize: "14px",
            }}
          >
            Click to Register
          </Link>
        </Form>
      </Container>
      {/* <RegisterModal
            username={username}
            setUsername={setUsername}
            token={token}
            setToken={setToken}
            authenticate={authenticate}
            setAuthentication={setAuthentication}
          /> */}
    </div>
  );
};

export default Login;
