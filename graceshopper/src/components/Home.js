import './Home.css'
import Carousel from 'react-bootstrap/Carousel'
import SwiperCarousel from './Swiper'
// import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'

const Home = () => {
    return (
      <>
        <div >
          <h1 className="homeTitle"> Video Game Heaven! </h1>
          <p className="welcomeMessage"> Enjoy your journey into the unkownn and give us your money!</p>
        </div>

        <Carousel className="carousel">
        <Carousel.Item style={{ height: "50vh", overflow: "hidden"}}>
            <img
              className="d-block w-100"
              src="https://gmedia.playstation.com/is/image/SIEPDC/outriders-key-art-image-block-01-en-30jul20?$1600px$"
              alt="First slide"
           
            />
            <Carousel.Caption>
              <h3>Outriders</h3>
              <p>Outriders is a 1-3 player co-op RPG shooter set in an original, dark and desperate sci-fi universe.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{height: "50vh", overflow: "hidden"}}>
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
          <Carousel.Item style={{height: "50vh", overflow: "hidden"}}>
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
          <Carousel.Item style={{height: "50vh", overflow: "hidden"}}>
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
        
        
        <div className="container"> 
          <div className="row"> 

              <div className="newGames">
                <h3 className="upcomingGamesTitle"> Upcoming Games </h3>
                
 
            
{/* src= "https://compass-ssl.xbox.com/assets/53/1c/531cfd20-22e9-434b-86eb-2ea61b5dd646.jpg?n=Biomutant_GLP-Page-Hero-1084_1920x1080.jpg" */}


        {/* <SwiperCarousel/> */}
        <div className="container">
        {/* <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card> */}
 

        <Container > 
          <Row > 
        <div className="upcomingGames"  >
            <section className="specificGame" id="revealLeft">
              <div id="revealContainerLeft"> 
              <Col xs={6} md={4}>
                <div id="revealTitleLeft-overlay">
                  <div id="revealTitleLeft-overlay-text">
                  <div className="gameInfo">
                    <h3> Pokemon Snap </h3>
                    {/* <h4> Release Date: 	April 30, 2021 </h4>
                    <h5> Platform: Nintendo Switch </h5>
                    <p> The player is a Pokémon photographer who visits various islands 
                        in the Lental region to help the research studies of 
                        Professor Mirror and his assistants Rita and Phil. </p> */}
                  </div>

                {/* <Card style={{ width: '500px', height: '200px' }}>
                  <Card.Body>
                    <Card.Title>Pokemon Snap</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">elease Date: April 30, 2021</Card.Subtitle>
                    <Card.Text>
                        The player is a Pokémon photographer who visits various islands 
                        in the Lental region to help the research studies of 
                        Professor Mirror and his assistants Rita and Phil.
                    </Card.Text>

                  </Card.Body>
                </Card> */}
                  </div>
                </div>
                <Image 
                src="https://tnsmedia.imgix.net/2021/01/newpokemonsnapfi.png?auto=compress&fm=png&ixlib=php-3.3.0&s=7d47702a4c8291c2feeb25c180297e49" 
                rounded
                style={{height: "300px", width: "500px"}}
                />
                
              </Col>
              </div>
            </section>
            

            <section className="specificGame" id="revealRight">
            <div id="revealContainerRight"> 
              <Col xs={6} md={4}>
              <div id="revealTitleRight-overlay">
                  <div id="revealTitleRight-overlay-text">
                  Biomutant- May 25, 2021
                  </div>
                </div>
                <Image 
                src="https://compass-ssl.xbox.com/assets/53/1c/531cfd20-22e9-434b-86eb-2ea61b5dd646.jpg?n=Biomutant_GLP-Page-Hero-1084_1920x1080.jpg" 
                rounded
                style={{height: "300px", width: "500px"}}
                />
              </Col>
              </div>
            </section>



            <section className="specificGame">
              <Col xs={6} md={4}>
                <Image 
                src="https://d2skuhm0vrry40.cloudfront.net/2020/articles/2020-08-18-15-11/-1597759887416.jpg/EG11/thumbnail/750x422/format/jpg/quality/60" 
                rounded
                style={{height: "300px", width: "500px"}}
                />
              </Col>
            </section>

            <section className="specificGame">
              <Col xs={6} md={4}>
                <Image 
                src="https://d2skuhm0vrry40.cloudfront.net/2021/articles/2021-01-28-15-13/ps5-exclusive-returnal-delayed-to-the-end-of-april-1611846790021.jpg/EG11/resize/1200x-1/ps5-exclusive-returnal-delayed-to-the-end-of-april-1611846790021.jpg" 
                rounded
                style={{height: "300px", width: "500px"}}
                />
              </Col>
            </section>
            </div>
          </Row> 
        </Container>
     
        </div>

        <div>
          <section>

          </section>
        </div>
        </div>
        </div>
       
        </div>
      </>
    );
}

export default Home;