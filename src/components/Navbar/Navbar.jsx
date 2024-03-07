import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/Auth/Auth';
import { cartContext } from '../../Context/Auth/Cart/Cart';



export default function Navbar() {
 const {token , setToken }= useContext(authContext);
 const {numOfItem}= useContext(cartContext);
 const navigate = useNavigate()
 function Logout(){
 setToken(null) 
 localStorage.removeItem("tkn")
 navigate("/Login")
 
 }
  return  <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <Link className="navbar-brand" to="/">FreshCart</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {token? (
        <>
          <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Brand">Brand</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link position-relative" to="/Cart">Cart
  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {numOfItem}
    <span className="visually-hidden">unread messages</span>
  </span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Category">Category</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/AllOrders">All Orders</Link>
        </li>
        <li className="nav-item">
                  <Link className="nav-link" to="/wishlist">Wishlist</Link>
                </li>
        </>
        ):( "" 
        )}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
          <li className="nav-item">
          <i className='fa-brands fa-facebook-f me-2 '></i>
          <i className='fa-brands fa-instagram  me-2'></i>
          <i className='fa-brands fa-twitter  me-2'></i>
          <i className='fa-brands fa-whatsapp me-2'></i>
        </li>
        {token? (
        <>
          <li className="nav-item">
          <span onClick={Logout} style={{cursor:"pointer"}}className="nav-link">Logout</span>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Profile">Profile</Link>
        </li>
        </> 
        ):( 
        <>
       
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Login">Login</Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link" to="/Register">Register</Link>
        </li>
        </>
        )}
        
        
       
          </ul>
        
      
    </div>
  </div>
</nav>
  </>;
}