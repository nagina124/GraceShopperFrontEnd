import './Home.css'
import Carousel from 'react-bootstrap/Carousel'

const Home = () => {
    return (
      <>
        <div className="homeTitle">
          <h1> Video Game Heaven! </h1>
          <p> Welcome to "website name" </p>
        </div>

        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://image.api.playstation.com/vulcan/img/rnd/202010/0723/vDLeyNzrJdGwabFlEo44GkEZ.png?w=5000&thumb=false"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.ps4wallpapers.com/wp-content/uploads/2021/01/2021-01-24_600ceafb1913f_1126063.jpg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://image.api.playstation.com/vulcan/ap/rnd/202010/0911/IUHo6BeWCLACvasWb4hX8xfu.jpg?w=5000&thumb=false"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </>
    );
}

export default Home;