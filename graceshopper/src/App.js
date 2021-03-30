import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Admin, Login, Logout } from "./components";
import { getToken } from "./auth";

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
      <nav>
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
        <Link to="/checkout">CHECKOUT</Link>
      </nav>
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
          <Route path="/register"></Route>
          <Route path="/games"></Route>
          <Route path="/checkout"></Route>
          <Route path="/"></Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
