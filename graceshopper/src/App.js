import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Home, Admin, Login, Logout, Games, SingleGame, Checkout} from "./components";
import { getToken } from "./auth";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";


const App = () => {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [authenticate, setAuthentication] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (getToken() && getToken() !== undefined) {
      setAuthentication(true);
    }
  }, []);

  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Video Games</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/games">Games</Nav.Link>
          <Nav.Link href="/admin">Admin Tasks</Nav.Link>
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
            <Admin isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
          </Route>
          <Route path="/login">
            <Login
              username={username}
              setUsername={setUsername}
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
          <Route path="/games">
            <Games/>
          </Route>
          <Route path="/singlegame">
            <SingleGame/>
          </Route>
          <Route path="/checkout">
            <Checkout/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
