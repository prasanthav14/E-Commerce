import React from 'react';
import './contact.css';

function Contact() {
    return (
        <section>
                <div className=" bg-dark text-light text-center">
                    <h1>Locate Us</h1>
                </div>

            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">

                        <div className="card text-danger my-2">
                            <div className="card-header text-light bg-danger">Info</div>
                            <div className="card-body">
                                <h5 className="card-title">AV Light and Sound</h5>
                                <p className="card-text">Prop. Mr. Venu AG
                                    <br />
                                    Phone Number
                                    <br />
                                    Mobile Number
                                    <br />
                                    Email: prasanthav14@gmail.com
                                </p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header text-light bg-danger">Address</div>
                            <div className="card-body">
                                {/* <h5 className="card-title">Light card title</h5> */}
                                <p className="card-text text-danger"> House Name
                                    <br />
                                    Kariyad
                                    <br />
                                    Nedumbassery Village
                                    <br />
                                    Ernakulam - dist.
                                    <br />
                                    Kerala, india
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className=" col-lg-6 col-md-6 col-12">

                        <div className="google-map-code">
                        <iframe title='Locate on map' className="mapCls" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`${process.env.REACT_APP_MAP_URL}`}></iframe>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}

export default Contact;