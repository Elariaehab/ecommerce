import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Brand from './components/Brand/Brand';
import Category from './components/Category/Category';
import Layout from './components/Layout/Layout';
import NotFound from './components/NotFound/NotFound';
import AuthProvider from './Context/Auth/Auth';
import Profile from './components/Profile/Profile';
import ProtectedRoute from './components/Test/Test';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Cart from './components/Cart/Cart';
import { Toaster } from 'react-hot-toast';
import CartProvider from './Context/Auth/Cart/Cart';
import Payment from './components/Payment/Payment';
import AllOrders from './components/AllOrders/AllOrders';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Codeverification from './components/Codeverification/Codeverification';
import ResetPassword from './components/ResetPassword/ResetPassword';
import WishList from './components/WishList/WishList';


let queryClent = new QueryClient()


let router = createBrowserRouter([
 {path : "" , element: <Layout /> ,
  children: [
  { index:true , element:<ProtectedRoute><Home/></ProtectedRoute>},
  {path: "Login", element: <Login />},
  { path: 'forgotpassword', element: <ForgotPassword /> },
  { path: 'codeverification', element: <Codeverification /> },
  { path: 'resetpassword', element: <ResetPassword /> },
  {path: "Register", element: <Register />},
  {path: "details/:id", element:<ProtectedRoute>{""} <ProductDetails />{""}</ProtectedRoute>},
  {path: "Profile", element:<ProtectedRoute>{""}<Profile />{""}</ProtectedRoute>},
  {path: "Brand", element: <ProtectedRoute>{""}<Brand />{""}</ProtectedRoute>},
  {path: "Category", element:<ProtectedRoute>{""}<Category/>{""}</ProtectedRoute> },
  {path: "Cart", element:<ProtectedRoute>{""}<Cart/>{""}</ProtectedRoute> },
  {path: "Payment", element:<ProtectedRoute>{""}<Payment/>{""}</ProtectedRoute> },
  {path: "AllOrders", element:<ProtectedRoute>{""}<AllOrders/>{""}</ProtectedRoute> },
  { path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute>  },
  {path: "*", element: <NotFound/>},
 ],
},
]);
export default function App() {
  return (
    <>
    <QueryClientProvider client={queryClent}>
      <Toaster/>
      <CartProvider>
    <AuthProvider>
<RouterProvider router={router} />
</AuthProvider>
</CartProvider>
</QueryClientProvider>
</>
  );
 }
    