import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import { ShopifyProvider } from './context/ShopifyContext';
import Navbar from './components/Navbar';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import ComicDetail from './pages/ComicDetail';
import CartPage from './pages/CartPage';
import Rewards from './pages/Rewards';
import Login from './pages/Login';
import Donate from './pages/Donate';
import Merch from './pages/Merch';
import MerchDetail from './pages/MerchDetail';
import Shop from './pages/Shop';
import ShopifyCart from './pages/ShopifyCart';
import Footer from './components/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <ShopifyProvider>
        <UserProvider>
          <CartProvider>
            <Navbar />
            <main className="container">
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/comics" element={<Home />} />
                <Route path="/comic/:id" element={<ComicDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/cart" element={<ShopifyCart />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/login" element={<Login />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/merch" element={<Merch />} />
                <Route path="/merch/:id" element={<MerchDetail />} />
              </Routes>
            </main>
            <Footer />
          </CartProvider>
        </UserProvider>
      </ShopifyProvider>
    </BrowserRouter>
  );
}
