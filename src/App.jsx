import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Shop from './pages/Shop';
import OurStory from './pages/OurStory';
import Community from './pages/Community';
import Journal from './pages/Journal';
import Contact from './pages/Contact';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/community" element={<Community />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}
