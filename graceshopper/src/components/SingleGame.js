const SingleGame = ({ product }) => {
  return (
    <div className="game-page">
      <h2>{product.title}</h2>
      <h3>{product.category}</h3>
      <h4>${product.price}</h4>
    </div>
  );
};

export default SingleGame;
