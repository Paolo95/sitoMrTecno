import React from 'react';
import { Route, Routes } from 'react-router-dom';
import OrderPage from './Pages/OrderPage/OrderPage';
import OrderDetails from './Pages/OrderDetails/OrderDetails';
import UserSettings from './Pages/UserSettings/UserSettings';
import UserBarterPage from './Pages/UserBarterPage/UserBarterPage';
import BarterDetails from './Pages/BarterDetails/BarterDetails';
import UserReviewPage from './Pages/UserReviewPage/UserReviewPage';
import NewReview from './Pages/NewReview/NewReview';
import UserEditReview from './Pages/UserEditReview/UserEditReview';

const Navpage = () => {
  return (
    <section>
        <Routes>
            <Route path='/home' element={<OrderPage />}/>
            <Route path='/barters' element={<UserBarterPage />}/>
            <Route path='/home/orderDetails/:orderId' element={<OrderDetails />}/>
            <Route path='/barters/barterDetails/:barterId' element={<BarterDetails />}/>
            <Route path='/reviews' element={<UserReviewPage />}/>
            <Route path='/reviews/newReview/:productId' element={<NewReview />}/>
            <Route path='/reviews/editReview/:reviewId' element={<UserEditReview />}/>
            <Route path='/settings' element={<UserSettings />}/>
        </Routes>
    </section>
  )
}

export default Navpage