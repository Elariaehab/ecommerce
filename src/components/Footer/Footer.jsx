import React from 'react';
import styles from './footer.module.css'

export default function Footer() {
  return (
     <div className="bg-secondary px-5">
      <div className={`footer ${styles['footer-card']}`}>
      <h1>Get the FreshCart app</h1>
      <p>We will send you a link, open it on your phone to download the app</p>
      <input type='email' placeholder='Email..' className='form-control w-50 py-2 '/> <button className='btn btn-success'>Share App Link</button>
      
      <div className="row">
         <div className="col-md-6">
            <p className='py-2'>Payment Partners</p>
            <i class="fa-brands fa-amazon fa-2xl me-2"></i>
            <i class="fa-brands fa-cc-mastercard fa-2xl me-2"></i>
            <i class="fa-brands fa-cc-paypal fa-2xl me-2"></i>
            <p className='py-1'>Get Deliveries with FreshCart</p>
            <i class="fa-brands fa-google-pay fa-2xl me-2"></i>
            <i class="fa-brands fa-app-store fa-2xl me-2"></i>
         </div>
      </div>
     </div>
     </div>
  )
 }
    