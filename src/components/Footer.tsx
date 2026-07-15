import { MapPin, Phone, Mail, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteConfig } from '../context/SiteConfigContext';

export default function Footer() {
  const { config } = useSiteConfig();

  return (
    <footer id="contact" className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              {config.logoUrl && (
                <img src={config.logoUrl} alt={config.siteName} className="h-12 w-auto object-contain hover:opacity-100 transition-opacity" />
              )}
              <div className="flex flex-col">
                <span className="font-bold text-xl leading-tight text-white tracking-tight">{config.siteName}</span>
                <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-widest">{config.companyName}</span>
              </div>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Your trusted partner for premium, customized, and bulk mattress solutions. Quality craftsmanship tailored for your perfect sleep.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-800 text-sm font-medium border border-slate-700">
              <Building2 size={16} className="text-emerald-400" />
              GSTIN: 09BZQPA8675R1Z5
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-emerald-400 transition-colors">Our Products</Link></li>
              <li><Link to="/cart" className="hover:text-emerald-400 transition-colors">Shopping Cart</Link></li>
              <li><Link to="/admin" className="hover:text-emerald-400 transition-colors text-emerald-500">Admin Panel</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-emerald-400 shrink-0 mt-1" size={20} />
                <span className="leading-relaxed whitespace-pre-line">
                  {config.businessAddress}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-emerald-400 shrink-0" size={20} />
                <a href={`tel:${config.contactNumber.replace(/[^0-9+]/g, '')}`} className="hover:text-emerald-400 transition-colors">
                  {config.contactNumber}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-emerald-400 shrink-0" size={20} />
                <a href={`mailto:${config.emailAddress}`} className="hover:text-emerald-400 transition-colors">
                  {config.emailAddress}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} {config.companyName}. All rights reserved.</p>
          <p className="flex items-center gap-1">Made with <span className="text-red-500">♥</span> in India</p>
        </div>
      </div>
    </footer>
  );
}
