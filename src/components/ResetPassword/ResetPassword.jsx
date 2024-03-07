import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {
    let nav = useNavigate()

    let [Email, setEmail] = useState('')
    let [NewPassword, setNewPassword] = useState('')






    async function resetPass(e) {
        e.preventDefault()
        try {
            let { data } = await axios.put('https://route-ecommerce.onrender.com/api/v1/auth/resetPassword', { email: Email, newPassword: NewPassword })
            toast.success('Password Changed !', {
                duration: 2000
            })
            
            console.log(data);
            
            localStorage.removeItem('tkn')
            localStorage.setItem('tkn',data.token)
            nav('/')
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
                <h3 className="text-center mb-4">Enter The New Password</h3>
                <div className="text-center">
                    <form>
                        <div className="mb-3">
                            <input  onChange={(e)=>setEmail(e.target.value)} type="text" className="form-control mb-3" placeholder="Your Email" />
                            <input  onChange={(e)=>setNewPassword(e.target.value)} type="text" className="form-control" placeholder="New Password" />
                        </div>
                        <button onClick={resetPass} type="submit" className="btn btn-success px-4">Reset Password</button>
                    </form>
                </div>
            </div>
        </>
    )
}
