import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminPanel from './Pages/AdminPanel/AdminPanel';
import ProductPage from './Pages/ProductPage/ProductPage';
import EditProduct from './Pages/ProductPage/EditProduct';
import NewProductPage from './Pages/NewProductPage/NewProductPage';
import OrderPageAdmin from './Pages/OrderPage/OrderPageAdmin';
import EditOrder from './Pages/EditOrder/EditOrder';
import BarterPage from './Pages/BarterPage/BarterPage';
import EditBarter from './Pages/EditBarter/EditBarter';
import FaqPage from './Pages/FaqPanel/FaqPage';

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
            <Route path='/orders' element={<OrderPageAdmin />}/>
        </Routes>
        <Routes>
            <Route path='/orders/editOrder/:orderID' element={<EditOrder />}/>
        </Routes>
        <Routes>
            <Route path='/barters' element={<BarterPage />}/>
        </Routes>
        <Routes>
            <Route path='/faqs' element={<FaqPage />}/>
        </Routes>
        <Routes>
            <Route path='/barters/editBarter/:barterID' element={<EditBarter />}/>
        </Routes>
    </section>
  )
}

export default Navpage