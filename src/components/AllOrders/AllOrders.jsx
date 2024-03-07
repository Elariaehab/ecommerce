import axios, { all } from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { FallingLines } from 'react-loader-spinner';

export default function AllOrders() {
    const userId = jwtDecode(localStorage.getItem("tkn")).id;
    const [allData , setAllData] = useState(null)
    async function getAllOrders(){
  
       try{
        let {data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
       console.log(data)
        setAllData(data)
        }catch(error){
            console.log(error)
                   }
                  
                }
                console.log(userId)
                useEffect(function(){
                    getAllOrders()
                }, [])
                return (
                    <div>
                      <div className="container py-5">
                        <div className="row g-3">
                          {allData ? (
                            allData.map((order, idx) => (
                              <div key={idx} className="col-md-6">
                                <div className="inner p-3 bg-secondary rounded-2">
                                <p>phone : {order.user.phone}</p>
                                  <p>Order Price : {order.totalOrderPrice} EGP</p>
                                  {/* <p>city : {order.shippingAddress.city}</p> */}
                                  {/* <p>details : {order.shippingAddress.details}</p> */}
                                  <p>payment Method Type : {order.paymentMethodType}</p>
                                  <div className="row">
                                    {order.cartItems.map((item, index) => (
                                      <div key={index} className="col-md-4">
                                        <div>
                                          <img src={item.product.imageCover} className='w-100' alt=""/>
                                          <h6>{item.product.title.split(" ").slice(0,2).join(" ")}</h6>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className='vh-100 d-flex justify-content-center align-items-center'>
                              <FallingLines
                                color="#4fa94d"
                                width="100"
                                visible={true}
                                ariaLabel="falling-circles-loading"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                          }
