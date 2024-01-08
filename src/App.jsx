import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


// import components
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import Login from './components/Login';
import Error from './components/Error';
import ProductDetails from './components/ProductDetails';

export default function App() {
  return (

    <BrowserRouter>
    
    <div>
      {/* <h1 className="font-bold text-xl">App is working</h1> */}
      <Header/>
    </div>
    
    
    
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/productdetails/:id' element={<ProductDetails/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='*' element={<Error/>}/>

      </Routes>
    </BrowserRouter>
  )
}
