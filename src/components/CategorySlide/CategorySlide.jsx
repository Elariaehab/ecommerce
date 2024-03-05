import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from 'react-query';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';

export default function CategorySlide() {
    var settings = {
        dots: true,
        infinite: true,arrows: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
      };
 async function getAllCategory(){
    return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
}
    let {data , isLoading} = useQuery('category' , getAllCategory);
    console.log(data?.data);
    if(isLoading == true){
        return <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
    }
    return (
        <>
       
        
            <Slider {...settings}>
                {data?.data.data.map(function(elem , idx){return  <div key={idx}>
                 <img style={{width:"100%" , height:"200px"}} className='w-100' 
                 src={elem.image}/>
                 <h6 className='my-3'>{elem.name}</h6>
               </div>
                })}
         
          
          
          
          
        </Slider>
           
       
        </>
  );
}
