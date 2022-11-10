import React from 'react'
import FlashDeals from '../components/flashDeals/FlashDeals'
import Home from '../components/mainpage/Home'
import NewArrivals from '../components/newArrivals/NewArrivals'
import TopCate from '../components/top/TopCate'

const Pages = ({ productItems , cartItem, addToCart}) => {
  return (
    <>
        <Home cartItem={cartItem} />
        <FlashDeals productItems={productItems} addToCart={addToCart}/>
        <TopCate />
        <NewArrivals />
    </>
    
  )
}

export default Pages