import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import uuid from 'react-uuid'

const ShopCart = ({ addToCart, shopItems}) => {

    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    }
    
  return (
    <> 
        {   
            shopItems.map((shopItems, index) => {
            return (
                <div className="box" key={index}>
                    <div className="product mtop">
                        <div className="img">
                            <Link to={{
                                pathname: `/product/${shopItems.id}`,
                            }}>
                                <span className="discount">{shopItems.discount}% di sconto</span>
                                <img src={window.location.origin + shopItems.cover} alt="" />
                                <div className="product-like">
                                    <label>0</label> <br />
                                    <i className="far fa-heart" onClick={increment}></i>
                                </div>
                            </Link>
                        </div>
                        <div className="product-details">
                            <h3>{shopItems.product_name}</h3>
                            <div className="rate">
                                {Array.from({ length: shopItems.stars }, () => <i key={uuid()} className="fa fa-star"></i>)}
                            </div>
                            <div className="price">
                                <h4>{parseFloat(shopItems.price).toFixed(2)}€</h4>
                                <button onClick={() => addToCart(shopItems)}>
                                    <i className="fa fa-plus"></i> 
                                    <span>Aggiungi al carrello</span>
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