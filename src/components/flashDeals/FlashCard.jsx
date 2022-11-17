import React, { useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const NextArrow = (props) =>{
    const {onClick} = props;
    return(
        <div className="control-btn" onClick={onClick}>
            <button className="next">
                <i className="fa fa-long-arrow-alt-right"></i>
            </button>
        </div>
    )
}

const PrevArrow = (props) =>{
    const {onClick} = props;
    return(
        <div className="control-btn" onClick={onClick}>
            <button className="prev">
                <i className="fa fa-long-arrow-alt-left"></i>
            </button>
        </div>
    )
}

const FlashCard = ({ productItems, addToCart }) => {


    const [count, setCount] = useState(0);
    const increment = () => {
        setCount(count + 1);
    }


    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 400,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                } 
            }
        ]
    };

  return (
    <>
        <Slider {...settings}>

        {productItems.map((productItems, index) => {
            return (
                <div className="box" key={index}>
                    <div className="product mtop">
                        <div className="img">
                            <span className="discount">{productItems.discount}% di sconto</span>
                            <img src={productItems.cover} alt="" />
                            <div className="product-like">
                                <label>0</label> <br />
                                <i className="far fa-heart" onClick={increment}></i>
                            </div>
                        </div>
                        <div className="product-details">
                            <h3>{productItems.name}</h3>
                            <div className="rate">
                            {Array.from({ length: productItems.stars }, () => <i key={index} className="fa fa-star"></i>)}
                            </div>
                
                            <div className="price">
                                <h4>{productItems.price}.00€</h4>
                                <button onClick={() => addToCart(productItems)}>
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })}

        </Slider>
    </>
  )
}

export default FlashCard