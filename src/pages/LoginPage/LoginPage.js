import React from 'react';
import Footer from '../../components/footer/footer';
import Head from '../../components/head/head.js'
import Login from '../../components/login/login.js';

function LoginPage() {
  return (
    <>
      {/* <React.StrictMode> */}
      <Head />
      <Login />
      <Footer />
      {/* </React.StrictMode> */}
    </>
  );
}

export default LoginPage;
