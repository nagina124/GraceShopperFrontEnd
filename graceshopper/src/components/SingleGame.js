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
          filter: "brightness(50%)",
        }}
      ></div>
      <div id="gp-purchase" className="details-container">
        <div className="gp-game-icon">
          <img
            src={game.imageURL}
            width="200"
            height="200"
            className="game-icon"
          />
        </div>
        <div id="gp-info" className="game-info">
          <h4 className="gp-game-title">{game.title}</h4>
          <div className="gp-game-sub-details">
            <p> {game.platform} <span>&#8226;</span> {game.category}  
              <span> &#8226; </span> 
              <span  
                style={{
                  fontWeight: "bold", 
                  textTransform: "uppercase",
                }}
              > {game.ageRating} </span> 
            </p>
          </div>
          <p>{game.description}</p>
        </div>
        <div className="gp-game-details">
          <h4>${game.price}</h4>
          <Button>Add to Cart</Button>
          <div> &nbsp; </div>
          <p><b>Publisher:</b> {game.publisher}</p>
          <p><b>Developer:</b> {game.developer}</p>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/games" />
  );
};;

export default SingleGame;
