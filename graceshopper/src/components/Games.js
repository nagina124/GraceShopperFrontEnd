import { useEffect, useState } from "react";
import Nav from "react-bootstrap/esm/Nav";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import SingleGame from "./SingleGame";
const API = "https://peaceful-spire-60083.herokuapp.com/api/products";

const Games = () => {
  const [products, setProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const getProducts = () => {
    fetch(`${API}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch(console.error);
  };

  const getProductsByCategory = (category) => {
    fetch(`${API}/${category}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (!Array.isArray(data)) {
          return setProducts([data]);
        }
        setProducts(data);
      })
      .catch(console.error);
  };

  const loadGamePage = (product) => {
    return <SingleGame product={product}/>;
  }
  
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="game-page">
      <h1>Here's the games page</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for games here"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>
      <div className="games-page-container">
        <div className="genre-container">
          <aside className="genre-aside">
            <h3 onClick={getProducts}>Show All Games</h3>
            <h3 onClick={() => getProductsByCategory("JRPG")}>JRPG</h3>
            <h3 onClick={() => getProductsByCategory("Action-Adventure")}>
              Action/Adventure
            </h3>
            <h3 onClick={() => getProductsByCategory("RPG")}>RPG</h3>
            <h3 onClick={() => getProductsByCategory("Fighting")}>Fighting</h3>
            <h3 onClick={() => getProductsByCategory("Horror")}>Horror</h3>
            <h3 onClick={() => getProductsByCategory("Hack-N-Slash")}>
              Hack and Slash
            </h3>
          </aside>
        </div>

        <div className="gamelist-container">
          {products
            ? products
                .filter((product) => {
                  if (searchTerm === "") {
                    return product;
                  } else if (
                    product.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return product;
                  }
                })
              .map((product, index) => {
                return (
                  <Router>
                    <Nav>
                      <div className="results" key={index}>
                        <Nav.Link href={`/games/${product.productURL}`}>
                          <img
                            src={product.imageURL}
                            width="150"
                            height="150"
                            className="game-icon"
                          />
                        </Nav.Link>
                        <Nav.Link href={`/games/${product.productURL}`}>
                          <h2>{product.title}</h2>
                        </Nav.Link>
                        <h3>{product.category}</h3>
                        <h4>${product.price}</h4>
                      </div>
                    </Nav>
                    <Switch>
                      <Route path={`games/${product.productURL}`}>
                        <SingleGame product={product} />
                      </Route>
                    </Switch>
                  </Router>
                );
                })
            : "There's no games to display!"}
        </div>
      </div>
    </div>
  );
};

export default Games;
