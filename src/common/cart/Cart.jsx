import React from 'react'
import './style.css'

const Cart = ({ cartItem, addToCart, decreaseQty, deleteCartProduct }) => {

  const totalPrice = cartItem.reduce((price, item) => price + item.qty * item.price, 0);

  return (
    <>  
      <section className='cart-items'>
        <div className="container d_flex">
          <div className="cart-details"> 
              {cartItem.length === 0 && <h1 className="no-items product">Inserisci un prodotto nel carrello!</h1>}
            
              {cartItem.map((item) => {
              const productQty = item.price * item.qty;
              return(
                <div className="cart-list product d_flex" key={item.id}>
                  <div className="img">
                    <img src={item.cover} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <h4>Prezzo unitario: €{item.price}.00 
                            <br/>Quantità: {item.qty} <br/>
                            Prezzo Totale:
                      <span>€{productQty}.00</span>
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
          <div className="cart-total product">
            <h2>Riassunto ordine</h2>
            <div className="shipping d_flex">
              <h4>Spedizione : </h4>            
              <h3>€{totalPrice === 0 ? 0 : 20}.00</h3>
            </div>   
            <div className="d_flex">
              <h4>Prezzo totale : </h4>            
              <h3>€{totalPrice === 0 ? 0 : totalPrice + 20}.00</h3>
            </div>          
          </div>
        </div>
      </section>
    </>
  )
}

export default Cart