import React from 'react';
import './bookinginfo.css';
import { useNavigate } from "react-router-dom";
// import axios from 'axios';


function BookingInfo() {

    const Navigate = useNavigate();

    function HandleClick() {
        Navigate("/booking");
    }

    return (

        <section>
            <div id="rental" className="mt-2">
                <div className="bg-dark text-center">
                    <h1 className="text-light">Booking Services</h1>
                </div>
            </div>

            <div className='container'>
                <div className="card bg-light text-dark row">
                    {/* <div className="card text-dark"> */}
                        <img className="bookingInfoImg" src={`${process.env.PUBLIC_URL}/img/booking_cover.jpg`} alt="Website Cover" />

                    <div className="card-img-overlay">
                        <div className="col-lg-8 col-md-8">
                            <div className="card bookinginfoCard">
                                <div className="card-body">
                                    <h2 className="card-title">Pre-Booking</h2>
                                    <p className="card-text">Online booking for our services are available now. Hurry...</p>
                                    <button onClick={HandleClick} className="ms-auto btn btn-sm btn-primary">Book Now</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* <div className="row ps-5 pe-5 pt-2">
                <div className="card mx-auto">
                    <img src="img\booking_cover.png" alt="PA System" className="paImg" />
                    <div className="card-body">
                        <h5 className="card-title text-center">Pre-Booking</h5>
                        <p className="card-text text-center">Online booking for our services are available now. Hurry...</p>
                        <button onClick={HandleClick} className="btn btn-primary ms-5">Book</button>
                    </div>
                </div>
            </div> */}

        </section>
    );
}

export default BookingInfo;