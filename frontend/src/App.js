import './App.css';
import Header from './common/header/Header';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pages from './pages/Pages';
import { useEffect, useState } from 'react';
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
import Checkout from './components/checkout/Checkout';
import OrderSuccess from './components/orderSuccess/OrderSuccess';
import UserDashboard from './components/userDashboard/UserDashboard';
import Faq from './components/faq/Faq';
import Barter from './components/barter/Barter';
import Services from './components/services/Services';
import CookieBot from 'react-cookiebot';
import Cookies from 'universal-cookie';

function App() {
  
  const cookies = new Cookies();
  
  const cartFromLocalStorage = JSON.parse(JSON.stringify(cookies.get('cartItem')) || '[]');
  const [cartItem, setCartItem] = useState(cartFromLocalStorage);
  
  const cleanCart = () => {
    setCartItem([])
   
  }

  const addToCart = (product) => {

    const productExit = cartItem.find((item) => item.id === product.id);

    if(productExit){
      setCartItem(cartItem.map((item) => 
      (item.id === product.id? { ...productExit, qty: productExit.qty +1 } : item)))
    }else{
      setCartItem([...cartItem,{...product, qty : 1 }])
    }  

  }

  useEffect (() => {

    const now = new Date();

    cookies.set('cartItem', JSON.stringify(cartItem), {
      expires: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7),
      path: '/'
    });
    
  // eslint-disable-next-line 
  }, [cartItem]);

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

  const domainGroupId = '6dbd17e8-ea97-4b46-8073-1d421afda11a';

  return (
    <>
      <Router>
        <Header cartItem={cartItem}/>      
        <Routes>
          <Route element={<PersistLogin />}> 
            <Route exact path="/" element={<Pages />} >    
            </Route>    
            <Route exact path="/cart" element={<Cart cartItem={cartItem} addToCart={addToCart} decreaseQty={decreaseQty} deleteCartProduct={deleteCartProduct}/>} >    
            </Route>
            <Route exact path="/contact" element={<Contact />} >    
            </Route>
            <Route exact path="/shop/:status" element={<Shop addToCart={addToCart} cartItem={cartItem} decreaseQty={decreaseQty} deleteCartProduct={deleteCartProduct}/>} >    
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
            <Route exact path="/faq" element={<Faq />} >
            </Route>
            <Route exact path="/servizi" element={<Services />} >
            </Route>
              
            <Route element={<LoginRequireAuth />}>
              <Route exact path="/login" element={<Login />} >    
              </Route>
            </Route>         
                   
                   
            <Route element={<RequireAuth allowedRole={'admin'}/>}>
              <Route exact path="/adminDashboard/*" element={<AdminDashboard />} >    
              </Route>
            </Route>
            <Route element={<RequireAuth allowedRole={'customer'}/>}>
              <Route exact path="/userDashboard/*" element={<UserDashboard />} >    
              </Route>            
              <Route exact path="/checkout" element={<Checkout cleanCart={cleanCart} cartItem={cartItem}/>} >    
              </Route>
              <Route exact path="/orderSuccess" element={<OrderSuccess />} >    
              </Route>
              <Route exact path="/permuta" element={<Barter addToCart={addToCart} cartItem={cartItem} decreaseQty={decreaseQty} deleteCartProduct={deleteCartProduct} cleanCart={cleanCart}/>} >
              </Route>
            </Route>
          </Route>          
        </Routes>
        <CookieBot domainGroupId={domainGroupId}/>
        <Footer />
      </Router>
    </>
    );
}

export default App;
