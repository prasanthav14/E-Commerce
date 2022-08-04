import React from 'react';
import Footer from '../../components/footer/footer';
import Head from '../../components/head/head.js'
import Singlehistory from '../../components/singlehistory/singlehistory';

function SingleHistory() {
  return (
    <>
      {/* <React.StrictMode> */}
      <Head />
      <Singlehistory />
      <Footer />
      {/* </React.StrictMode> */}
    </>
  );
}

export default SingleHistory;
