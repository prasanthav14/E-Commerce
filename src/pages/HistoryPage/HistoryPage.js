import React from 'react';
import Head from '../../components/head/head'
import Footer from '../../components/footer/footer'
import Purchasehistory from '../../components/purchasehistory/purchasehistory.js';

function HistoryPage() {
  return (
    <>
      {/* <React.StrictMode> */}
      <Head />
      <Purchasehistory />
      <Footer />
      {/* </React.StrictMode> */}
    </>
  );
}

export default HistoryPage;
