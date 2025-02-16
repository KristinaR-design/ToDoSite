import 'bootstrap/dist/css/bootstrap.min.css'
import './css/font.css'
import './css/components.css'
import './css/Footer.css'

function Footer() {
    return (
        <>
            <footer className="panel-footer">
                <div style={{ fontSize: "20px" }} className="container">
                    <div className="row">
                        <section id="hours" className="col-sm-4">
                            <span>Hours:</span><br />
                            Daily from 8:00 to 20:00<br /><br />
                            <span>Phone:</span><br />
                            987-654-321
                        </section>

                        <section id="address" className="col-sm-4">
                            <span>Address:</span><br />
                            500 Terry Francine St.<br />
                            San Francisco,<br />
                            CA 94158<br />
                        </section>

                        <section id="testimonials" className="col-sm-4">
                            <p id="social" style={{ fontSize: "36px" }}>Social's</p>

                            <button style={{ fontSize: "20px", width: "100%", textAlign: "center", marginBottom: "15px" }} id="social_links">
                                <img src={'/images/facebook.png'} alt="instagram" id="foot_img_inst" />
                                <div id="foot_text"><b>FACEBOOK</b></div>
                            </button>

                            <button style={{ fontSize: "20px", width: "100%", textAlign: "center", marginBottom: "15px" }} id="social_links" className="what">
                                <img src={'/images/twit.png'} alt="instagram" id="foot_img_inst" />
                                <div id="foot_text"><b>TWITTER</b></div>
                            </button>

                            <button style={{ fontSize: "20px", width: "100%", textAlign: "center" }} id="social_links">
                                <img src={'/images/instagram.png'} alt="instagram" id="foot_img_inst" />
                                <div style={{ fontSize: "20px" }} id="foot_text"><b>INSTAGRAM</b></div>
                            </button>

                        </section>
                    </div>
                    <hr className="visible-xs" />
                    <div className="text-center">&copy; 2035 All rights are secured</div>
                </div>
            </footer>
        </>
    )
}

export default Footer