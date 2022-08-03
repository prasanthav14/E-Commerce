import React from 'react';
import Footer from '../../components/footer/footer';
import Head from '../../components/head/head.js'
import Singlepost from '../../components/singlepost/singlepost.js';

function SinglePost() {
  return (
    <>
      {/* <React.StrictMode> */}
      <Head />
      <Singlepost />
      <Footer />
      {/* </React.StrictMode> */}
    </>
  );
}

export default SinglePost;
