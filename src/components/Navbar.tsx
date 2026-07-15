import { Phone, Menu, X, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useSiteConfig } from '../context/SiteConfigContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useShop();
  const { config, loading } = useSiteConfig();
 if (loading) return null;

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-3">
            {config.logoUrl && (
              <img src={config.logoUrl} alt={config.siteName} className="h-12 w-auto object-contain" />
            )}
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-tight text-emerald-900 tracking-tight">{config.siteName}</span>
              <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-widest">{config.companyName}</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Home</Link>
            <Link to="/shop" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Shop Mattresses</Link>
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Why Choose Us</a>
            
            <Link to="/cart" className="relative p-2 text-slate-600 hover:text-emerald-600 transition-colors">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-emerald-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <a href="tel:+917518233001" className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-emerald-600 text-white font-medium text-sm hover:bg-emerald-700 transition-colors gap-2 shadow-sm shadow-emerald-200">
              <Phone size={16} />
              Call Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-slate-600">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-emerald-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="p-2 text-slate-600" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 py-4 flex flex-col gap-4 shadow-lg">
          <Link to="/" className="font-medium text-slate-700 p-2" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/shop" className="font-medium text-slate-700 p-2" onClick={() => setIsOpen(false)}>Shop Mattresses</Link>
          <a href="#about" className="font-medium text-slate-700 p-2" onClick={() => setIsOpen(false)}>Why Choose Us</a>
        </div>
      )}
    </nav>
  );
}
