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
              <select id="order-select" name="order">
                <option value="crescente">Migliori</option>
                <option value="crescente">Crescente</option>
                <option value="decrescente">Decrescente</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
              </select>
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