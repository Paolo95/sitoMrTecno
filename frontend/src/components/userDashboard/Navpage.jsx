import React from 'react';
import { Route, Routes } from 'react-router-dom';
import OrderPage from './Pages/OrderPage';

const Navpage = () => {
  return (
    <section>
        <Routes>
            <Route path='/' element={<OrderPage />}/>
        </Routes>
    </section>
  )
}

export default Navpage