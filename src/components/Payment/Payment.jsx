import axios from 'axios'
import React, { useContext, useState } from 'react'
import { cartContext } from '../../Context/Auth/Cart/Cart'
import { useNavigate } from 'react-router-dom'

export default function Payment() {

    const [phone, setPhone ] = useState("")
    const [city ,setCity ] = useState("")
    const [details, setDetails] = useState("")
 const nav = useNavigate()
   const {cartId , setNumOfItem , setProducts , setTotalPrice}= useContext(cartContext)

   async function cashPayment(){
     
       let formData = {
            shippingAddress:{
                details: details,
                phone: phone,
                city: city
                }
       }
       try{
        let {data} =await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` , formData ,{
            headers : {
                token : localStorage.getItem("tkn")
            }
          })

          if(data.status == "success"){
setTotalPrice(0)
setProducts([])
setNumOfItem(0)
nav("/AllOrders")
          }
       }catch(error){
console.log(error)
       }
      
    }

   async function onlinePayment(){
    let formData = {
      shippingAddress:{
          details: details,
          phone: phone,
          city: city
          }
 }
      try{
        let {data} =await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}` , formData ,{
          headers: {
            token:localStorage.getItem("tkn"),
          },
          params: {
            url:"http://localhost:4200",
          },
        } );
        if(data.status === "success"){
          window.open(data.session.url)
        }
        }catch(error){
            console.log(error)
                   }
                  
               }
    
  return (
    <div className='w-50 m-auto'>
   
        <label htmlFor='city'>City</label>
        <input onChange={(e)=>{
            setCity(e.target.value)
        }} type='text' id='city' className='form-control my-3'/>

        <label htmlFor='Phone'>Phone</label>
        <input onChange={function(e){
            setPhone(e.target.value)
        }} type='tel' id='Phone' className='form-control my-3'/>

        
        <label htmlFor='details'>Details</label>
        <textarea onChange={(e)=>{
            setDetails(e.target.value)
        }} type='tel' id='details' className='form-control my-3'/>
        <button onClick={cashPayment} className='btn btn-info'>Cash Payment</button>
        <button onClick={onlinePayment} className='btn btn-warning mx-3'>online Payment</button>

       
    </div>
  )
}
