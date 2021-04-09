import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {
  Home,
  Admin,
  Login,
  Logout,
  Register,
  Games,
  SingleGame,
  Checkout,
  Error,
} from "./components";
import { getToken, getUser, getUserId } from "./auth";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ShoppingCartModal from "./components/ShoppingCartModal";

const App = () => {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [authenticate, setAuthentication] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [game, setGame] = useState(null);
  const [userId, setUserId] = useState(getUserId());
  const [orders, setOrders] = useState([]);

  console.log(isAdmin);
  console.log(authenticate);
  console.log(userId);
  const getOrdersForUser = () => {
    fetch(`https://peaceful-spire-60083.herokuapp.com/api/orders/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (userId) {
      getOrdersForUser();
    }
    
    if (getToken() && getToken() !== undefined) {
      setAuthentication(true);
    }
    if (getUser()) {
      setIsAdmin(getUser());
    }
    if (getUserId()) {
      setUserId(getUserId());
      console.log(userId);
    }
  }, []);

  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Video Games</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/games">Games</Nav.Link>
          {authenticate && getUser() && getToken() ? (
            <Nav.Link href="/admin">Admin Tasks</Nav.Link>
          ) : null}
          <Nav.Link href="/checkout">Checkout!</Nav.Link>
          {!authenticate && !getToken() ? (
            <Nav.Link href="/login">Login/Register</Nav.Link>
          ) : (
            <Link
              style={{ color: "rgba(255,255,255,.5)", padding: "7.5px" }}
              to="/logout"
            >
              Logout
            </Link>
          )}
          { orders ? 
          <ShoppingCartModal
            userId={userId}
            orders={orders}
            setOrders={setOrders}
          />
          : null}
        </Nav>
      </Navbar>
      {/* <nav>
        <Link to="/">HOME</Link>
        <Link to="/admin">ADMIN</Link>
        {getToken() && authenticate ? (
          <Link to="/logout" className="link">
            LOGOUT
          </Link>
        ) : (
          <Link to="/login" className="link">
            LOGIN
          </Link>
        )}
        <Link to="/register">REGISTER</Link>
        <Link to="/games">GAMES</Link>
        {/* <Link to="/games/(name of game)">individual game</Link> */}
      {/* <Link to="/checkout">CHECKOUT</Link>
      </nav> */}
      <main>
        <Switch>
          <Route path="/admin">
            {authenticate && getToken() && getUser() ? (
              <Admin isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
            ) : (
              <Error />
            )}
          </Route>

          <Route path="/login">
            <Login
              username={username}
              setUsername={setUsername}
              token={token}
              setToken={setToken}
              authenticate={authenticate}
              setAuthentication={setAuthentication}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
              orders={orders}
              setOrders={setOrders}
            />
          </Route>
          <Route path="/logout">
            <Logout
              authenticate={authenticate}
              setAuthentication={setAuthentication}
            />
          </Route>
          <Route path="/register">
            <Register
              username={username}
              setUsername={setUsername}
              token={token}
              setToken={setToken}
              authenticate={authenticate}
              setAuthentication={setAuthentication}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
            />
          </Route>
          <Route exact path="/games/:gametitle">
            <SingleGame game={game} userId={userId} />
          </Route>
          <Route path="/games">
            <Games
              orders={orders}
              setOrders={setOrders}
              game={game}
              setGame={setGame}
              userId={userId}
            />
          </Route>

          <Route path="/checkout">
            <Checkout 
            userId={userId}
            setOrders={setOrders}
            orders={orders} 
            />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
