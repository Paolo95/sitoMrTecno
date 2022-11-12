import React from 'react'
import Footer from '../common/footer/Footer'
import FlashDeals from '../components/flashDeals/FlashDeals'
import Home from '../components/mainpage/Home'
import NewArrivals from '../components/newArrivals/NewArrivals'
import TopCate from '../components/top/TopCate'
import Wrapper from '../components/wrapper/Wrapper'

const Pages = ({ productItems , cartItem, addToCart}) => {
  return (
    <>
        <Home cartItem={cartItem} />
        <FlashDeals productItems={productItems} addToCart={addToCart}/>
        <TopCate />
        <NewArrivals />
        <Wrapper />
    </>
    
  )
}

export default Pages