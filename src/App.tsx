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
import Dashboard from './Page/Admin/Dashboard';
import ListCategory from './Page/Admin/Categorys/ListCategory';
import AddCategory from './Page/Admin/Categorys/AddCategory';
import EditCategory from './Page/Admin/Categorys/EditCategory';

function App() {
  const [products, setProducts] = useState<ProductType[]>([])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<WebsiteLayout/>}>
        <Route index element={<HomePage/> }/>
        </Route>

        <Route path='admin' element={<AdminLayout/>}>
        <Route index element={<Dashboard/> }/>

        <Route path='category' element={<ListCategory/>} />
        <Route path='category/add' element={<AddCategory/>} />
        <Route path='category/:id/edit' element={<EditCategory/>} />

        </Route>


        <Route path='signin' element={<Signin/>} />
        <Route path='signup' element={<Signup/>} />

      </Routes>

    </div>
  )
}

export default App
