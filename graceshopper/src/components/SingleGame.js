import { Redirect } from "react-router";
import Button from "react-bootstrap/Button";

const SingleGame = ({ game }) => {
  console.log("Hello");
  console.log(game);
  return game ? (
    <div className="details-page">
      <img src={game.splash} width="100%" height="100%" className="game-icon" />
      <div className="details-container">
        <img
          src={game.imageURL}
          width="150"
          height="150"
          className="game-icon"
          className="splash-image"
        />
        <h2>{game.title}</h2>
        <h3>{game.category}</h3>
        <h4>${game.price}</h4>
        <Button>Add to Cart</Button>
        <p>{game.description}</p>
      </div>
    </div>
  ) : (
    <Redirect to="/games" />
  );
};

export default SingleGame;
