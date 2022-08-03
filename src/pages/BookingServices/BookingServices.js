import React from 'react';
import Head from '../../components/head/head'
import Footer from '../../components/footer/footer'
import Personaldetails from '../../components/booking/personaldetails/personaldetails';
import Requirements from '../../components/booking/requirements/requirements';
import Bookingpayments from '../../components/booking/bookingpayment/bookingpayments';
import Progresser from "../../components/booking/progresser/progresser.js"

import { bookingStore } from '../../zustand/store';

function BookingServices() {

  const bookingGlobalState = bookingStore(state => state.bookingGlobalState);

  return (
    <>
      {/* <React.StrictMode> */}
      <Head />
      <Progresser />
       {
        bookingGlobalState === "personal" ? <Personaldetails /> :
          bookingGlobalState === "required" ? <Requirements /> :
            bookingGlobalState === "payment" ? <Bookingpayments /> : null
      } 
      {/* <Personaldetails />
      <Requirements />
      <Bookingpayments /> */}
      <Footer />
      {/* </React.StrictMode> */}
    </>
  );
}

export default BookingServices;
