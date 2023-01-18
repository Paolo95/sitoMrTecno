import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminPanel from './Pages/AdminPanel/AdminPanel';
import ProductPage from './Pages/ProductPage/ProductPage';
import EditProduct from './Pages/ProductPage/EditProduct';

const Navpage = () => {
  return (
    <section>
        <Routes>
            <Route path='/home' element={<AdminPanel />}/>
        </Routes>
        <Routes>
            <Route path='/products' element={<ProductPage />}/>
        </Routes>
        <Routes>
            <Route path='/products/edit/:id' element={<EditProduct />}/>
        </Routes>
    </section>
  )
}

export default Navpage