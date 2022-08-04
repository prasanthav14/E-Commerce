import React from 'react';
import "./welcome.css"
import { useNavigate } from 'react-router-dom';

function Welcome() {

    const Navigate = useNavigate();

    return (
        <section>

            {/* <section className="row">
                <div className="marqueeCls">
                    <marquee><small>{`Sound & Lighting Solutions can meet your deadlines if you simply do not have the time to
                    install your new investment. We can arrange for travel to your venue and we are happy to
                    handle system installation as well as training for your staff.`}
                    </small></marquee>
                </div>
            </section> */}

            <div className="container mt-2">
                <div className="card text-light bg-dark row">
                    <img className="coverImg" src={`${process.env.PUBLIC_URL}/img/cover.jpg`} alt="Website Cover" />

                    <div className="card-img-overlay">
                        <div className="col-lg-8 col-md-8 my-auto">
                            <div className="card transparantCard">
                                <div className="card-body">
                                    <h2 className="card-title">AV Event Solutions</h2>
                                    <p className="card-text">{`Sound & Lighting Solutions can meet your deadlines if you simply do not have the time to
                        install your new investment. We can arrange for travel to your venue and we are happy to
                        handle system installation as well as training for your staff.`}</p>
                                    <button onClick={()=>{Navigate("/aboutus")}} className="btn btn-sm btn-primary">Read more...</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default Welcome;