import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './brand.module.css';
import { FallingLines } from 'react-loader-spinner';


export default function Brand() {


   async function getAllBrands(){
      let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      setBrands(data.data);
   }
   let [brands, setBrands] = useState(null)
   useEffect(function(){
      getAllBrands()
   }, [])
  return (
    <div className="container">
      <h2 className="text-center py-5 text-success">All Brands</h2>
      <div className="row">
         {brands ? brands.map(brand => <div className='col-md-3 mb-4'>
         <div className={`card ${styles['brand-card']}`}>
            <img className='card-img-top' src={brand.image} alt=''/>
            <div className='card-body'>
               <h3 className='card-title text-center'>{brand.name}</h3>
            </div>
         </div>
         </div>) : <div className="loading vh-100 justify-content-center align-items-center d-flex">
            <FallingLines
    color="#4fa94d"
    width="100"
    visible={true}
    ariaLabel="falling-circles-loading"
    />
         </div>}
      </div>
    </div>
  )
 }
    