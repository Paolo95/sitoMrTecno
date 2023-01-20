import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminPanel from './Pages/AdminPanel/AdminPanel';
import ProductPage from './Pages/ProductPage/ProductPage';
import EditProduct from './Pages/ProductPage/EditProduct';
import NewProductPage from './Pages/NewProductPage/NewProductPage';
import CategoryPage from './Pages/CategoryPage/CategoryPage';
import OrderPageAdmin from './Pages/OrderPage/OrderPageAdmin';

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
        <Routes>
            <Route path='/newProduct' element={<NewProductPage />}/>
        </Routes>
        <Routes>
            <Route path='/newCategory' element={<CategoryPage/>}/>
        </Routes>
        <Routes>
            <Route path='/orders' element={<OrderPageAdmin/>}/>
        </Routes>
    </section>
  )
}

export default Navpage