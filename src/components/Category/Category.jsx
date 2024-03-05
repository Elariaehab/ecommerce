import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './Category.module.css'
import { FallingLines } from 'react-loader-spinner';

export default function Category() {
   let [Categories,setCategories] = useState(null)
   async function getAllCategories(){
      try{
         let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
         setCategories(data.data);
      }catch(error){
         console.log(error);
      }
   }

   useEffect(function(){
      getAllCategories()
   }, [])
  return (
     <div className="container">
      <h2 className="text-center py-5 text-success">Categories</h2>
<div className="row">
   {Categories ? Categories.map(category => <div className='col-md-4 mb-4'>
      <div className={`card ${styles['category-card']}`}>
         <div className='card-body'>
            <h3 className='card-title text-center'>{category.name}</h3>
         </div>
      </div>
   </div>) : <div className='loading vh-100 justify-content-center align-items-center d-flex'>
   <FallingLines
    color="#4fa94d"
    width="100"
    visible={true}
    ariaLabel="falling-circles-loading"
    />
      </div>}
</div>
     </div>
  );
 }
    