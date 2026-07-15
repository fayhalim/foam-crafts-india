import Hero from '../components/Hero';
import Features from '../components/Features';
import Products from '../components/Products';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Home() {
  const { products } = useShop();
  
  return (
    <>
      <Hero />
      <Features />
      
      {/* Featured Products Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Best Sellers</h2>
              <p className="text-slate-600 max-w-2xl">Discover our most popular mattresses, crafted for ultimate comfort and durability.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700">
              View All Mattresses <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="group rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300">
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold text-emerald-600 mb-2 uppercase tracking-wider">{product.type}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h3>
                  <p className="text-slate-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-slate-900">From ₹{product.basePrice}</span>
                    <span className="text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-sm font-medium">Explore</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/shop" className="inline-flex items-center justify-center w-full px-6 py-3 rounded-full bg-emerald-50 text-emerald-700 font-medium hover:bg-emerald-100 transition-colors">
              View All Mattresses
            </Link>
          </div>
        </div>
      </section>

      <Products />
    </>
  );
}
