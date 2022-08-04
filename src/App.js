import React, { useEffect } from 'react';
import BookingServices from './pages/BookingServices/BookingServices';
import Home from './pages/Home/Home';
import RentServices from './pages/RentServices/RentServices';
import LoginPage from './pages/LoginPage/LoginPage.js';
import AdminPage from './pages/AdminPage/AdminPage.js';
import CheckAvailability from './pages/CheckAvailability/CheckAvailability.js';
import SinglePost from './pages/SinglePost/SinglePost.js';
import CartPage from './pages/CartPage/CartPage.js';
import HistoryPage from './pages/HistoryPage/HistoryPage.js';
import AboutUs from './pages/AboutUs/AboutUs.js';
import SingleHistory from './pages/SingleHistory/SingleHistory';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios"

import { BrowserRouter, Route, Routes } from "react-router-dom";

import cartCountStore from './zustand/store';
import { userStore } from './zustand/store';


function App() {

  const cartCount = cartCountStore(state => state.cartCount);
  const logInUser = userStore(state => state.logInUser);
  const logOutUser = userStore(state => state.logOutUser);

  useEffect(() => {

    const fetchUser = () => {
      axios({
        method: 'get',
        url: `${process.env.REACT_APP_SERVER_URL}/auth/success`,
        withCredentials: true,
        responseType: 'json'
      })
        .then((resp) => {
          // if (resp.status === 200) {
            // console.log("success")
            logInUser(true, resp.data);
            // console.log(resp.data)
            toast.success(`${resp.data.fName} logged-in`);
          // }
        })
        .catch(err => {
          console.log("error api fetch: ")
          console.log(err)
          logOutUser();
        })
    }
    fetchUser();

  }, [])

  useEffect(() => {
    if (localStorage.getItem("item"))
      cartCount(JSON.parse(localStorage.getItem("item")).length);
    else
      cartCount(0);
  }, [])

  return (
    <>

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />}>   </Route>

          <Route path="/rent" element={<RentServices />}> </Route>

          <Route path="/booking" element={<BookingServices />}> </Route>

          <Route path="/login" element={<LoginPage />}> </Route>

          <Route path="/admin" element={<AdminPage />}> </Route>

          <Route path="/availability/:selector" element={<CheckAvailability />}> </Route>

          <Route path="/singlepost/:refId" element={<SinglePost />}> </Route>

          <Route path="/cart" element={<CartPage />}> </Route>

          <Route path="/history/:bookorpurchase" element={<HistoryPage />}> </Route>

          <Route path="/aboutus" element={<AboutUs />}> </Route>

          <Route path="/singlehistory/:orderid" element={<SingleHistory />}> </Route>

        </Routes>
      </BrowserRouter>

      <ToastContainer autoClose={700} hideProgressBar={true} newestOnTop={true} position={toast.POSITION.TOP_CENTER} />

    </>
  );
}

export default App;
