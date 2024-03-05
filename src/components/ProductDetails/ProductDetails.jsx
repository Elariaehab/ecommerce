import axios from 'axios'
import React, { useContext, useState } from 'react'
import { FallingLines } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { cartContext } from '../../Context/Auth/Cart/Cart'


export default function ProductDetails() {
   const {addProductToCart} = useContext(cartContext);
   const[loading , setLoading] = useState(false)
  

   let {id} = useParams()

  async function addProduct(id){
    setLoading(true)
   const res = await addProductToCart(id);
//    console.log(res , "add product")
   
   if(res.status == "success"){
    toast.success(res.message ,{
        duration:3000,
    }
    );
   }else{
    toast.error("error" ,{
        duration:3000,
    }
    );
   }
   setLoading(false)
  
   }
  
    async function getProductDetails(){
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
   let {data , isLoading} = useQuery('productDetails' , getProductDetails)

   if(isLoading ==true){
    return   <div className='vh-100 d-flex justify-content-center align-items-center'>
    <FallingLines
    color="#4fa94d"
    width="100"
    visible={true}
    ariaLabel="falling-circles-loading"
    />
    </div>
   }
  return (
    <div className="container py-5 ">
        <div className="row align-items-center">
            <div className="col-md-4">
                <img src={data?.data.data.imageCover} className='w-100'/>
            </div>
            <div className="col-md-8">
                <h1>{data?.data.data.title}</h1>
                <p>{data?.data.data.description}</p>
                <h6>{data?.data.data.category.name}</h6>
                <div className='d-flex justify-content-between align-items-center'>
       <p>{data?.data.data.price} EGP</p>
        <p><span><i className='fa-solid fa-star text-warning'></i></span> {data?.data.data.ratingsAverage}</p>
       </div>
       <button onClick={function (){
        addProduct(data?.data.data.id);
       }} 
       className='btn btn-success w-100'>
        {loading? <FallingLines
    color="#FFF"
    width="30"
    visible={true}
    ariaLabel="falling-circles-loading"
    /> : "+ADD TO CART"}
        </button>
            </div>
        </div>
    </div>
  )
}
