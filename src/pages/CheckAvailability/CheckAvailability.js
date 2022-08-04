import React from 'react';
import Head from '../../components/head/head'
import Footer from '../../components/footer/footer'
import Checkavailability from '../../components/checkavilablility/checkavailability.js';

function CheckAvailability() {
  return (
    <>
      {/* <React.StrictMode> */}
      <Head />
      <Checkavailability />
      <Footer />
      {/* </React.StrictMode> */}
    </>
  );
}

export default CheckAvailability;
