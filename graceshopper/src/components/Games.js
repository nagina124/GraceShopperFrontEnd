import { useEffect, useState } from "react";
const API = "https://peaceful-spire-60083.herokuapp.com/api/products";

const Games = () => {
    const [products, setProducts] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
  const getProducts = () => {
    fetch(`${API}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch(console.error);
    };
    
    useEffect(() => {
        getProducts();
    }, []);

  return (
    <div className="game-page">
      <h1>Here's the games page</h1>

      <aside className="genre-aside">
        <h3>JRPG</h3>
        <h3>Action/Adventure</h3>
        <h3>RPG</h3>
        <h3>Fighter</h3>
        <h3>Horror</h3>
      </aside>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for games here"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>
      <div>
        {products
          ? products
              .filter((product) => {
                if (searchTerm === "") {
                  return product;
                } else if (
                  product.title.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return product;
                }
              })
              .map((product, index) => {
                return (
                  <div className="results" key={index}>
                    <h2>{product.title}</h2>
                    <h4>${product.price}</h4>
                    <p>{product.description}</p>
                  </div>
                );
              })
          : "There's no games to display!"}
      </div>
    </div>
  );
};

export default Games;
