import React from 'react';
import './about.css';

function About() {
    return (
        <section>

            <div id="about" className="mt-2">
                <div className=" bg-dark text-light text-center">
                    <h1>About Us</h1>
                </div>
            </div>

            <div className="container">

                <div className="row">
                    <div className="col-md-4 col-12 visionDiv">
                        <div className="card valueCardCls">
                            <img src={`${process.env.PUBLIC_URL}/img/vision.png`} alt="Company Vision" className='abtImg' />
                            <div className="card-body">
                                <h5 className="card-title text-center">Vision</h5>
                                <p className="card-text text-justify">
                                    {`To be the leading and most preferred event
                                    solution provider by planning and executing an innovative and Unique event
                                    that is value for money`}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 col-12 missionDiv">
                        <div className="card valueCardCls">
                            <img src={`${process.env.PUBLIC_URL}/img/mission.png`} alt="Company Mission" className='abtImg' />
                            <div className="card-body">
                                <h5 className="card-title text-center">Mission</h5>
                                <p className="card-text text-justify">
                                    {`To maintain a consistently high level of service thus creating a unique standing for our clients and the company throughout.`}
                                    {/* We are committed to constantly learn and relearn every single
                                    day to ensure that we exceed the expectations of our customers thereby leaving an indelible mark behind.
                                    We assure our undivided attention to details to ensure customer satisfaction. */}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 col-12 valueDiv">
                        <div className="card valueCardCls">
                            <img src={`${process.env.PUBLIC_URL}/img/value.png`} alt="Company Values" className='abtImg' />
                            <div className="card-body">
                                <h5 className="card-title text-center">Values</h5>
                                <ul className="card-text text-left ms-3">
                                    <li> Integrity</li>
                                    <li> Commitment </li>
                                    <li> Customer Satisfaction</li>
                                    <li> Team Work</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

                <div className="bg-dark text-center py-3 mt-2">
                    <button onClick={() => { window.open(`${process.env.REACT_APP_LINKEDIN}`) }} className='btn btn-lg btn-outline-light aboutFilterBtnCls'>{`dev-by: `}<small>{`${process.env.REACT_APP_MY_EMAIL}`}</small></button>
                </div>

        </section>
    );
}

export default About;