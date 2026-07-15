import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Button } from '../components/ui/Button';
import { 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  Ruler, 
  ShoppingCart,
  ArrowLeft,
  Heart,
  GitCompare
} from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist, products } = useShop();
  const product = products.find(p => p.id === id);

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedThicknessIndex, setSelectedThicknessIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/shop" className="text-emerald-600 hover:underline">Return to Shop</Link>
      </div>
    );
  }

  const currentSize = product.sizes?.[selectedSizeIndex] || { size: 'Default', thicknesses: [{ t: 'Default', price: product.basePrice }] };
  const currentThickness = currentSize.thicknesses?.[selectedThicknessIndex] || currentSize.thicknesses?.[0] || { t: 'Default', price: product.basePrice };
  const price = currentThickness.price || product.basePrice;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: price,
      quantity: quantity,
      size: currentSize.size,
      thickness: currentThickness.t,
      image: product.image
    });
    // navigate('/cart'); // Optional: redirect to cart immediately
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-emerald-600 transition-colors">Shop</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 font-medium truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600 mb-6 transition-colors">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="bg-white rounded-3xl p-6 lg:p-12 shadow-sm border border-slate-200">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="aspect-square rounded-xl overflow-hidden border-2 border-emerald-500 bg-slate-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                {/* Placeholders for additional images */}
                <div className="aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100 opacity-50"></div>
                <div className="aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100 opacity-50"></div>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4 self-start border border-emerald-100">
                {product.type}
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 tracking-tight">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-amber-400">
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" className="text-amber-200" />
                </div>
                <span className="text-sm text-slate-500">({product.reviews} reviews)</span>
              </div>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="text-4xl font-bold text-emerald-900 mb-8">
                ₹{price.toLocaleString('en-IN')}
                <span className="text-sm font-normal text-slate-500 ml-2">incl. of all taxes</span>
              </div>

              <hr className="border-slate-100 mb-8" />

              {/* Selectors */}
              <div className="space-y-6 mb-8">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="font-bold text-slate-900 flex items-center gap-2">
                      <Ruler size={18} className="text-emerald-600" /> Size (Inches)
                    </label>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {product.sizes?.map((s: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedSizeIndex(idx);
                          setSelectedThicknessIndex(0); // Reset thickness selection when size changes
                        }}
                        className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                          selectedSizeIndex === idx 
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500' 
                            : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:bg-slate-50'
                        }`}
                      >
                        {s.size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-900 block mb-3">Thickness / Variant</label>
                  <div className="grid grid-cols-2 gap-3">
                    {currentSize.thicknesses?.map((t: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedThicknessIndex(idx)}
                        className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                          selectedThicknessIndex === idx 
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500' 
                            : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:bg-slate-50'
                        }`}
                      >
                        {t.t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-900 block mb-3">Quantity</label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-slate-200 rounded-full bg-white h-12">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-emerald-600 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-bold text-slate-900">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-emerald-600 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto mb-4">
                <Button size="lg" className="flex-1 gap-2" onClick={handleAddToCart}>
                  <ShoppingCart size={20} />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="flex-1" onClick={() => { handleAddToCart(); navigate('/checkout'); }}>
                  Buy Now
                </Button>
              </div>

              <div className="flex items-center gap-6">
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${wishlist.includes(product.id) ? 'text-red-500' : 'text-slate-500 hover:text-emerald-600'}`}
                >
                  <Heart size={18} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
                  {wishlist.includes(product.id) ? 'Saved to Wishlist' : 'Add to Wishlist'}
                </button>
                <button className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors">
                  <GitCompare size={18} />
                  Compare
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Quality Tested</div>
                    <div className="text-xs text-slate-500">Premium materials</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Truck size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Fast Delivery</div>
                    <div className="text-xs text-slate-500">Pan India Delivery</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Features & Details Section */}
        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Product Features</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {product.features?.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                    <span className="font-medium text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-emerald-900 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-800 rounded-bl-full opacity-50"></div>
              <h3 className="text-xl font-bold mb-4 relative z-10">Need Bulk Quantity?</h3>
              <p className="text-emerald-100 mb-6 text-sm relative z-10">
                We are a trusted manufacturer for hotels, hospitals, and institutional buyers. Get special factory-direct pricing for bulk orders.
              </p>
              <a href="tel:+917518233001" className="inline-flex items-center justify-center w-full px-4 py-3 rounded-xl bg-white text-emerald-900 font-bold hover:bg-emerald-50 transition-colors relative z-10">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
