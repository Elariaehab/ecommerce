import axios from "axios";
import React, { useEffect, useState } from 'react'
import { createContext } from "react";

export let cartContext = createContext()


export default function CartProvider({children}) {
  const [numOfItem, setNumOfItem] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [products, setProducts] = useState(null)
  const [cartId, setCartId] = useState("")


  useEffect(function() {
    getUserCart()
  } , [])

   async function addProductToCart(productId){
    try{
        let {data} =  await  axios.post("https://ecommerce.routemisr.com/api/v1/cart",
        {

            productId: productId,
        }, {
            headers:{token : localStorage.getItem("tkn")},
        }
        );
        if(data.status == "success"){
            getUserCart()
        }
        return data;
    } catch (error) {
console.log(error)
    }
   
    }
   async function getUserCart(){
        try{
const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
headers:{token : localStorage.getItem("tkn")}
        })
        if(data.status == "success"){
            setNumOfItem(data.numOfCartItems);
            setProducts(data.data.products);
            setTotalPrice(data.data.totalCartPrice);
            setCartId(data.data._id)
            console.log(data , "usercart")
        }
        console.log(data , "CartUser")
        return data
        } catch (error) {
          setProducts([]);
        }
    }

   async function removeItem(id){
        try{
   const {data} =  await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
   headers : {
    token :localStorage.getItem("tkn")
   }
   })
   if(data.status == "success"){
    setNumOfItem(data.numOfCartItems);
            setProducts(data.data.products);
            setTotalPrice(data.data.totalCartPrice);
   }
   return data
        } catch(error){

        }
    }
    
   async function updateCountProduct(id , count){
      try{
      const {data}= await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count : count} ,
      {
        headers:{
          token : localStorage.getItem("tkn")
        },
      });

      if(data.status == "success") {
        setNumOfItem(data.numOfCartItems);
        setProducts(data.data.products);
        setTotalPrice(data.data.totalCartPrice);
}
      return data;
      }catch(error){
console.log(error);
      }
    }

   async function ClearCart(){
      try{
const {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart" ,{
  headers :{
    token:localStorage.getItem("tkn")
  }
}
);

if(data.message == "success") {
  setNumOfItem(0);
  setProducts([]);
  setTotalPrice(0);
}
return data

      } catch(error) {
        console.log(error);
      }
    }
  return (
    <cartContext.Provider value={{ClearCart , updateCountProduct , removeItem , addProductToCart , numOfItem , totalPrice , products ,cartId , setNumOfItem , setProducts , setTotalPrice}}>
      {children}
    </cartContext.Provider>
  );
}