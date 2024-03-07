import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {

    let nav= useNavigate()

    let [Email, setEmail]=useState('')


async function sendCode(e){
    e.preventDefault()
    try {
        let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',{email:Email})
if(data.statusMsg=='success'){
        toast.success(data.message,{
        duration:2000})

        nav('/codeverification')
    

console.log(data.message);
}        
      
    } catch (error) {
        console.log(error);
    }
}





  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h3 className="text-center mb-4">Forgot Password?</h3>
      <div className="text-center">
        <form>
          <div className="mb-3">
            <input onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" placeholder="Enter Your Email" />
          </div>
          <button onClick={sendCode} type="submit" className="btn btn-info px-4">Submit</button>
        </form>
      </div>
    </div>
  );
}
