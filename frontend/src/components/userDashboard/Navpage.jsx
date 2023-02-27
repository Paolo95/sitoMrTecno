import React from 'react';
import { Route, Routes } from 'react-router-dom';
import OrderPage from './Pages/OrderPage/OrderPage';
import OrderDetails from './Pages/OrderDetails/OrderDetails';
import UserSettings from './Pages/UserSettings/UserSettings';
import UserBarterPage from './Pages/UserBarterPage/UserBarterPage';

const Navpage = () => {
  return (
    <section>
        <Routes>
            <Route path='/home' element={<OrderPage />}/>
            <Route path='/barters' element={<UserBarterPage />}/>
            <Route path='/home/orderDetails/:orderId' element={<OrderDetails />}/>
            <Route path='/settings' element={<UserSettings />}/>
        </Routes>
    </section>
  )
}

export default Navpage