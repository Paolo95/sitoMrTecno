import './App.css';
import Header from './common/header/Header';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pages from './pages/Pages';
import Data from './components/flashDeals/Data'
import { useState } from 'react';
import Cart from './common/cart/Cart';
import Shop from './components/shop/Shop';
import Footer from './common/footer/Footer';
import Contact from './components/contact/Contact';

function App() {

  //step 1: fetch data from database
  const { productItems } = Data;
  
  const [cartItem, setCartItem] = useState([]);

  const addToCart = (product) => {
    const productExit = cartItem.find((item) => item.id === product.id);

    if(productExit){
      setCartItem(cartItem.map((item) => 
      (item.id === product.id? { ...productExit, qty: productExit.qty +1 } : item)))
    }else{
      setCartItem([...cartItem,{...product, qty : 1 }])
    }
  }

  const decreaseQty = (product) => {
    const productExit = cartItem.find((item) => item.id === product.id);

    if(productExit.qty ===1){
      setCartItem(cartItem.filter((item) => item.id !== product.id))
    }else{
      setCartItem(cartItem.map((item) => (item.id === product.id ? {...productExit, qty: productExit.qty -1} : item)))
    }

  }

  const deleteCartProduct = (product) => {
    
    setCartItem(cartItem.filter((item) => item.id !== product.id));
  
  }

  return (
    <>
      <Router>
        <Header cartItem={cartItem}/>      
        <Routes>
            <Route exact path="/" element={<Pages productItems={productItems} addToCart={addToCart}/>} >    
            </Route>    
            <Route exact path="/cart" element={<Cart cartItem={cartItem} addToCart={addToCart} decreaseQty={decreaseQty} deleteCartProduct={deleteCartProduct}/>} >    
            </Route>
            <Route exact path="/shop" element={<Shop addToCart={addToCart}/>} >    
            </Route>  
            <Route exact path="/contact" element={<Contact />} >    
            </Route>    
        </Routes>
        <Footer />
      </Router>
    </>
    );
}

export default App;
