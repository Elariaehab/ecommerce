import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Codeverification() {
    let nav=useNavigate()
    let [code, setCode] = useState('')

    async function verifyCode(e) {
        e.preventDefault()
        try {
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',{ resetCode: code })
            if (data.status == 'Success') {
                toast.success('Code Verified', {
                    duration: 2000
                })
                    nav('/resetPassword')
            }
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }










    return (
        <>
            <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
                <h3 className="text-center mb-4">Enter The Reset Password Code</h3>
                <div className="text-center">
                    <form>
                        <div className="mb-3">
                            <input onChange={(e)=>setCode(e.target.value)} type="text" className="form-control" placeholder="Reset Code" />
                        </div>
                        <button onClick={verifyCode} type="submit" className="btn btn-info px-4">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}
