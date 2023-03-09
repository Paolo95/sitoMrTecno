import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminPanel from './Pages/AdminPanel/AdminPanel';
import ProductPage from './Pages/ProductPage/ProductPage';
import EditProduct from './Pages/ProductPage/EditProduct';
import NewProductPage from './Pages/NewProductPage/NewProductPage';
import OrderPageAdmin from './Pages/OrderPage/OrderPageAdmin';
import EditOrder from './Pages/EditOrder/EditOrder';
import AdminBarterPage from './Pages/AdminBarterPage/AdminBarterPage';
import EditBarter from './Pages/EditBarter/EditBarter';
import FaqPage from './Pages/FaqPanel/FaqPage';
import AdminReviewPage from './Pages/AdminReviewPage/AdminReviewPage';
import ReviewReply from './Pages/ReviewReply/ReviewReply';
import AdminEditReview from './Pages/AdminEditReview/AdminEditReview';

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
            <Route path='/barters' element={<AdminBarterPage />}/>
        </Routes>
        <Routes>
            <Route path='/faqs' element={<FaqPage />}/>
        </Routes>
        <Routes>
            <Route path='/reviews' element={<AdminReviewPage />}/>
        </Routes>
        <Routes>
            <Route path='/reviews/reviewReply/:reviewID' element={<ReviewReply />}/>
        </Routes>
        <Routes>
            <Route path='/reviews/editReply/:reviewID' element={<AdminEditReview />}/>
        </Routes>
        <Routes>
            <Route path='/barters/editBarter/:barterID' element={<EditBarter />}/>
        </Routes>
    </section>
  )
}

export default Navpage