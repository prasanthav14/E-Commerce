import React from 'react';
import './rentalinfo.css';
import { useNavigate } from "react-router-dom"

function RentalInfo() {

    const Navigate = useNavigate();

    return (
        <section>

                <div className=" bg-dark text-center mt-2">
                    <h1 className="text-light">Rental Services</h1>
                </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-12 paDiv">
                        <div className="card AvailabilityCard">
                            <img src={`${process.env.PUBLIC_URL}/img/PA.png`} alt="PA System" className="availabilityLogo" />
                            <div className="card-body">
                                <h5 className="card-title text-center">PA Systems</h5>
                                <p className="card-text text-center">Make use of our the available PA Syastems with us...</p>
                                <button onClick={() => { Navigate("/availability/paSystem") }} className="btn btn-primary mx-auto">Check Availability </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 col-12 illuDiv">
                        <div className="card AvailabilityCardmx-auto">
                            <img src={`${process.env.PUBLIC_URL}/img/illu.png`} alt="Illumination System" className="availabilityLogo" />
                            <div className="card-body">
                                <h5 className="card-title text-center">Illumination</h5>
                                <p className="card-text text-center">Make use of our the available illuminaries with us...</p>
                                <button onClick={() => { Navigate("/availability/illuminary") }} className="btn btn-primary mx-auto">Check Availability</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 col-12 powerDiv">
                        <div className="card AvailabilityCard">
                            <img src={`${process.env.PUBLIC_URL}/img/power.png`} alt="Power System" className="availabilityLogo" />
                            <div className="card-body">
                                <h5 className="card-title text-center">Power Systems</h5>
                                <p className="card-text text-center">Make use of our the available Power Systems with us...</p>
                                <button onClick={() => { Navigate("/availability/powerSystem") }} className="btn btn-primary mx-auto">Check Availability</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default RentalInfo;