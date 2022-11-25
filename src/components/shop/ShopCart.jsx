import React, { useState } from 'react'
import Sdata from '../../components/shop/Sdata'
import uuid from 'react-uuid'

const ShopCart = ({ addToCart , orderChoice, brandCheckedList, categoryChecked, minPriceRange, maxPriceRange}) => {

    const { shopItems } = Sdata;

    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    }

  return (
    <> 
        {   
            shopItems.slice(0, shopItems.length)
                     .filter(item => item.category === categoryChecked)
                     .filter(brandCheckedList.filter(n => n).length !== 0 ? (item => brandCheckedList.filter(n => n).includes(item.brandName)) : item => item)
                     .map((shopItems, index) => {
            return (
                <div className="box" key={index}>
                    <div className="product mtop">
                        <div className="img">
                            <span className="discount">{shopItems.discount}% di sconto</span>
                            <img src={shopItems.cover} alt="" />
                            <div className="product-like">
                                <label>0</label> <br />
                                <i className="far fa-heart" onClick={increment}></i>
                            </div>
                        </div>
                        <div className="product-details">
                            <h3>{shopItems.name}</h3>
                            <div className="rate">
                                {Array.from({ length: shopItems.stars }, () => <i key={uuid()} className="fa fa-star"></i>)}
                            </div>
                            <div className="price">
                                <h4>{shopItems.price}.00€</h4>
                                <button onClick={() => addToCart(shopItems)}>
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })}
    </>
  )
}

export default ShopCart