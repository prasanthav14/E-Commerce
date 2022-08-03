import React from 'react';
// import './AddItemPage.css';
import Head from '../../components/head/head'
import Footer from '../../components/footer/footer'
import About from '../../components/about/about';



function AboutUs() {
  return (
    <>
     {/* <React.StrictMode> */}
      <Head />
      {/* <Carousal /> */}
      <About/>
      {/* </> */}
      <Footer/>
     {/* </React.StrictMode> */}
    </>
  );
}

export default AboutUs;