import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../loader/loader.js';
import axios from 'axios';

import { bookingStore, userStore, bookingDataStore } from '../../../zustand/store';

function Personaldetails() {

    const logInUser = userStore(state => state.logInUser);
    const logOutUser = userStore(state => state.logOutUser);

    const userData = userStore(state => state.user.data);

    // const bookingGlobalState = bookingStore(state => state.bookingGlobalState);
    const setGlobalState = bookingStore(state => state.setGlobalState);

    const setContactData = bookingDataStore(state => state.setContactData);
    // const bookingData = bookingDataStore(state => state.bookingData);

    const [personalInputs, setPersonalInputs] = useState({ fName: "", lName: "", place: "", district: "", phone: "", email: "" });
    const [billingInputs, setBillingInputs] = useState({ billingfName: "", billinglName: "", billingplace: "", billingdistrict: "", billingphone: "", billingemail: "" });
    const [disable, setDisable] = useState(false);

    const Navigate = useNavigate();

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
                    //     console.log("success")
                        logInUser(true, resp.data);
                    // }
                    // else {
                    //     console.log(resp.status + " : " + resp.statusText)
                    //     Navigate("/login")
                    //     logOutUser();
                    // }
                })
                .catch(err => {
                    console.log("error api fetch: ");
                    console.log(err);
                    Navigate("/login");
                    logOutUser();
                })
        }
        fetchUser();

    }, [])

    useEffect(() => {
        setPersonalInputs({ fName: userData.fName, lName: userData.lName, place: "", district: "", phone: "", email: userData.email });
    }, [userData])

    // useEffect(() => {
    // console.log(bookingGlobalState);
    // }, [bookingGlobalState])

    // console.log(personalInputs);
    // console.log(billingInputs);
    // console.log(bookingData);

    function handlePersonalChange(event) {
        const { name, value } = event.target;
        setPersonalInputs(prev => {
            return ({ ...prev, [name]: value })
        });
    }

    function handleBillingChange(event) {
        const { name, value } = event.target;
        setBillingInputs(prev => {
            return ({ ...prev, [name]: value })
        });
    }

    function handleBillingCheck(event) {
        if (event.target.checked) {
            setBillingInputs({ billingfName: personalInputs.fName, billinglName: personalInputs.lName, billingplace: personalInputs.place, billingdistrict: personalInputs.district, billingphone: personalInputs.phone, billingemail: personalInputs.email });
            setDisable(true);
           }
        else {
            setBillingInputs({ billingfName: "", billinglName: "", billingplace: "", billingdistrict: "", billingphone: "", billingemail: "" });
            setDisable(false);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        setContactData({ ...personalInputs, ...billingInputs })
        // setPersonalInputs({ fName: userData.fName, lName: userData.lName, place: "", district: "", phone: "", email: userData.email });
        // setBillingInputs({ billingfName: "", billinglName: "", billingplace: "", billingdistrict: "", billingphone: "", billingemail: "" });
        setGlobalState("required");
    }

    return (

        <>
            {!userData ? <Loader /> :

                <div className="container my-2">
                    <div className="p-3 bg-light">
                        <form onSubmit={handleSubmit} method="POST">

                            <div className="my-3">
                                <h2>Contact Address</h2>
                                <hr/>
                            </div>

                            <div className="row mb-3">
                                <div className="form-group col-lg-4 col-12">
                                    <label htmlFor="Firstname">First name</label>
                                    <input disabled={true} type="text" onChange={handlePersonalChange} className="form-control required" name="fName" value={personalInputs.fName} id="Firstname" placeholder="First name" />
                                </div>
                                <div className="form-group col-lg-2 col-12">
                                    <label htmlFor="Lastname">Last name</label>
                                    <input disabled={true} type="text" onChange={handlePersonalChange} className="form-control required" name="lName" value={personalInputs.lName} id="Lastname" placeholder="Last name" />
                                </div>
                                <div className="form-group col-lg-3 col-12 mb-3 ">
                                    <label htmlFor="validationCustom04">Place</label>
                                    <input required type="text" onChange={handlePersonalChange} className="form-control required" name="place" value={personalInputs.place} id="validationCustom04" placeholder="Place" />
                                </div>
                                <div className="form-group col-lg-3 col-12 mb-3 ">
                                    <label htmlFor="validationCustom04">District</label>

                                    <select required onChange={handlePersonalChange} value={personalInputs.district} name="district" className="form-control required">
                                        <option className='dropdown-item' value="" muted disabled={true}>-Select-</option>
                                        <option className="dropdown-item" value="Ernakulam">Ernakulam</option>
                                        <option className="dropdown-item" value="Thrissur">Thrissur</option>
                                        <option className="dropdown-item" value="Idukki">Idukki</option>
                                        <option className="dropdown-item" value="Kottayam">Kottayam</option>
                                        <option className="dropdown-item" value="Alappuzha">Alappuzha</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="form-group col-lg-6 col-12">
                                    <label htmlFor="inputEmail4">Phone Number</label>
                                    <input required type="tel" onChange={handlePersonalChange} className="form-control required" name="phone" value={personalInputs.phone} id="inputPhone" placeholder="Phone No." />
                                </div>
                                <div className="form-group col-lg-6 col-12">
                                    <label htmlFor="inputEmail4">Email</label>
                                    <input disabled={true} type="email" onChange={handlePersonalChange} className="form-control required" name="email" value={personalInputs.email} id="inputEmail4" placeholder="Email" />
                                </div>
                            </div>

                            <div className="my-3">
                                <h2>Billing Address</h2>
                                <hr/>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6" id="billing address">
                                    <input type="checkbox" onChange={handleBillingCheck} id="billingCheck" />
                                    <label className="form-group ms-2"> Same as personal address</label>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="form-group col-lg-4 col-12">
                                    <label htmlFor="Firstname">First name</label>
                                    <input required type="text" onChange={handleBillingChange} disabled={disable} className="form-control required" name="billingfName" value={billingInputs.billingfName} id="Firstname" placeholder="First name" />
                                </div>
                                <div className="form-group col-lg-2 col-12">
                                    <label htmlFor="Lastname">Last name</label>
                                    <input required type="text" onChange={handleBillingChange} disabled={disable} className="form-control required" name="billinglName" value={billingInputs.billinglName} id="Lastname" placeholder="Last name" />
                                </div>
                                <div className="form-group col-lg-3 col-12 mb-3 ">
                                    <label htmlFor="validationCustom04">Place</label>
                                    <input required type="text" onChange={handleBillingChange} disabled={disable} className="form-control required" name="billingplace" value={billingInputs.billingplace} id="validationCustom04" placeholder="Place" />
                                </div>
                                <div className="form-group col-lg-3 col-12 mb-3 ">
                                    <label htmlFor="validationCustom04">District</label>

                                    <select required onChange={handleBillingChange} disabled={disable} value={billingInputs.billingdistrict} name="billingdistrict" className="form-control required">
                                        <option className='dropdown-item' value="" muted disabled={true}>-Select-</option>
                                        <option className="dropdown-item" value="Ernakulam">Ernakulam</option>
                                        <option className="dropdown-item" value="Thrissur">Thrissur</option>
                                        <option className="dropdown-item" value="Idukki">Idukki</option>
                                        <option className="dropdown-item" value="Kottayam">Kottayam</option>
                                        <option className="dropdown-item" value="Alappuzha">Alappuzha</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="form-group col-lg-6 col-12">
                                    <label htmlFor="inputEmail4">Phone Number</label>
                                    <input required type="tel" onChange={handleBillingChange} disabled={disable} className="form-control required" name="billingphone" value={billingInputs.billingphone} id="inputPhone" placeholder="Phone No." />
                                </div>
                                <div className="form-group col-lg-6 col-12">
                                    <label htmlFor="inputEmail4">Email</label>
                                    <input required type="email" onChange={handleBillingChange} disabled={disable} className="form-control required" name="billingemail" value={billingInputs.billingemail} id="inputEmail4" placeholder="Email" />
                                </div>
                            </div>

                            <button className="btn btn-outline-danger btn-sm" type="submit">Submit </button>
                        </form>

                    </div>
                </div>
            }
        </>
    );
}

export default Personaldetails;