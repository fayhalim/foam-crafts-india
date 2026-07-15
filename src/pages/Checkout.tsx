import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Button } from '../components/ui/Button';
import { ShoppingBag, ArrowLeft, CheckCircle2, ShieldCheck, ChevronLeft } from 'lucide-react';

export default function Checkout() {
  const { cart, cartTotal } = useShop();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success

  const gst = cartTotal * 0.18;
  const shipping = cartTotal > 0 ? 500 : 0;
  const finalTotal = cartTotal + gst + shipping;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="bg-slate-50 min-h-screen pt-24 pb-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/shop">
          <Button>Return to Shop</Button>
        </Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="bg-slate-50 min-h-screen pt-24 pb-24 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Order Confirmed!</h2>
          <p className="text-slate-600 mb-8">
            Thank you for choosing Foam Crafts India. Your order #ORD-{Math.floor(Math.random() * 100000)} has been successfully placed. We'll send you an email confirmation shortly.
          </p>
          <div className="bg-emerald-50 rounded-2xl p-6 text-left mb-8">
            <p className="font-bold text-emerald-900 mb-2">What's next?</p>
            <p className="text-sm text-emerald-700">Your mattress will be manufactured and dispatched within 3-5 business days. You'll receive a tracking link via WhatsApp/Email once dispatched.</p>
          </div>
          <Link to="/">
            <Button size="lg" className="w-full">Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={() => navigate('/cart')} className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600 mb-6 transition-colors">
          <ChevronLeft size={16} /> Return to Cart
        </button>

        <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Form Area */}
          <div className="flex-grow space-y-6">
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-8 px-4">
              <div className={`flex flex-col items-center ${step >= 1 ? 'text-emerald-600' : 'text-slate-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 ${step >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-200'}`}>1</div>
                <span className="text-xs font-bold uppercase tracking-wider">Shipping</span>
              </div>
              <div className={`flex-grow h-1 mx-4 rounded-full ${step >= 2 ? 'bg-emerald-600' : 'bg-slate-200'}`}></div>
              <div className={`flex flex-col items-center ${step >= 2 ? 'text-emerald-600' : 'text-slate-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 ${step >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200'}`}>2</div>
                <span className="text-xs font-bold uppercase tracking-wider">Payment</span>
              </div>
            </div>

            <form id="checkout-form" onSubmit={handleNext}>
              {step === 1 && (
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Shipping Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">First Name</label>
                      <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Enter first name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Last Name</label>
                      <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Enter last name" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-slate-700">Email Address</label>
                      <input required type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="For order updates" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-slate-700">Phone Number (WhatsApp preferred)</label>
                      <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="+91" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-slate-700">Full Delivery Address</label>
                      <textarea required rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Street address, apartment, suite, unit, etc."></textarea>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">City</label>
                      <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">State</label>
                      <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">PIN Code</label>
                      <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Payment Method</h3>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 border border-emerald-500 bg-emerald-50 rounded-xl cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="payment" className="w-5 h-5 text-emerald-600 focus:ring-emerald-500" defaultChecked />
                        <span className="font-bold text-emerald-900">Online Payment (UPI/Cards)</span>
                      </div>
                      <ShieldCheck className="text-emerald-600" />
                    </label>
                    
                    <label className="flex items-center justify-between p-4 border border-slate-200 hover:border-emerald-200 rounded-xl cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="payment" className="w-5 h-5 text-emerald-600 focus:ring-emerald-500" />
                        <span className="font-medium text-slate-700">Cash on Delivery</span>
                      </div>
                    </label>
                  </div>
                  <div className="mt-6 p-4 bg-slate-50 rounded-xl text-sm text-slate-600">
                    You will be redirected to our secure payment gateway to complete your purchase.
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm sticky top-28">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 border-b border-slate-100 pb-6">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-slate-500">Qty: {item.quantity} | {item.size}</p>
                      <p className="text-sm font-bold text-emerald-700 mt-1">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST (18%)</span>
                  <span className="font-medium text-slate-900">₹{gst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="font-medium text-slate-900">₹{shipping.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">Total</span>
                  <span className="font-bold text-2xl text-emerald-700">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Button type="submit" form="checkout-form" size="lg" className="w-full gap-2">
                {step === 1 ? 'Continue to Payment' : 'Place Order'}
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
