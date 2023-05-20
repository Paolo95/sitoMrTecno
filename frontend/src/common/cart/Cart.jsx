import React, { useEffect, useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom';

const Cart = ({ cartItem, addToCart, decreaseQty, deleteCartProduct }) => {

  const [shipping_cost, setShippingCost] = useState(9.99);
  const [totalPrice, setTotalPrice] = useState(0);
  const [pickup, setPickup] = useState(false);

  cartItem.forEach(element => {
    if(element.category === 'PC' || element.category === 'Notebook') {
      setShippingCost(19.99);
    }
  });  

  useEffect(()=> {

    setTotalPrice(cartItem.reduce((price, item) => price + item.qty * item.price, shipping_cost));
  
  },[shipping_cost, cartItem])

  useEffect(()=> {

    if(pickup){
      setShippingCost(0)
    }else{
      cartItem.forEach(element => {
        if(element.category === 'PC' || element.category === 'Notebook') {
          setShippingCost(19.99);
        }else{
          setShippingCost(9.99)
        }
      });  
    }

  },[pickup, cartItem])
  
  const handleShippingType = () => {
      setPickup(!pickup);
  }

  return (
    <>  
      <section className='cart-items'>
        <div className="container">
          <h1>Carrello</h1>
        </div>
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
            <div className='sendOption'>
              <h4>Ritiro in sede:</h4>
              <input type="checkbox"
                     onChange={handleShippingType} />
            </div>
            <div className="shipping d_flex">
              <h4>Spedizione : </h4>            
              <h3>€{cartItem.length === 0 ? 0 : shipping_cost}</h3>
            </div>   
            <div className="d_flex">
              <h4>Prezzo totale : </h4>            
              <h3>€{cartItem.length === 0 ? 0 : parseFloat(totalPrice).toFixed(2)}</h3> 
            </div> 
            <div className="d_flex">
              <h6>+commissioni pagamento</h6>
            </div> 
            {
              cartItem.length === 0 ? null : (  
              <>                
                <Link to='/checkout' state={{shipping_cost, pickup}}>
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