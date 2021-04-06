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
import { getToken, getUser } from "./auth";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const App = () => {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [authenticate, setAuthentication] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [game, setGame] = useState(null);

  console.log(isAdmin)
  console.log(authenticate)
  useEffect(() => {
    if (getToken() && getToken() !== undefined) {
      setAuthentication(true);
    }
    if(getUser()) {
      setIsAdmin(getUser())
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
            <SingleGame game={game} />
          </Route>
          <Route path="/games">
            <Games game={game} setGame={setGame} />
          </Route>

          <Route path="/checkout">
            <Checkout />
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
