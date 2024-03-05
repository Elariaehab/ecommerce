import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { FallingLines} from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";

export default function Register() {
    const [errMessage, setErrMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate()
    let user = {  
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
};

async function sendData(value){
    setLoading(true)
    try{
        let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", value);
        if(data.message == "success"){
        setSuccessMessage("login");
        setTimeout(function(){
            navigate("/Login");
        } , 1000);
       
        }
    }catch(err){
        console.log(err.response.data.message);
        setErrMessage(err.response.data.message)
    }  
    setLoading(false)
}
let valid = Yup.object({
    name: Yup.string().required("name is required").min(3 , "min length is 3 chars").max(10 , "max length is 10 chars"),
    email: Yup.string().required("email is required").email("enter valid email"),
    password:Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{3,10}$/ , "enter valid password"),
    rePassword:Yup.string().required("repassword is required").oneOf([Yup.ref("password")] , "enter same password"),
    phone:Yup.string().required("phone is required").matches(/^01[0125][0-9]{8}$/ , "enter egyption number"),
});
 let formik = useFormik({
    initialValues:user,
    onSubmit:sendData,
    validationSchema:valid,
});
    return  (
   <div className='w-75 m-auto'>
    {errMessage? <div className='alert alert-danger'>{errMessage}</div> : ""}
    {successMessage? <div className='alert alert-success'>{successMessage}</div> : ""}
    
    <h2 className='texe-center my-3'>Register Form</h2>
  <form onSubmit={formik.handleSubmit}>
    
    <label htmlFor='name'>Name:</label>
    <input  value={formik.values.name}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
     type='text' id='name' placeholder='Enter Your Name' className='form-control my-3'/>

     {formik.errors.name && formik.touched.name?(
      <div className='alert alert-danger'>{formik.errors.name}</div>
     ):(""
    )}
    

    <label htmlFor='email'>Email:</label>
    <input  value={formik.values.email}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     type='text' id='email' placeholder='Enter Your Email' className='form-control my-3'/>
      {formik.errors.email && formik.touched.email ?(
      <div className='alert alert-danger'>{formik.errors.email}</div>
     ):(""
    )}
    

    <label htmlFor='password'>Password:</label>
    <input  value={formik.values.password} 
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
    type='password' id='password' placeholder='Enter Your Password' className='form-control my-3'/>
     {formik.errors.password && formik.touched.password ?(
      <div className='alert alert-danger'>{formik.errors.password}</div>
     ):(""
    )}
    

    <label htmlFor='rePassword'>RePassword:</label>
    <input  value={formik.values.rePassword}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     type='password' id='rePassword' placeholder='Enter Your RePassword' className='form-control my-3'/>
      {formik.errors.rePassword && formik.touched.rePassword ?(
      <div className='alert alert-danger'>{formik.errors.rePassword}</div>
     ):(""
    )}
    

    <label htmlFor='phone'>Phone:</label>
    <input  value={formik.values.phone}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     type='tel' id='phone' placeholder='Enter Your Phone' className='form-control my-3'/>
      {formik.errors.phone && formik.touched.phone?(
      <div className='alert alert-danger'>{formik.errors.phone}</div>
     ):(""
    )}
    

    <button className='btn btn-outline-success' type='submit'>
        {loading? ( 
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
  </div> 
  )
 }
    