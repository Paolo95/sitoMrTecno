import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminPanel from './Pages/AdminPanel/AdminPanel';

const Navpage = () => {
  return (
    <section>
        <Routes>
            <Route path='/home' element={<AdminPanel />}/>
        </Routes>
    </section>
  )
}

export default Navpage