import React from 'react';
import { Route, Routes } from 'react-router-dom';
import OrderPage from './Pages/OrderPage';
import OrderDetails from './Pages/OrderDetails';

const Navpage = () => {
  return (
    <section>
        <Routes>
            <Route path='/home' element={<OrderPage />}/>
            <Route path='/orderDetails/:orderId' element={<OrderDetails />}/>
        </Routes>
    </section>
  )
}

export default Navpage