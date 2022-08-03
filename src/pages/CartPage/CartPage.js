import React from 'react';
import Head from '../../components/head/head'
import Footer from '../../components/footer/footer'
import Cart from '../../components/cart/cart.js';

function CartPage() {
  return (
    <>
      {/* <React.StrictMode> */}
      <Head />
      <Cart />
      <Footer />
      {/* </React.StrictMode> */}
    </>
  );
}

export default CartPage;
