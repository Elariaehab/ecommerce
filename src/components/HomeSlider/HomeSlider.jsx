import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeSlider() {
    var settings = {
        dots: true,
        infinite: true,arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    return (
        <>
        <div className="row g-0 mb-5">
            <div className="col-md-9">
            <Slider {...settings}>
          <div>
            <img style={{width:"100%" , height:"400px"}} className='w-100' src={require("../../images/SLIDER-1.jpg")}/>
          </div>
          <div>
          <img style={{width:"100%" , height:"400px"}} className='w-100' src={require("../../images/SLIDER-1.jpg")}/>
          </div>
          <div>
          <img style={{width:"100%" , height:"400px"}} className='w-100' src={require("../../images/SLIDER-1.jpg")}/>
          </div>
          <div>
          <img style={{width:"100%" , height:"400px"}} className='w-100' src={require("../../images/SLIDER-1.jpg")}/>
          </div>
          
          
          
        </Slider>
            </div>
            <div className="col-md-3">
                <img className='w-100' style={{height:"200px"}} src={require("./../../images/clothing-photography-mannequin-vs-model.jpg")}/>
                <img className='w-100' style={{height:"200px"}} src={require("./../../images/images.jpeg")}/>
            </div>
        </div>
       
        </>
  );
}
