import React, { useState, useEffect, useRef } from 'react';
import './requirements.css';
import Loader from '../../loader/loader.js';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { bookingStore, bookingDataStore } from '../../../zustand/store';

function Requirements() {

    const setGlobalState = bookingStore(state => state.setGlobalState);
    // const bookingGlobalState = bookingStore(state => state.bookingGlobalState);

    // const userData = userStore(state => state.user.data);
    // const loginState = userStore(state => state.user.loginState);

    const setBookingItems = bookingDataStore(state => state.setBookingItems);
    const bookingData = bookingDataStore(state => state.bookingData);
    // const setAmount = bookingDataStore(state => state.setAmount);

    const [inputs, setInputs] = useState({ eventDate: "", eventTime: "", eventName: "", comments: "", pawattage: "", onstage: true, openstage: false, pasystem: true, illumination: false, powersystem: false });
    const [itemReq, setitemReq] = useState([]);
    const [itemsDataArr, setItemsDataArr] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const totalRef = useRef(0);
    // const Navigate = useNavigate();
    const categoryNameArr = [{ ref: "paSystem", name: "PA System" }, { ref: "illuminary", name: "Illuminary" }, { ref: "powerSystem", name: "Power System" }]
    const [cartRefresh, setcartRefresh] = useState(false);      // only for refreshing the amounts according to the qty set

    const formatDate = (daysAfter) => {

        const d = new Date(new Date().getTime() + daysAfter * 24 * 60 * 60 * 1000)
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const minDate = formatDate(2);
    const maxDate = formatDate(60);
    // console.log(minDate);
    // console.log(maxDate);

    useEffect(() => {
    }, [cartRefresh]);

    useEffect(() => {

        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/item/readitem`,
        })
            .then((response) => {
                // if (response.status === 200) {
                    setItemsDataArr([...response.data]);
                    setIsLoaded(true);
                // }
                // else {
                //     console.log(response.status);
                //     console.log(response.statusText);
                //     setIsLoaded(false);
                //     setItemsDataArr([]);
                // }
            })
            .catch((err)=>{
                console.log("error @ readitem booking req");
                console.log(err);
                setIsLoaded(false);
                setItemsDataArr([]);
            })

    }, []);


    function handleChange(event) {
        const { name, value } = event.target;
        setInputs(prev => {
            return ({ ...prev, [name]: value })
        });
    }

    function handleCheck(event) {
        const { name, checked } = event.target;
        setInputs(prev => {
            return ({ ...prev, [name]: checked })
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let filteredItemAmount = 0;

        const filteredItemReq = itemReq.filter(e => (e.qty <= 250 && e.qty > 0));
        filteredItemReq.map(e => {
            filteredItemAmount += e.qty * e.price
            return (null);
        })
        if (totalRef.current >= 400 && totalRef.current <= 10000) {
            setBookingItems(bookingData.contactData, { ...inputs, items: filteredItemReq }, filteredItemAmount);
            setInputs({ eventDate: "", eventTime: "", eventName: "", comments: "", pawattage: "", onstage: true, openstage: false, pasystem: true, illumination: false, powersystem: false });
            setitemReq([]);
            // console.log(bookingData);

            // console.log(bookingGlobalState);
            setGlobalState("payment")
        }
        else
            toast.warning("Payments within 400 to 10000 are allowed");
    }

    // console.log(bookingData);
    totalRef.current = 0;
    itemReq.map(e => {
        totalRef.current += (e.price * e.qty);
        return (null);
    })

    // console.log(itemReq);
    // console.log(bookingData);

    return (

        <>

            {!isLoaded ? <Loader /> :

                <div className="my-1">
                    <div className="p-3 bg-light">
                        <form onSubmit={handleSubmit} method="POST">

                            <div className="row mb-3">
                                <h2>Event Details</h2>
                                <hr />
                            </div>

                            <div className="row mb-3">
                                <div className="form-group col-lg-4 col-md-4 col-6">
                                    <label htmlFor="eventName">Event Name</label>
                                    <input type="text" required onChange={handleChange} className="form-control" name="eventName" value={inputs.eventName} id="eventName" placeholder='eg: Birth day party..' />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="form-group col-lg-4 col-md-4 col-6">
                                    <label htmlFor="eventDate">Event Date</label>
                                    <input type="date" min={minDate} max={maxDate} required onChange={handleChange} className="form-control" name="eventDate" value={inputs.eventDate} id="eventDate" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="form-group col-lg-4 col-md-4 col-6">
                                    <label htmlFor="eventTime">Event Time</label>
                                    <input type="time" required onChange={handleChange} className="form-control" name="eventTime" value={inputs.eventTime} id="eventTime" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="form-group" htmlFor="EventType">Event type</label>
                                <div className="btn-group btn-group-toggle inline" id="EventType" data-toggle="buttons">
                                    <label htmlFor="onstage" className="form-group me-2">
                                        <input type="checkbox" onChange={handleCheck} checked={inputs.onstage} name="onstage" id="onstage" /> On Stage</label>
                                    <label htmlFor="openstage" className="form-group">
                                        <input type="checkbox" onChange={handleCheck} checked={inputs.openstage} name="openstage" id="openstage" /> Open Stage</label>
                                </div>
                            </div>


                            <div className="row mb-3">
                                <label className="form-group" htmlFor="Firstname">Required services </label>
                                <div className="btn-group btn-group-toggle inline" data-toggle="buttons">
                                    <label htmlFor="pasystem" className="form-group me-2">
                                        <input type="checkbox" onChange={handleCheck} checked={inputs.pasystem} name="pasystem" id="pasystem" /> PA System</label>
                                    <label htmlFor="illumination" className="form-group me-2">
                                        <input type="checkbox" onChange={handleCheck} checked={inputs.illumination} name="illumination" id="illumination" /> Illumination</label>
                                    <label htmlFor="powersystem" className="form-group">
                                        <input type="checkbox" onChange={handleCheck} checked={inputs.powersystem} name="powersystem" id="powersystem" /> Power System</label>
                                </div>
                            </div>


                            {inputs.pasystem &&
                                <div className="row">
                                    <div className="form-group col-lg-6 col-md-12 col-12">
                                        <label htmlFor="comments">Expected wattage of PA system</label>
                                        <input required onChange={handleChange} value={inputs.pawattage} name="pawattage" className="form-group form-control mb-3" id="pawattage" placeholder="eg: 5000W" />
                                    </div>
                                </div>
                            }

                            {(!isLoaded) ? <Loader /> :
                                <section>

                                    <div className="row">

                                        <div className="row my-2">
                                            <h2 htmlFor="Firstname">Requirements</h2>
                                            <hr />
                                        </div>

                                        {categoryNameArr.map((categoryName, ind) => {

                                            const CatogoryWiseDataArr = itemsDataArr.filter(itemsData => (itemsData[categoryName.ref] === true));
                                            const subCategoryNamesArr = [];
                                            CatogoryWiseDataArr.map(CatogoryWiseData => {
                                                subCategoryNamesArr.push(CatogoryWiseData.subCategory)
                                                return (null);
                                            })
                                            const uniqueSubCategoryNames = [...new Set(subCategoryNamesArr)];
                                            // console.log(uniqueSubCategoryNames);
                                            return (
                                                <div key={ind}>
                                                    <h4 className="card-title m-2">{categoryName.name}</h4>

                                                    <div className="col-lg-8 col-md-12 col-12">
                                                        <table className='tableCls'>
                                                            <thead>
                                                                <tr>
                                                                    <th className="allUsersRowCenter">Sl.No</th>
                                                                    <th className="allUsersRowCenter">Sub category</th>
                                                                    <th className="allUsersRowCenter">Approx Rent</th>
                                                                    <th className="allUsersRowCenter">Qty</th>
                                                                </tr>
                                                            </thead>
                                                            {uniqueSubCategoryNames.map((uniqueSubCategoryName, index) => {
                                                                let avgPrice = 0;
                                                                const CatogoryWiseData = CatogoryWiseDataArr.filter(CatogoryWiseData => (CatogoryWiseData.subCategory === uniqueSubCategoryName))

                                                                CatogoryWiseData.map(categoryEle => {
                                                                    avgPrice += categoryEle.price;
                                                                    return (null);
                                                                })
                                                                avgPrice /= CatogoryWiseData.length;

                                                                return (
                                                                    <tbody key={index}>
                                                                        <tr >
                                                                            <td className="allUsersRowCenter">{index + 1}</td>
                                                                            <td className="allUsersRowCenter">{uniqueSubCategoryName}</td>
                                                                            <td className="allUsersRowCenter">{avgPrice}</td>
                                                                            <td className="allUsersRowCenter setWidthDiv">

                                                                                {/* {!more ? <select className="setWidth" onChange={event => {
                                                                                    if (event.target.value < 10) {
                                                                                        const temp = itemReq.filter(e => (e.subCategory === uniqueSubCategoryName))
                                                                                        if (temp.length > 0)
                                                                                            temp.map(e => (e.qty = event.target.value))
                                                                                        else
                                                                                            setitemReq(prev => [...prev, { category: categoryName.name, subCategory: uniqueSubCategoryName, qty: event.target.value, price: avgPrice }]);
                                                                                    }
                                                                                    else
                                                                                        setMore(true);
                                                                                    setcartRefresh(prev => (!prev)) // only for refreshing the amounts according to the qty set
                                                                                }} id='quantity' defaultValue={0}>
                                                                                    <option muted>0</option>
                                                                                    <option value={1}>1</option>
                                                                                    <option value={2}>2</option>
                                                                                    <option value={3}>3</option>
                                                                                    <option value={4}>4</option>
                                                                                    <option value={5}>5</option>
                                                                                    <option value={6}>6</option>
                                                                                    <option value={7}>7</option>
                                                                                    <option value={8}>8</option>
                                                                                    <option value={9}>9</option>
                                                                                    <option value={10}>more</option>
                                                                                </select>
                                                                                    : */}
                                                                                <input min={0} className="setWidth" type="number" onChange={event => {

                                                                                    if (event.target.value >= 0 && event.target.value <= 250) {
                                                                                        const temp = itemReq.filter(e => (e.subCategory === uniqueSubCategoryName))
                                                                                        if (temp.length > 0)
                                                                                            temp.map(e => (e.qty = event.target.value))
                                                                                        else
                                                                                            setitemReq(prev => [...prev, { category: categoryName.name, subCategory: uniqueSubCategoryName, qty: event.target.value, price: avgPrice }])
                                                                                    }
                                                                                    setcartRefresh(prev => (!prev)) // only for refreshing the amounts according to the qty set

                                                                                }} id='quantity' defaultValue={0}></input>

                                                                                {/* } */}

                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                )
                                                            })
                                                            }
                                                        </table>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                        <div className=" mt-3">
                                            <h2 htmlFor="Comments">Comments</h2>
                                            <hr />
                                            <div className="col-lg-6 col-md-8 col-12">
                                                <textarea required onChange={handleChange} value={inputs.comments} name="comments" className="form-group form-control mb-3" id="comments" placeholder="Note down your comments...">
                                                </textarea>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <h2 htmlFor="Total Rent">Total Rent</h2>
                                            <hr />
                                        </div>
                                        <h2 className="m-3 priceTag" name="Total Rent">{`Rs.${totalRef.current}/-`}</h2>

                                    </div>
                                </section>
                            }
                            <button className="btn btn-outline-danger btn-sm my-2" name="RequirementSubmit" type="submit">Submit</button>
                        </form>

                    </div>
                </div>
            }
        </>
    );
}

export default Requirements;