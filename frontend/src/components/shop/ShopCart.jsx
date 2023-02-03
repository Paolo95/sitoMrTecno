import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import uuid from 'react-uuid'

const ShopCart = ({ addToCart, shopItems, cartItem, deleteCartProduct, decreaseQty}) => {

    const [count, setCount] = useState(0);
    const [cartSummit, setCartSummit] = useState(false);

    const increment = () => {
        setCount(count + 1);
    }

    const navigate = useNavigate();
    
  return (
    <> 
        {
            cartSummit ? <div className='cartSummit'>
                            {
                                cartItem.length !== 0 ?
                                    <>
                                        <div className="cartSummit-heading">
                                            <h1>Riepilogo carrello</h1>
                                            <div>
                                                <button className='btn-cart' onClick={() => {navigate('/cart')}}><i className="fas fa-shopping-cart"></i></button>
                                                <button onClick={() => {setCartSummit(false)}}><i className="fas fa-times"></i></button>
                                            </div>
                                            
                                        </div>                            
                                        <div className="cartSummit-card">
                                            <div className="cartSummit-body">
                                            {cartItem.map((item) => {
                                                const productQty = item.price * item.qty;
                                                return(
                                                    <div className="cart-list product d_flex" key={item.id}>
                                                    <div className="img">
                                                        <img src={item.cover} alt="" />
                                                    </div>
                                                    <div className="cart-details">
                                                        <h3>{item.product_name}</h3>
                                                        <h4>Prezzo unitario: €{parseFloat(item.price).toFixed(2)} 
                                                                <br/>Quantità: {item.qty} <br/>
                                                                Prezzo Totale:
                                                        <span>€{parseFloat(productQty).toFixed(2)}</span>
                                                        </h4>
                                                    </div>
                                                    <div className="cart-items-function">
                                                        <div className="removeCart">
                                                        <button className='deleteCartProduct' onClick={() => deleteCartProduct(item)}>
                                                            <i className="fas fa-times"></i>
                                                        </button>
                                                        </div>
                                                        <div className="cartControl d_flex">
                                                        <button className='incCart' onClick={() => addToCart(item)}>
                                                            <i className="fa fa-plus"></i>
                                                        </button>
                                                        <button className='decCart' onClick={() => decreaseQty(item)}>
                                                            <i className="fas fa-minus"></i>
                                                        </button>
                                                        </div>
                                                    </div>
                                                    </div>
                                                )
                                                })}
                                            </div>
                                        </div>
                                    </>
                                    : <>
                                        <div className="cartSummit-heading">
                                            <h1>Riepilogo carrello</h1>
                                            <button onClick={() => {setCartSummit(false)}}><i className="fas fa-times"></i></button>
                                        </div>                            
                                        <div className="cartSummit-card">
                                            <div className="cartSummit-body">
                                                <div className="cartSummit-msg">
                                                    Carrello vuoto!
                                                </div> 
                                            </div>
                                        </div>
                                    </>
                            }
                            
                        </div>
                        : null
        }
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
                                <img src={shopItems.cover} alt="" />
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
                                <button onClick={() => {addToCart(shopItems);
                                                        setCartSummit(true);}}>
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