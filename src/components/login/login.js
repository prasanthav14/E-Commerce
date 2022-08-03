import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './login.css';

import { userStore } from '../../zustand/store.js';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [allUsers, setAllUsers] = useState([]);
    const [isUsersLoaded, setIsUsersLoaded] = useState(false);

    const logInUser = userStore(state => state.logInUser);
    // const logOutUser = userStore(state => state.logOutUser);
    const Navigate = useNavigate();

    useEffect(() => {

        axios({
            method: 'get',
            url: `${process.env.REACT_APP_SERVER_URL}/auth/allusers`,
            withCredentials: true,
            responseType: 'json'
        })
            .then((resp) => {
                // if (resp.status === 200) {
                // console.log("all users fetched")
                // console.log(resp)
                setAllUsers(resp.data)
                setIsUsersLoaded(true)
                // }
                // else {
                //     console.log(resp.status + " : " + resp.statusText)
                //     setIsUsersLoaded(false)
                // }
            })
            .catch(err => {
                console.log("error userfetch at login: ");
                console.log(err);
                setIsUsersLoaded(false)
            })

    }, [])


    const handleClick = (selectedUser) => {
        // if (resp.status === 200) {
        // console.log("success")
        logInUser(true, selectedUser);
        // console.log(resp.data)
        localStorage.setItem("user", JSON.stringify(selectedUser));
        toast.success(`${selectedUser.fName} logged-in`, {
            onClose: () => {
                Navigate("/");
            }
        });
        // }
    }

    return (
        <>
            <section className="mt-3 vh-auto">
                <div className="container loginContainer">

                    <div className="">
                        <div className="card shadow-2-strong my-5" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-5 text-center">

                                <h3 className="my-3">Sign in</h3>

                                <div className="mb-3">
                                    <img src={`${process.env.REACT_APP_LOGIN_IMG_URL}`}
                                        className="img-fluid mx-auto" alt="sample" />
                                </div>

                                {/* <hr className="my-4" />
                                    
                                    <div className="form-outline mb-4">
                                        <input type="email" id="typeEmailX-2" disabled className="form-control form-control" />
                                        <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="password" id="typePasswordX-2" disabled className="form-control form-control" />
                                        <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                              npm run build       </div>

                                    <button className="btn btn-secondary btn-block" disabled type="button">Login</button>  */}
                                <div className='row'>
                                    <button onClick={() => { window.open(`${process.env.REACT_APP_SERVER_URL}/auth/google`, "_self") }} className="btn btn-block btn-primary mb-3" style={{ backgroundColor: "#dd4b39" }}><i className="fab fa-google me-2"></i> Sign in with google</button>
                                    <small className='text-info text-center'>NB: Login section of this app is under development. Please select a user from the following list to continue.</small>
                                </div>
                                {
                                    isUsersLoaded &&
                                    <>
                                        <div className="col-lg-6 col-md-8 col-12 my-1 adminInnerContainer1">

                                            <table className='allUsersTableCls'>
                                                <thead>
                                                    <tr>
                                                        <th className="allUsersRowCenter">Sl.No</th>
                                                        <th className="allUsersRowCenter">Email</th>
                                                        <th className="allUsersRowCenter">Adm</th>
                                                        <th className="allUsersRowCenter">Select</th>
                                                    </tr>
                                                </thead>
                                                {
                                                    allUsers.map((user, index) => {
                                                        return (
                                                            <tbody key={index}>
                                                                <tr>
                                                                    <td className="allUsersRowCenter"><small>{index + 1}</small></td>
                                                                    <td className="allUsersRowCenter"><small>{user.email}</small></td>
                                                                    <td className="allUsersRowCenter"><small>{user.isAdmin ? "T" : "F"}</small></td>
                                                                    <td className="allUsersRowCenter"><button onClick={() => { handleClick(allUsers[index]) }} className='btn- btn-sm btn-primary'>login</button></td>
                                                                </tr>
                                                            </tbody>
                                                        )
                                                    })
                                                }
                                            </table>
                                        </div>

                                    </>
                                }

                            </div>
                        </div>
                    </div>


                </div>

            </section>
        </>
    )
}

export default Login;