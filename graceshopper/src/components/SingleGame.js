const SingleGame = ({ product }) => {
  console.log("Hello");
  return (
    <div className="game-page">
      <h1>Test</h1>
      <h2>{product.title}</h2>
      <h3>{product.category}</h3>
      <h4>${product.price}</h4>
    </div>
  );
};

export default SingleGame;
