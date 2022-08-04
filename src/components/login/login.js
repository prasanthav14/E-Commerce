import React from 'react';
import './login.css';

function Login() {

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
                                    </div>

                                    <button className="btn btn-secondary btn-block" disabled type="button">Login</button>  */}

                                <button onClick={() => { window.open(`${process.env.REACT_APP_SERVER_URL}/auth/google`, "_self") }} className="btn btn-block btn-primary mb-3" style={{ backgroundColor: "#dd4b39" }}><i className="fab fa-google me-2"></i> Sign in with google</button>

                            </div>
                        </div>
                    </div>


                </div>

            </section>
        </>
    )
}

export default Login;