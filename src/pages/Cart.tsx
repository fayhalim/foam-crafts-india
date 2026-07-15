import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Button } from '../components/ui/Button';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useShop();
  
  // Fake GST and Shipping for prototype
  const gst = cartTotal * 0.18;
  const shipping = cartTotal > 0 ? 500 : 0;
  const finalTotal = cartTotal + gst + shipping;

  return (
    <div className="bg-slate-50 min-h-screen pb-24 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          <ShoppingBag className="text-emerald-600" size={32} />
          Your Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-2xl mx-auto mt-12">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="text-slate-300" size={48} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              Looks like you haven't added any mattresses to your cart yet. Explore our premium collections for better sleep.
            </p>
            <Link to="/shop">
              <Button size="lg" className="gap-2">
                Continue Shopping <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Cart Items */}
            <div className="flex-grow space-y-4">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}-${item.thickness}`} className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <div className="w-full sm:w-32 aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between self-stretch">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 mb-1 leading-tight">{item.name}</h3>
                      <div className="text-sm text-slate-500 mb-2">
                        Size: {item.size} • Thickness: {item.thickness}
                      </div>
                    </div>
                    <div className="font-bold text-emerald-700 text-lg sm:mt-auto">
                      ₹{item.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end shrink-0">
                    <div className="flex items-center border border-slate-200 rounded-full bg-slate-50 h-10">
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-emerald-600 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-bold text-slate-900 text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-emerald-600 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-96 shrink-0">
              <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm sticky top-28">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal ({cart.length} items)</span>
                    <span className="font-medium text-slate-900">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Estimated GST (18%)</span>
                    <span className="font-medium text-slate-900">₹{gst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping Charges</span>
                    <span className="font-medium text-slate-900">₹{shipping.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4 pb-4 mb-4">
                  <label className="text-sm font-bold text-slate-900 block mb-2">Have a coupon code?</label>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Enter code" className="flex-grow px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    <Button variant="outline" size="sm">Apply</Button>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">Total</span>
                    <span className="font-bold text-2xl text-emerald-700">₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 text-right">Inclusive of all taxes</p>
                </div>

                <Link to="/checkout" className="w-full block">
                  <Button size="lg" className="w-full mb-4 group">
                    Proceed to Checkout
                    <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mt-6">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
