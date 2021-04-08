import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SingleGame from "./SingleGame";
import Button from "react-bootstrap/Button";
const API = "https://peaceful-spire-60083.herokuapp.com/api";

const Games = ({game, setGame, userId, orders, setOrders}) => {
  const [products, setProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderComplete, setOrderComplete] = useState();
  const [orderId, setOrderId] = useState(null);

  const getProducts = () => {
    fetch(`${API}/products`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch(console.error);
  };

  const getProductsByCategory = (category) => {
    fetch(`${API}/products/${category}`)
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

  const getOrdersForUser = () => {
    fetch(`${API}/orders/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setOrders(data);
    })
    .catch(console.error);
  };
  
  const addOrderToCart = (productId, productTitle) => {
    fetch(`${API}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        productId: productId,
        productTitle: productTitle,
        count: 1
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.orderStatus === "created" ? alert(`${data.productTitle} has been added to cart`) : alert("This order already exists");
        getOrdersForUser();
      });

  }


// console.log(orders)


//   const addToCart = () => {
//     if(userId){

//     }
//   }

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
                    <div className="results" key={index}>
                      <Link to={`/games/${product.productURL}`}>
                        <img
                          src={product.imageURL}
                          width="150"
                          height="150"
                          className="game-icon"
                          onClick={() => setGame(product)}
                        />
                      </Link>
                      <Link to={`/games/${product.productURL}`}>
                        <h2 onClick={() => setGame(product)}>
                          {product.title}
                        </h2>
                      </Link>
                      <h3>{product.category}</h3>
                      <h4>${product.price}</h4>
                      <Button
                        onClick={() =>
                          addOrderToCart(product.id, product.title)
                        }
                      >
                        Add to Cart
                      </Button>
                    </div>
                  );
                })
            : "There's no games to display!"}
        </div>
      </div>
    </div>
  );
};

export default Games;
