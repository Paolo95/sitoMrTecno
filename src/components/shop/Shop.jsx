import React from 'react'
import Catg from './Catg'
import ShopCart from './ShopCart'
import "./Style.css"

const Shop = ({ shopItems, addToCart }) => {
  return (
    <>
      <section className="shop">
        <div className="container d_flex">
          <Catg />
          <div className="contentWidth">
            <div className="heading d_flex">
              <div className="heading-left row f_flex">
                <h2>Smartphone</h2>
              </div>
              <div className="heading-right row">
                <span>Mostra tutto</span>
                <i className="fa fa-caret-right"></i>
              </div>
            </div>
            <div className="product-content grid1">
              <ShopCart shopItems={shopItems} addToCart={addToCart}/>
            </div>
          </div>
        </div>
      </section>
    </>
    
  )
}

export default Shop