import { useEffect, useState } from 'react'
import logo from './logo.svg'
import "toastr/build/toastr.min.css";
import './App.css'
import { Route, Routes } from 'react-router-dom';

import { ProductType } from './Style/ProductsType';

function App() {
  const [products, setProducts] = useState<ProductType[]>([])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<h1>Home Page</h1>} />

      </Routes>
    </div>
  )
}

export default App
