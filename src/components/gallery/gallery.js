import React from 'react';
import './gallery.css';

function Gallery() {
    return (
        <section>
            <div id="gallery" className="mt-2">
                <div className=" bg-dark text-center">
                    <h1 className="text-light ">Our Brands</h1>
                </div>
            </div>

            <div className="container mb-2">
                <div id="carouselExampleDark" className="carouselCls carousel carousel-dark slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button className="active" type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="4" aria-label="Slide 5"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="5" aria-label="Slide 6"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="6" aria-label="Slide 7"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="7" aria-label="Slide 8"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="8" aria-label="Slide 9"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="9" aria-label="Slide 10"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="10" aria-label="Slide 11"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="2500">
                            <img className="d-block w-100" src={`${process.env.PUBLIC_URL}/img/ph1.jpg`} alt="First slide" />
                        </div>
                        <div className="carousel-item" data-bs-interval="2500">
                            <img className="d-block w-100" src={`${process.env.PUBLIC_URL}/img/ph2.jpg`} alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={`${process.env.PUBLIC_URL}/img/ph3.png`} alt="Third slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={`${process.env.PUBLIC_URL}/img/ph4.jpg`} alt="Forth slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={`${process.env.PUBLIC_URL}/img/ph5.png`} alt="fifth slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={`${process.env.PUBLIC_URL}/img/ph6.jpg`} alt="sixth slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={`${process.env.PUBLIC_URL}/img/ph7.jpg`} alt="seventh slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={`${process.env.PUBLIC_URL}/img/ph8.png`} alt="eighth slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={`${process.env.PUBLIC_URL}/img/ph9.png`} alt="nineth slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={`${process.env.PUBLIC_URL}/img/ph10.jpg`} alt="tenth slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={`${process.env.PUBLIC_URL}/img/ph11.jpg`} alt="eleventh slide" />
                        </div>

                    </div>
                    {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button> */}
                </div>
            </div>
            
        </section>
    );
}

export default Gallery;