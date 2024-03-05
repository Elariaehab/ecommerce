import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../Context/Auth/Auth'
import { jwtDecode } from 'jwt-decode'
import { FallingLines } from 'react-loader-spinner'

export default function Profile() {
  const [user , setUser] = useState(null)

 useEffect(function(){
  if(localStorage.getItem("tkn") !=null){
    const x = jwtDecode(localStorage.getItem("tkn"));
    setUser(x)
  }
 } , [])
  return (
    <div className=' vh-100 d-flex justify-content-center align-items-center'>
      {user ?  <div className='text-center'>
      <h2>hello ya <span className='text-success'>{user.name}</span></h2>
      <h3>Role <span className='text-success'>{user.role}</span></h3>
      <h3>id user <span className='text-success'>{user.id}</span></h3>
      </div>
       :
        <FallingLines
        color="#4fa94d"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
        />
        
      }
    </div>
    )
}