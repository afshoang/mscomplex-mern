import { Routes, Route } from 'react-router-dom'
import {
  AddProduct,
  Customer,
  DashBoard,
  Login,
  OrderList,
  ProductList
 } from './pages';
 
import { Layout } from './components';
import { PrivateRoutes } from './routes';

function App() {

  return (
    <Routes>
      <Route path='/' >
        {/* Public */}
        <Route index element={<Login />} />

        <Route element={<Layout />}>
          {/* Private */}
          <Route element={<PrivateRoutes />}>
            <Route path='/dashboard' element={<DashBoard />} />
            <Route path='/customers' element={<Customer />} />
            <Route path='/products' element={<ProductList />} />
            <Route path='/products/:id' element={<AddProduct />} />
            <Route path='/orders' element={<OrderList />} />
            {/* <Route path='/categories' element={<Category />} /> */}
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
