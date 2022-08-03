import React, { useState } from 'react';
import './addadmin.css';
import axios from 'axios';
import Loader from "../../loader/loader.js";
import { adminStore } from '../../../zustand/store';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddAdmin() {

    const [email, setEmail] = useState("");
    const [selectedUser, setSelectedUser] = useState([]);
    const [isUserExist, setIsUserExist] = useState(false);
    const [isLoaded, setIsLoaded] = useState(true);
    const [entrySelect, setEntrySelect] = useState("fName");
    const [entry, setEntry] = useState("");

    const adminGlobalState = adminStore(state => state.adminGlobalState);

    const handleSubmit = (event) => {

        event.preventDefault();
        setIsLoaded(false);
        setEntrySelect("fName");
        setEmail(event.target[0].value);

        axios({
            method: 'post',
            url: `${process.env.REACT_APP_SERVER_URL}/auth/admin`,
            data: { emailId: email },
            responseType: 'json',
        })
            .then((resp) => {
                // if (resp.status === 200) {
                // console.log(resp.data);
                // console.log("data transfer success");
                if (resp.data.user) {
                    setSelectedUser(resp.data.user);
                    setIsLoaded(true);
                    setIsUserExist(true);
                }
                else {
                    setSelectedUser("");
                    setIsUserExist(false);
                    setIsLoaded(true);
                    toast.error("User not found!");
                }
                // }
                // else {
                //     console.log(resp.status + " : " + resp.statusText);
                //     setIsUserExist(false);
                //     setIsLoaded(true);
                //     setEmail("");
                // }
            })
            .catch(err => {
                console.log("error fetching user: ")
                console.log(err)
                setIsUserExist(false);
                setIsLoaded(true);
                setEmail("");
            })
    }

    const handleUpdate = () => {

        axios({
            method: 'patch',
            url: `${process.env.REACT_APP_SERVER_URL}/auth/admin`,
            data: { email: email, entrySelect: entrySelect, entry: entry },
            responseType: 'json',
        })
            .then((resp) => {
                // if (resp.status === 200) {
                // console.log(resp.data);
                // console.log("data transfer success");
                toast.success("User updated");
                setEntry("")
                // }
                // else {
                //     console.log(resp.status + " : " + resp.statusText)
                // }
            })
            .catch(err => {
                toast.error("Error updating user");
                console.log("error adding admin: ");
                console.log(err);
            })
    }

    return (
        <>
            <div className='container upadeteUserContainer'>
                <div className="row my-1 bg-light p-2">

                    <div className="row my-1 text-left">
                        <h2>{adminGlobalState}</h2>
                        <hr />
                    </div>

                    <div className="col-lg-6 col-md-8 col-12">

                        <form onSubmit={handleSubmit}>
                            <label htmlFor="add admin">User email</label>
                            <div className="form-group mb-3">
                                <input required onChange={(event) => { setEmail(event.target.value) }} value={email} type="email" name="email" className="form-control" id="add admin" placeholder="Enter the user email" />
                            </div>

                            <div className="form-group mb-4">
                                <button type="submit" className="btn btn-sm btn-primary">Find User</button>
                            </div>
                        </form>

                        {(!isLoaded) ? <Loader /> :
                            <>
                                {
                                    isUserExist &&
                                    <div className="row">

                                        <table className='updateUserTableCls'>
                                            <thead>
                                                <tr>
                                                    {/* <th className="allUsersRowCenter">Sl.No</th> */}
                                                    <th className="allUsersRowCenter">F Name</th>
                                                    <th className="allUsersRowCenter">L Name</th>
                                                    <th className="allUsersRowCenter">Email</th>
                                                    <th className="allUsersRowCenter">Adm</th>
                                                </tr>
                                            </thead>
                                            {/* {
                                                selectedUser.map((user, index) => {
                                                    return ( */}
                                            {/* <tbody key={index}> */}
                                            <tbody>
                                                <tr>
                                                    {/* <td className="allUsersRowCenter"><small>{index + 1}</small></td> */}
                                                    <td className="allUsersRowCenter"><small>{selectedUser.fName}</small></td>
                                                    <td className="allUsersRowCenter"><small>{selectedUser.lName}</small></td>
                                                    <td className="allUsersRowCenter"><small>{selectedUser.email}</small></td>
                                                    <td className="allUsersRowCenter"><small>{selectedUser.isAdmin ? "T" : "F"}</small></td>
                                                </tr>
                                            </tbody>
                                            {/* )
                                                })
                                            } */}
                                        </table>

                                        <div className="row mb-2">

                                            <div className="col-lg-6 col-md-6 col-6 ">
                                                <select onChange={(event) => { setEntrySelect(event.target.value) }} className="form-select" aria-label="select the entry">
                                                    <option value='fName'>First Name</option>
                                                    <option value='lName'>Last Name</option>
                                                    <option value='imgUrl'>Image URL</option>
                                                    <option value='isAdmin'>IsAdmin</option>
                                                </select>
                                            </div>

                                            <div className="col-lg-6 col-md-6 col-6">
                                                <input type="text" onChange={(event) => { setEntry(event.target.value) }} value={entry} className="form-control" name="entry" id="entry" placeholder={entrySelect === "isAdmin" ? "true/false" : "Enter the input..."} />
                                            </div>

                                        </div>

                                        <div className='mb-4'>
                                            <button onClick={handleUpdate} type="button" className="btn btn-sm btn-danger mb-3">Update</button>
                                        </div>

                                    </div>
                                }
                            </>
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default AddAdmin;
