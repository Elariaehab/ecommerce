import React, { useContext } from 'react'
import { cartContext } from '../../Context/Auth/Cart/Cart';
import { FallingLines } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';




export default function Cart() {
 const {ClearCart , updateCountProduct , numOfItem , totalPrice , products , removeItem}= useContext(cartContext);
 console.log(products)

async function remove(id){
 const res = await removeItem(id)
 if(res.status == "success"){
  toast.success("item removed successfully" ,{
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

async function update(id , count){
  const res = await updateCountProduct(id , count)
  if(res.status == "success"){
    toast.success("count updated successfully" ,{
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

async function clearCartUser(){
 await ClearCart()
}
 if(products == null){
  return<> <div className='vh-100 d-flex justify-content-center align-items-center'>
  <FallingLines 
  color="#4fa94d"
  width="80"
  visible={true}
  ariaLabel="falling-circles-loading"
  />
  </div>
  </>
 }


 if(products.length == []){
  return<> <div className='vh-100 d-flex justify-content-center align-items-center'>
 <h1>No Data To Display</h1>
  </div>
  </>
 }
  return (
 <div style={{backgroundColor : "#eee"}} className='container py-5'>
      <h2>Shop Cart :</h2>
      <h3 className='text-success'>{totalPrice}</h3>

      <button onClick={clearCartUser} className='btn btn-warning my-3'>Clear Cart</button>
      <Link to={"/payment"} className='btn btn-primary my-3 mx-3'>payment</Link>
      {products?.map(function(product , idx){return <div key={idx} className='row g-3 border-bottom border-1 py-3 align-items-center'>
      <div className="col-sm-1">
        <div> 
          <img src={product.product.imageCover}  className='w=100 vh-100'  alt=''/>
        </div> 
        </div>
      <div className="col-sm-8">
        <div>
          <h4>{product.product.title}</h4>
          <h6>{product.price}</h6>
          <button onClick={()=>{remove(product.product.id)}} className='btn btn-danger'>Remove</button>
          </div>
        </div>
      <div className="col-sm-3">
        <div className='d-flex align-items-center'>
        <button onClick={function(){
          update(product.product.id ,product.count+1)
        }} className='btn btn-outline-success'>+</button>
        <span className='mx-2'>{product.count}</span>

        {product.count <= 0? (
                <button onClick={function(){
                  remove(product.product.id);
                }}
                   className='btn btn-outline-danger'>-</button> 
                   ):(
                    <button onClick={function(){
                      update(product.product.id ,product.count-1);
                    }}
                       className='btn btn-outline-danger'>-</button>
                   ) }

        </div>
        </div>
    </div>})}
    </div>
  );
}
