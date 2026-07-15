import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-emerald-900 text-white min-h-[80vh] flex items-center">
      {/* Background image overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1920&q=80"
          alt="Comfortable mattress"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900 via-emerald-900/90 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/50 border border-emerald-700 text-emerald-200 text-sm font-medium mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Premium Mattress Manufacturer in Varanasi
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Better Sleep. <br className="hidden sm:block" />
            <span className="text-emerald-400">Better Life.</span>
          </h1>
          <p className="text-lg text-emerald-100 mb-8 leading-relaxed max-w-xl">
            Combining quality materials, skilled craftsmanship, and advanced manufacturing to deliver mattresses that provide superior comfort, support, and durability.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/shop" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-400 transition-colors gap-2">
              View Our Products
              <ChevronRight size={20} />
            </Link>
            <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 backdrop-blur-md transition-colors border border-white/20">
              Contact for Bulk Orders
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
