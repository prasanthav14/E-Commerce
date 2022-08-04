import React from 'react';
import './head.css';
// import SearchIcon from '@mui/icons-material/Search';

import { useNavigate } from "react-router-dom";

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import HistoryIcon from '@mui/icons-material/History';

import cartCountStore from '../../zustand/store';
import { userStore } from '../../zustand/store';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Head() {

    const Navigate = useNavigate();

    const userData = userStore(state => state.user.data);
    const loginState = userStore(state => state.user.loginState);
    const logOutUser = userStore(state => state.logOutUser);

    const logInUser = userStore(state => state.logInUser);

    const count = cartCountStore(state => state.countVar)

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    function handleLogin() {
        Navigate("/login")
    }

    const fetchUser = async () => {
        console.log("clicked");

        try {
            const resp = await axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/success`);
            console.log("then");
            // if (resp.status === 200) {
            console.log(resp);
            logInUser(true, resp.data);
            // console.log(resp.data)
            toast.success(`${resp.data.fName} logged-in`);
        } catch (err) {
            console.log("catch");
            console.log("error api fetch: ")
            console.log(err)
            // logOutUser();
        }
    }


    //     axios({
    //         method: 'get',
    //         url: `${process.env.REACT_APP_SERVER_URL}/auth/success`,
    //         withCredentials: true,
    //         responseType: 'json',
    //     })
    //         .then((resp) => {
    //             console.log("then");
    //             // if (resp.status === 200) {
    //             console.log(resp);
    //             logInUser(true, resp.data);
    //             // console.log(resp.data)
    //             toast.success(`${resp.data.fName} logged-in`);
    //             // }
    //         })
    //         .catch(err => {
    //             console.log("catch");
    //             console.log("error api fetch: ")
    //             console.log(err)
    //             logOutUser();
    //         })
    // }


    function handleLogout() {
        axios({
            url: `${process.env.REACT_APP_SERVER_URL}/auth/logout`,
            method: "post",
            responseType: "json"
        })
            .then((resp) => {
                // if (resp.status === 200) {
                // console.log(resp.data);
                logOutUser();
                localStorage.clear();
                // console.log("logged out");
                toast.error(`User logged-out`, {
                    onClose: () => {
                        Navigate("/");
                    }
                });
                // }
            })
            .catch(err => {
                console.log("failed to log out");
                console.log(err)
                toast.error(`Error log-out`);
            })
    }


    const viewHistory = () => {
        Navigate("/history/purchase")
    }

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
            <div className="container">
                <img className='headImg' onClick={fetchUser
                    // () => { Navigate("/") }
                } src={`${process.env.PUBLIC_URL}/img/avlogoed.png`} alt="AV Sounds Logo" />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-auto">
                        <li className="nav-item">
                            <h6 onClick={() => { Navigate("/"); }} className="nav-link active ptrCls" aria-current="page">Home</h6>
                        </li>
                        <li className="nav-item dropdown">
                            <h6 className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">Services</h6>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><small onClick={() => { Navigate("/booking") }} className="dropdown-item py-0 ptrCls">Program Booking</small></li>
                                <li>
                                    <hr className="py-0"></hr>
                                </li>
                                <li><small onClick={() => { Navigate("/rent") }} className="dropdown-item py-0 ptrCls">Rental Services</small></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <h6 onClick={() => { Navigate("/aboutus") }} className="nav-link ptrCls">About Us</h6>
                        </li>
                        {(loginState && (userData.isAdmin)) && <li className="nav-item">
                            <h6 onClick={() => { Navigate("/admin") }} className="nav-link ptrCls">Admin</h6>
                        </li>}
                    </ul>
                    <div className="d-flex flex-row bd-highlight">
                        {/* <SearchIcon fontSize="large" className="me-2 mx-auto my-auto" /> */}
                        <IconButton onClick={() => { Navigate("/cart") }} className="me-4 mx-auto my-auto" aria-label="cart">
                            <StyledBadge badgeContent={count} invisible={count > 0 ? false : true} color="success">
                                <ShoppingCartIcon fontSize="large" />
                            </StyledBadge>
                        </IconButton>
                        {loginState && <HistoryIcon className="me-4 mx-auto my-auto" onClick={viewHistory} fontSize="large" />}
                        <Avatar alt={userData.fName} className="mx-auto my-auto" src={userData.imgUrl} fontSize="small" />

                        <div className="my-auto">
                            {loginState ? <button onClick={handleLogout} className="btn btn-sm ms-3 btn-outline-danger">{"Logout"}</button>
                                : <button onClick={handleLogin} className="btn btn-sm ms-3 btn-outline-dark">Sign-up/Login</button>}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Head
