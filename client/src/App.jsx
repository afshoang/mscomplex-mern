import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import {
    Cart, 
    Catalog,
    Home,
    Product
 } from './pages';
import { Announcement, Header, Footer } from './components';

function App() {
  return (
     <BrowserRouter>
      <Announcement />
      <Header />
      <main>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/catalog/:slug' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
