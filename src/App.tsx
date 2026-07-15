/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ScrollToTop from './components/ScrollToTop';
import { ShopProvider } from './context/ShopContext';
import { SiteConfigProvider } from './context/SiteConfigContext';
import { AuthProvider } from './context/AuthContext';
import AdminLayout from './pages/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/views/AdminDashboard';
import AdminSettings from './pages/admin/views/AdminSettings';
import AdminProducts from './pages/admin/views/AdminProducts';

export default function App() {
  return (
    <AuthProvider>
      <SiteConfigProvider>
        <ShopProvider>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-200 flex flex-col">
                <Navbar />
                <main className="flex-grow pt-20">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            } />
            <Route path="/shop" element={<div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-200 flex flex-col"><Navbar /><main className="flex-grow pt-20"><Shop /></main><Footer /></div>} />
            <Route path="/product/:id" element={<div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-200 flex flex-col"><Navbar /><main className="flex-grow pt-20"><ProductDetail /></main><Footer /></div>} />
            <Route path="/cart" element={<div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-200 flex flex-col"><Navbar /><main className="flex-grow pt-20"><Cart /></main><Footer /></div>} />
            <Route path="/checkout" element={<div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-200 flex flex-col"><Navbar /><main className="flex-grow pt-20"><Checkout /></main><Footer /></div>} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="*" element={<div className="p-8 text-center text-slate-500">This feature is currently under construction and will be available soon.</div>} />
            </Route>
          </Routes>
        </ShopProvider>
      </SiteConfigProvider>
    </AuthProvider>
  );
}
