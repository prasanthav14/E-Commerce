import React from 'react';
import Welcome from '../../components/welcome/welcome';
// import Carousal from '../../components/carousal/carousal';
import Contact from '../../components/contact/contact';
import Gallery from '../../components/gallery/gallery';
import Head from '../../components/head/head'
import Footer from '../../components/footer/footer'
import RentalInfo from '../../components/rentalinfo/rentalinfo';
import BookingInfo from '../../components/bookinginfo/bookinginfo';

function Home() {
  return (
    <>
     {/* <React.StrictMode> */}
      <Head />
      {/* <Carousal /> */}
      <Welcome/>
      <BookingInfo/>
      <RentalInfo/>
      <Gallery/>
      <Contact/>
      <Footer/>
     {/* </React.StrictMode> */}
    </>
  );
}

export default Home;
