import './ThankYou.css'

const ThankYou = () => {

    return (
        <center>

        
        <section className="thankYouPage">

        
        <div className="thankYouMessage">
            <img className="thankYouImage" src="https://images.saymedia-content.com/.image/t_share/MTc0NDU3Njc3NjM5NzIyMzQ0/hottest-female-video-game-characters.png"/>
            <div className="info"> 
            <h3 className="thankYou"> Thank You! </h3>
            <h2 className="orderInfo"> You have successfuly completed your order. </h2>
            <p className="expect"> Expect an email within 24 hours </p>
            <img src="https://img.icons8.com/ios/452/among-us.png"/>
            <div className="customerService">
                <p > Experiencing problems?</p>
                <p> We can save the day! </p>
                <p> Please contact us at 
                    <div className="phoneNumber">
                    1-800-GAME-HEAVEN 
                    </div>
                </p>
            </div>
            
            </div>
            
        </div>
        </section>
        </center>
    )

}

export default ThankYou;