import React, { useContext } from 'react'
import { authContext } from '../../Context/Auth/Auth'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
  if (localStorage.getItem('tkn') == null){
    return<><Navigate to='/Login' /></>
  }
//  const {token} =  useContext(authContext);
//  if(token ==null) {
//    return <Navigate to ="/Login"/>
//  }
  return (
    <div>
      {children}
    </div>
  )
}
