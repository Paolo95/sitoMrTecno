import './App.css';
import Header from './common/header/Header';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pages from './pages/Pages';
//import Data from './components/flashDeals/Data'
import { useState } from 'react';
import Cart from './common/cart/Cart';
import Shop from './components/shop/Shop';
import Footer from './common/footer/Footer';
import Contact from './components/contact/Contact';
import Repair from './components/repair/Repair';
import Assistance from './components/assistance/Assistance';
import DataRescue from './components/dataRescue/DataRescue';
import OurProducts from './components/ourProducts/OurProducts';
import Product from './components/product/Product';
import Login from './components/login/Login';
import Register from './components/register/Register';
import RegSuccess from './components/regSuccess/RegSuccess';
import RequireAuth from './components/requireAuth/RequireAuth';
import Unauthorized from './components/unauthorized/Unauthorized';
import AdminDashboard from './components/adminDashboard/AdminDashboard';
import PersistLogin from './components/persistLogin/PersistLogin';
import LoginRequireAuth from './components/requireAuth/LoginRequireAuth';
import PassRecovery from './components/passRecovery/PassRecovery';
import PassRecSuccess from './components/passRecSuccess/PassRecSuccess';

function App() {

  //step 1: fetch data from database
  //const { productItems } = Data;
  
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

  const addToCartProduct = (product, qty) => {
    const productExit = cartItem.find((item) => item.id === product.id);

    if(productExit){
      setCartItem(cartItem.map((item) => 
      (item.id === product.id? { ...productExit, qty: productExit.qty + qty } : item)))
    }else{
      setCartItem([...cartItem,{...product, qty : qty }])
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
            <Route exact path="/" element={<Pages />} >    
            </Route>    
            <Route exact path="/cart" element={<Cart cartItem={cartItem} addToCart={addToCart} decreaseQty={decreaseQty} deleteCartProduct={deleteCartProduct}/>} >    
            </Route>
            <Route exact path="/contact" element={<Contact />} >    
            </Route>
            <Route exact path="/nuovo" element={<Shop addToCart={addToCart}/>} >    
            </Route>      
            <Route exact path="/riparazioni" element={<Repair/>} >    
            </Route>
            <Route exact path="/inostriprodotti" element={<OurProducts/>} >    
            </Route>  
            <Route exact path="/assistenza" element={<Assistance/>} >    
            </Route>   
            <Route exact path="/recupero" element={<DataRescue/>} >    
            </Route>        
            <Route exact path="/product/:id" element={<Product addToCartProduct={addToCartProduct}/>} >    
            </Route>  
            <Route exact path="/passRecovery" element={<PassRecovery />} >    
            </Route>            
            <Route exact path="/register" element={<Register />} >    
            </Route>
            <Route exact path="/regsuccess/:code" element={<RegSuccess />} >    
            </Route> 
            <Route exact path="/unauthorized" element={<Unauthorized />} >    
            </Route> 
            <Route exact path="/pwdUpdSuccess/:code" element={<PassRecSuccess />} >
            </Route>

        
            <Route element={<LoginRequireAuth />}>
              <Route exact path="/login" element={<Login />} >    
              </Route>
            </Route>
                   
          <Route element={<PersistLogin />}>          
            <Route element={<RequireAuth allowedRole={'admin'}/>}>
              <Route exact path="/adminDashboard" element={<AdminDashboard />} >    
              </Route>
            </Route>
            <Route element={<RequireAuth allowedRole={'customer'}/>}>
              <Route exact path="/userDashboard" element={<AdminDashboard />} >    
              </Route>
            </Route>
          </Route>                  
        </Routes>
        <Footer />
      </Router>
    </>
    );
}

export default App;
