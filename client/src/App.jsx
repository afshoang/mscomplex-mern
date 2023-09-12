import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    Cart, 
    Catalog,
    Checkout,
    Home,
    Login,
    OrderDetail,
    Orders,
    Product,
    Register
 } from './pages';
import { Layout } from './components';
import { PrivateRoutes } from './routes';

function App() {
  return (
    <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />

            <Route path='products' element={<Catalog />} />
            <Route path='products/:id' element={<Product />} />
            <Route path='cart' element={<Cart />} />

            <Route element={<PrivateRoutes />}>
              <Route path='my-orders' element={<Orders />} />
              <Route path='my-orders/:id' element={<OrderDetail />} />
            </Route>
          </Route>

          <Route element={<PrivateRoutes />}>
            <Route path='/checkout' element={<Checkout />} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
