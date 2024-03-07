import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from './../../Context/Auth/Cart/Cart';
import toast from 'react-hot-toast';
import { ThreeCircles } from 'react-loader-spinner';

export default function WishList() {
  const { addProductToCart } = useContext(cartContext);
  const [wishList, setWishList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllWishList();
  }, []);

  async function getAllWishList() {
    try {
      const { data } = await axios.get(
        'https://route-ecommerce.onrender.com/api/v1/wishlist',
        {
          headers: {
            token: localStorage.getItem('tkn'),
          },
        }
      );
      setWishList(data.data);
      setIsLoading(false);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addProduct(id) {
    try {
      const res = await addProductToCart(id);
      console.log(res.status);
      if (res.status === 'success') {
        toast.success(res.message, {
          duration: 2000,
        });
        console.log(res);
        const delres = await deleteWishItem(id);
        getAllWishList();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteWishItem(id) {
    try {
      const { data } = await axios.delete(
        `https://route-ecommerce.onrender.com/api/v1/wishlist/${id}`,
        {
          headers: {
            token: localStorage.getItem('tkn'),
          },
        }
      );
      if (data.status === 'success') {
        toast.success('Item removed from wishlist successfully', {
          duration: 2000,
        });
        console.log(data);
        getAllWishList();
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) {
    return (
      <div className="loading vh-100 justify-content-center align-items-center d-flex">
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#91F5AD"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (wishList.length === 0) {
    return (
      <div className="loading vh-100 justify-content-center align-items-center d-flex">
        <h1>NO DATA TO DISPLAY</h1>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-center">My Wishlist</h2>
      <div className="container pt-5">
        {wishList.map((elem, index) => (
          <div key={index} className="row py-3 border-2 border-bottom">
            <div className="col-md-3">
              <img className="w-100" src={elem.imageCover} alt="" />
            </div>
            <div className="col-md-9 d-flex justify-content-between align-items-center">
              <div className="left">
                <h5>{elem.title}</h5>
                <h6>{elem.price} EGP</h6>
                <h6
                  className="text-danger"
                  onClick={() => deleteWishItem(elem._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="text-danger">
                    {' '}
                    <i class="fa-solid fa-trash"></i>
                  </span>{' '}
                  Remove
                </h6>
              </div>
              <div className="right">
                <button
                  onClick={() => addProduct(elem._id)}
                  className="btn btn-outline-success"
                >
                  Add To cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
