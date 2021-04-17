import { Redirect } from "react-router";
import Button from "react-bootstrap/Button";
import moment from 'moment';
import "./SingleGame.css";

const SingleGame = ({ game }) => {
  console.log(game);
  // const date = moment(game.releaseDate).format("DD MMM, YYYY");
  return game ? (
    <div className="single-game">
      <div
        className="bg-image"
        style={{
          backgroundImage: `url(${game.splash}`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
          // backgroundPosition: "center top",
          // backgroundRepeat: "no-repeat",
          // backgroundSize: "contain",
          // position: "relative"
          filter: "brightness(50%)",
        }}
      ></div>
      <div id="gp-purchase" className="details-container">
        <div id="gp-info" className="game-info">
          <div className="gp-game-icon">
            <img
              src={game.imageURL}
              width="200"
              height="200"
              className="game-icon"
            />
          </div>
          <div className="gp-game-details">
            <h4 className="gp-game-title">{game.title}</h4>
            <h4>{game.category}</h4>
            <h4>${game.price}</h4>
            <Button>Add to Cart</Button>
            <p>Platform: {game.platform}</p>
            <p>Publisher: {game.publisher}</p>
            <p>Developer: {game.developer}</p>
            {/* <p>Release Date: {date}</p> */}
            <p>{game.description}</p>
          </div>
        </div>
        {/* <div className="game-description"></div> */}
      </div>
    </div>
  ) : (
    <Redirect to="/games" />
  );
};;

export default SingleGame;
