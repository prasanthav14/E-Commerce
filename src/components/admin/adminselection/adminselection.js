import React from 'react';
// import { useNavigate } from "react-router-dom";

// import axios from 'axios';
import { adminStore } from '../../../zustand/store';

function AdminSelection() {
    
    // const Navigate = useNavigate();
  
    // const [loginState, setloginState] = useState(false);
    // const loginState = userStore(state => state.user.loginState);

    const setAdminGlobalState = adminStore(state => state.setAdminGlobalState);

    // useEffect(() => {
    //     // console.log("get authorization")
    //     axios({
    //         method: 'get',
    //         url: `${process.env.REACT_APP_SERVER_URL}/auth/authorize`,
    //         withCredentials: true,
    //         responseType: 'json'
    //     })
    //         .then(res => {
    //             // if (res.status === 200) {
    //                 if (res.data.isAdmin !== 0) {
    //                     // setGdata(res.data);
    //                     setloginState(true);
    //                 }
    //                 else {
    //                     //not admin
    //                     // console.log(res.statusText);
    //                     setloginState(false);
    //                     Navigate("/");
    //                 }
    //             // }
    //             // else {
    //             //     //not loggedin
    //             //     console.log(res.statusText);
    //             //     setloginState(false);
    //             //     // setGdata("");
    //             //     Navigate("/login");
    //             // }
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //             setloginState(false);
    //             // setGdata("");
    //             Navigate("/login");
    //         });

    // }, [loginState])

    return (
        <>
            <div className="mt-2">
                <div className=" bg-dark text-center">
                    <h1 className="text-light">Admin Dashboard</h1>
                </div>
            </div>

            <div className="bg-light my-1 d-flex">
                <div className="my-auto col-lg-4 col-md-4 col-4 bg-primary" style={{ textAlign: "center" }}>
                    <button onClick={() => { setAdminGlobalState("Add Item") }} type='button' className='filterBtnCls btn btn-sm btn-primary'>Add Item</button>
                </div>
                <div className="my-auto col-lg-4 col-md-4 col-4 bg-warning" style={{ textAlign: "center" }}>
                    <button onClick={() => { setAdminGlobalState("Read User") }} type='button' className='filterBtnCls btn btn-sm btn-warning'>Read User</button>
                </div>
                <div className="my-auto col-lg-4 col-md-4 col-4 bg-danger" style={{ textAlign: "center" }}>
                    <button onClick={() => { setAdminGlobalState("Edit User") }} type='button' className='filterBtnCls btn btn-sm btn-danger'>Edit User</button>
                </div>
            </div>

        </>
    )
}

export default AdminSelection;
