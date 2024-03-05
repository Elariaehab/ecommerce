import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import HomeSlider from '../HomeSlider/HomeSlider';
import CategorySlide from '../CategorySlide/CategorySlide';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { cartContext } from '../../Context/Auth/Cart/Cart';


export default function Home() {
  const {addProductToCart} = useContext(cartContext);
  
async function getAllProducts(){
  return await axios.get("https://ecommerce.routemisr.com/api/v1/products")
}
  let {isLoading , data}= useQuery("allProduct" , getAllProducts);
// const [allProduct , setAllProduct] = useState(null)
// 

  // async function getAllProducts(){
  // let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  // setAllProduct(data.data)
  // }
  // useEffect(function() {
  //   getAllProducts();
  // } , []);

  async function addProduct(id){
    const res = await addProductToCart(id);
    
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
  }
  if(isLoading ==true){
    return  <div className='vh-100 d-flex justify-content-center align-items-center'>
    <FallingLines
    color="#4fa94d"
    width="100"
    visible={true}
    ariaLabel="falling-circles-loading"
    />
    </div>
  }
  return (
  <>
  <div className='container pt-5'>
  <HomeSlider/>
  <CategorySlide />
  <div className='row g-3'>
    {data?.data.data.map((product , idx) => ( 
    <div key={idx} className='col-md-2'>
      <Link to={'/details/'+ product._id}>
        <img src={product.imageCover} className='w-100' alt=""/>
        <h6 className='text-success my-2'>{product.category.name}</h6>
        <h5>{product.title.split(" ").slice(0 , 2).join(" ")}</h5>
       <div className='d-flex justify-content-between align-items-center'>
       <p>{product.price} EGP</p>
        <p><span><i className='fa-solid fa-star text-warning'></i></span> {product.ratingsAverage}</p>
       </div>
      </Link>
      <button onClick={()=> {
        addProduct(product._id)
      }} className='btn btn-success w-100'>ADD TO CART</button>
    </div>
    ))}
    </div>
    </div>
</>
  );
 }
    