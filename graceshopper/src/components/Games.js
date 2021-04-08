import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SingleGame from "./SingleGame";
import Button from "react-bootstrap/Button";
const API = "https://peaceful-spire-60083.herokuapp.com/api";

const Games = ({game, setGame, userId}) => {
  const [products, setProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderComplete, setOrderComplete] = useState();
  const [orders, setOrders] = useState(null);
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

  const getOrdersForUser = (productId, productTitle) => {
    fetch(`${API}/orders/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setOrders(data);
      checkforOpenOrder(productId, productTitle);

    })
    .catch(console.error);
  };
  
  const addProductToAnOrder = (productId, productTitle) => {
    fetch(`${API}/orders/${orderId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
        productTitle: productTitle,
        count: 1, //I don't think this needs to be passed to the back end
        orderComplete: false, //I don't think this needs to be passed to the back end
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Getting the error below, maybe need to clean up the back end
        // {name: "TypeError", message: "usersOrder.filter is not a function"}
        // message: "usersOrder.filter is not a function";
        // name: "TypeError";
        // __proto__: Object;
        
        // This error is referring to the filter on Line:68 of orders.js in the API folder.
      });

  }

  const checkforOpenOrder = (productId, productTitle) => {
    const openOrder = orders.filter(
      (order) => {
        setOrderId(order.id);
        // Right now the order id is constantly being reset everytime I filter.
        //we need to fix the backend where only 1 order is NOT complete, currently all of them are considered open.
        return order.orderComplete === false
      }
    );
    console.log("These are the open orders for this user", openOrder);

    if (openOrder.length) {
      addProductToAnOrder(productId, productTitle);
    }
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
                      <Button onClick={() => getOrdersForUser(product.id, product.title)}>Add to Cart</Button>
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
