import { Redirect } from "react-router";
import Button from "react-bootstrap/Button";
import moment from 'moment';

const SingleGame = ({ game }) => {
  console.log(game);
  // const date = moment(game.releaseDate).format("DD MMM, YYYY");
  return game ? (
    <div className="single-game">
      <div className="bg-image"
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
        }}>
      </div>
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
            <h4>{game.title}</h4>
            <h4>{game.category}</h4>
            <h4>${game.price}</h4>
            <Button>Add to Cart</Button>
            <p>Platform: {game.platform}</p>
            <p>Publisher: {game.publisher}</p>
            <p>Developer: {game.developer}</p>
            {/* <p>Release Date: {date}</p> */}
          </div>
        </div>
        <div className="game-description">
          <h4>Game Description</h4>
          <p>{game.description}</p>
          {/* <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            mollitia, molestiae quas vel sint commodi repudiandae consequuntur
            voluptatum laborum numquam blanditiis harum quisquam eius sed odit
            fugiat iusto fuga praesentium optio, eaque rerum! Provident
            similique accusantium nemo autem. Veritatis obcaecati tenetur iure
            eius earum ut molestias architecto voluptate aliquam nihil, eveniet
            aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur
            error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
            quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias
            eos sapiente officiis modi at sunt excepturi expedita sint? Sed
            quibusdam recusandae alias error harum maxime adipisci amet laborum.
            Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates
            a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius
            fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero
            magni deleniti quod quam consequuntur! Commodi minima excepturi
            repudiandae velit hic maxime doloremque. Quaerat provident commodi
            consectetur veniam similique ad earum omnis ipsum saepe, voluptas,
            hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam
            cupiditate excepturi mollitia maiores labore suscipit quas? Nulla,
            placeat. Voluptatem quaerat non architecto ab laudantium modi minima
            sunt esse temporibus sint culpa, recusandae aliquam numquam totam
            ratione voluptas quod exercitationem fuga. Possimus quis earum
            veniam quasi aliquam eligendi, placeat qui corporis!Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Maxime mollitia,
            molestiae quas vel sint commodi repudiandae consequuntur voluptatum
            laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto
            fuga praesentium optio, eaque rerum! Provident similique accusantium
            nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias
            architecto voluptate aliquam nihil, eveniet aliquid culpa officia
            aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt
            ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error
            repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis
            modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias
            error harum maxime adipisci amet laborum. Perspiciatis minima
            nesciunt dolorem! Officiis iure rerum voluptates a cumque velit
            quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus
            tenetur fugiat, temporibus enim commodi iusto libero magni deleniti
            quod quam consequuntur! Commodi minima excepturi repudiandae velit
            hic maxime doloremque. Quaerat provident commodi consectetur veniam
            similique ad earum omnis ipsum saepe, voluptas, hic voluptates
            pariatur est explicabo fugiat, dolorum eligendi quam cupiditate
            excepturi mollitia maiores labore suscipit quas? Nulla, placeat.
            Voluptatem quaerat non architecto ab laudantium modi minima sunt
            esse temporibus sint culpa, recusandae aliquam numquam totam ratione
            voluptas quod exercitationem fuga. Possimus quis earum veniam quasi
            aliquam eligendi, placeat qui corporis!
          </p> */}
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/games" />
  );
};;

export default SingleGame;
