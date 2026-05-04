import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ShopHoodies from './pages/ShopHoodies';
import ShopTees from './pages/ShopTees';
import ShopCaps from './pages/ShopCaps';
import OurStory from './pages/OurStory';
import Community from './pages/Community';
import Journal from './pages/Journal';
import JournalPost from './pages/JournalPost';
import Contact from './pages/Contact';
// Gender + category pages — hidden from nav per client, kept for future use
import ProductDetailPage from './pages/ProductDetailPage';
import CategoryPage from './pages/CategoryPage';
import GenderPage from './pages/GenderPage';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Active shop routes */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/product/:slug" element={<ProductDetailPage />} />
        <Route path="/shop/hoodies" element={<ShopHoodies />} />
        <Route path="/shop/tees" element={<ShopTees />} />
        <Route path="/shop/caps" element={<ShopCaps />} />

        {/* Hidden — client may re-enable men/women split when more product is live */}
        <Route path="/shop/:gender" element={<GenderPage />} />
        <Route path="/shop/:gender/:category" element={<CategoryPage />} />

        <Route path="/our-story" element={<OurStory />} />
        <Route path="/community" element={<Community />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:slug" element={<JournalPost />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}
