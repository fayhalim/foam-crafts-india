import { products, clients } from '../data';
import { CheckCircle2 } from 'lucide-react';

export default function Products() {
  return (
    <section id="products" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Products List */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Our Range of Products</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {products.map((product, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-emerald-200 transition-colors">
                  <div className="text-emerald-500">
                    <CheckCircle2 size={24} />
                  </div>
                  <span className="font-semibold text-slate-700">{product.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Who We Serve */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Who We Serve</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {clients.map((client, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-emerald-900 text-white rounded-xl shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-medium text-emerald-50">{client}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
              <p className="text-emerald-800 font-medium">
                "Our commitment is to provide sleep solutions that meet the highest standards of quality and customer satisfaction."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
