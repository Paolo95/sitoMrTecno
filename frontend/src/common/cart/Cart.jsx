import React from 'react'
import './style.css'
import { Link } from 'react-router-dom';

const Cart = ({ cartItem, addToCart, decreaseQty, deleteCartProduct }) => {

  let shipping_cost = 9.99;

  cartItem.forEach(element => {
    if(element.category === 'PC' || element.category === 'Notebook') {
      shipping_cost = 19.99;
    }
  });  

  const totalPrice = cartItem.reduce((price, item) => price + item.qty * item.price, shipping_cost);

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
                    <img src={window.location.origin + item.cover} alt="" />
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
          <div className="cart-total product">
            <h2>Riassunto ordine</h2>
            <div className="shipping d_flex">
              <h4>Spedizione : </h4>            
              <h3>€{cartItem.length === 0 ? 0 : shipping_cost}</h3>
            </div>   
            <div className="d_flex">
              <h4>Prezzo totale : </h4>            
              <h3>€{cartItem.length === 0 ? 0 : parseFloat(totalPrice).toFixed(2)}</h3>
            </div> 
            {
              cartItem.length === 0 ? null : (  
              <>                
                <Link to='/checkout'>
                  <button className='btn-checkout'>Procedi al pagamento</button>      
                </Link>
              </>
              )
            }                 
          </div>
        </div>
      </section>
    </>
  )
}

export default Cart