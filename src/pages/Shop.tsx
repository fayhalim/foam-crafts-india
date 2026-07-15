import { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data';
import { useShop } from '../context/ShopContext';
import { Search, Filter, SlidersHorizontal, ChevronRight, Heart } from 'lucide-react';

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const { wishlist, toggleWishlist, products } = useShop();
  
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.type === activeCategory || p.name.includes(activeCategory));

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Page Header */}
      <div className="bg-emerald-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1541123437800-1bb1317bc951?auto=format&fit=crop&w=1920&q=80" alt="Mattress background" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-emerald-200 text-sm mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={16} />
            <span>Shop</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Premium Mattresses</h1>
          <p className="text-emerald-100 max-w-2xl text-lg">
            Discover our complete range of high-quality, orthopedic, and memory foam mattresses tailored for your perfect sleep.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar / Filters */}
          <div className="w-full lg:w-64 shrink-0 space-y-8">
            <div>
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Filter size={18} /> Categories
              </h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveCategory("All")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeCategory === "All" ? 'bg-emerald-600 text-white font-medium' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-900'}`}
                >
                  All Products
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeCategory === cat ? 'bg-emerald-600 text-white font-medium' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-900'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
              <h4 className="font-bold text-emerald-900 mb-2">Need a custom size?</h4>
              <p className="text-sm text-emerald-700 mb-4">We manufacture mattresses tailored to your exact bed frame dimensions.</p>
              <a href="#contact" className="inline-block w-full text-center px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors">
                Contact Us
              </a>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
              <span className="text-slate-600">Showing {filteredProducts.length} products</span>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search mattresses..." 
                    className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-full md:w-64"
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-emerald-100/50 hover:border-emerald-200 transition-all duration-300 flex flex-col h-full">
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold text-emerald-700 uppercase tracking-wider shadow-sm">
                      {product.type}
                    </div>
                    <button 
                      onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
                      className={`absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-colors ${wishlist.includes(product.id) ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}
                    >
                      <Heart size={18} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-emerald-700 transition-colors">{product.name}</h3>
                    <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
                    
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-500 block">Starting from</span>
                        <span className="font-bold text-xl text-slate-900">₹{product.basePrice}</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <ChevronRight size={20} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-24">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-400 mb-4">
                  <Search size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">No products found</h3>
                <p className="text-slate-500">Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
