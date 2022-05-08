import { useEffect, useState } from 'react'
import logo from './logo.svg'
import "toastr/build/toastr.min.css";
import './App.css'
import { Route, Routes } from 'react-router-dom';

import { ProductType } from './Types/ProductsType';
import WebsiteLayout from './Page/Layout/WebsiteLayout';
import AdminLayout from './Page/Layout/AdminLayout';
import Signin from './Page/Signin';
import Signup from './Page/Signup';
import HomePage from './Page/HomePage';

function App() {
  const [products, setProducts] = useState<ProductType[]>([])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<WebsiteLayout/>}>
        <Route index element={<HomePage/> }/>
        </Route>
        <Route path='admin' element={<AdminLayout/>}>

        </Route>
        <Route path='signin' element={<Signin/>} />
        <Route path='signup' element={<Signup/>} />

      </Routes>
    </div>
  )
}

export default App
