import './App.css';
import Header from './common/header/Header';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pages from './pages/Pages';
import Data from './components/flashDeals/Data'
import { useState } from 'react';
import Cart from './common/cart/Cart';

function App() {

  //step 1: fetch data from database
  const {productItems} = Data;

  const [cartItem, setCardItem] = useState([]);

  const addToCart = (product) => {
    const productExit = cartItem.find((item) => item.id === productItems.id);

    if(productExit){
      setCardItem(cartItem.map((item) => 
      (item.id === product.id? { ...productExit, qty: productExit.qty +1 } : item)))
    }
  }

  return (
    <>
      <Router>
        <Header />      
        <Routes>
            <Route exact path="/" element={<Pages productItems={productItems} addToCart={addToCart}/>} >    
            </Route>    
            <Route exact path="/cart" element={<Cart cartItem={cartItem} addToCart={addToCart}/>} >    
            </Route>      
        </Routes>
      </Router>
    </>
    );
}

export default App;
