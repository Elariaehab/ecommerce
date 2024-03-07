import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { FallingLines } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { authContext } from '../../Context/Auth/Auth';

export default function Login() {
    const [errMessage, setErrMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    let { token, setToken } = useContext(authContext)
    let navigate = useNavigate()
    let user = {
        email: "",
        password: "",

    };

    async function sendData(value) {
        setLoading(true)
        try {
            let { data } = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signin", value);
            console.log(data);
            if (data.message == "success") {
                setSuccessMessage(data.message);
                localStorage.setItem("tkn", data.token)
                setToken(data.token)
                setTimeout(function () {
                    navigate("/");
                }, 1000) 

            }
            else{
                console.log(data);
            }
        } catch (err) {
            console.log(err.response.data.message);
            setErrMessage(err.response.data.message)
        }
        setLoading(false)
    }
    let valid = Yup.object({
        email: Yup.string().required("email is required").email("enter valid email"),
        password: Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{3,10}$/, "enter valid password"),
    });
    let formik = useFormik({
        initialValues: user,
        onSubmit: sendData,
        validationSchema: valid,
    });
    return (
        <div className='w-75 m-auto'>
            {errMessage ? <div className='alert alert-danger'>{errMessage}</div> : ""}
            {successMessage ? <div className='alert alert-success'>{successMessage}</div> : ""}

            <h2 className='texe-center my-3'>Login Form</h2>
            <form onSubmit={formik.handleSubmit}>


                <label htmlFor='email'>Email:</label>
                <input value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type='text' id='email' placeholder='Enter Your Email' className='form-control my-3' />
                {formik.errors.email && formik.touched.email ? (
                    <div className='alert alert-danger'>{formik.errors.email}</div>
                ) : (""
                )}


                <label htmlFor='password'>Password:</label>
                <input value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type='password' id='password' placeholder='Enter Your Password' className='form-control my-3' />
                {formik.errors.password && formik.touched.password ? (
                    <div className='alert alert-danger'>{formik.errors.password}</div>
                ) : (""
                )}

                <button className='btn btn-outline-success' type='submit'>
                    {loading ? (
                        <FallingLines
                            color="#4fa94d"
                            width="25"
                            visible={true}
                            ariaLabel="falling-circles-loading"
                        />
                    ) : (
                        "Submit"
                    )}

                </button>
            </form>
            <div className="forgotpass m-auto">
                <Link to={'/forgotpassword'}>Forgot Password ?</Link>

            </div>
        </div>
    )
}
